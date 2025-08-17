import { Request, Response } from 'express';
import { CreateCheckoutSessionBody } from './sepacialProduct.interface';
import { errorLogger, logger } from '../../../shared/logger';
import stripe from '../../../shared/stripe';
import { getNextSequenceSpacialProduct } from './specialProduct.counter.model';
import { sendPushNotification } from '../products/product.service';
import { SubscribeOrder } from './spacialProduct.order.model';
import Stripe from 'stripe';

export const createCheckoutSession = async (
  req: Request<object, object, CreateCheckoutSessionBody>,
  res: Response
) => {
  try {
    const { priceId, productName, billingCycle, token } = req.body;
    logger.info(priceId, productName, billingCycle);
    if (!priceId) {
      return res.status(400).json({ error: 'Missing priceId' });
    }
    if (!token) {
      return res.status(400).json({ error: 'Missing priceId' });
    }

    const generatedOrderId = await getNextSequenceSpacialProduct('orderId');
    // ✅ Save order in DB
    await SubscribeOrder.create({
      orderId: generatedOrderId,
      token,
      status: 'pending',
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: {
          productName,
          billingCycle,
        },
      },
      success_url: `http://localhost:5173/success?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/cancel?canceled=true`,
      metadata: { orderId: generatedOrderId },
    });

    res.json({ id: session.id });
  } catch (error) {
    errorLogger.error('Stripe session creation failed:', error);
    const message =
      error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: message });
  }
};

//

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode === 'subscription') {
          // Subscription session
          const subscriptionId = session.subscription as string;
          logger.info('Subscription completed:', subscriptionId);

          // If you want to link to your order, you need to include orderId in session.metadata
          const orderId = session.metadata?.orderId;
          if (orderId) {
            const order = await SubscribeOrder.findOne({
              orderId: parseInt(orderId, 10),
            });
            if (order && order.status !== 'paid') {
              order.status = 'paid';
              await order.save();

              await sendPushNotification({
                title: 'Subscription Successful ✅',
                body: `Your subscription order ${orderId} was successful!`,
                recipientToken: order.token,
              });

              console.log(
                `📩 Push notification sent for subscription order ${orderId}`
              );
            }
          }
        } else {
          // One-time payment
          const orderId = session.metadata?.orderId;
          if (orderId) {
            const order = await SubscribeOrder.findOne({
              orderId: parseInt(orderId, 10),
            });
            if (order && order.status !== 'paid') {
              order.status = 'paid';
              await order.save();

              await sendPushNotification({
                title: 'Payment Successful ✅',
                body: `Your order ${orderId} was successful!`,
                recipientToken: order.token,
              });

              console.log(`📩 Push notification sent for order ${orderId}`);
            }
          }
        }
        break;
      }

      default:
        logger.info(`Unhandled event type ${event.type}`);
    }

    res.status(200).send();
  } catch (err) {
    logger.error('Webhook Error:', err);
    res.status(400).send(`Webhook Error: ${err}`);
  }
};
