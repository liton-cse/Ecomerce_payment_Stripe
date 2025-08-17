import dotenv from 'dotenv';
dotenv.config();
import Stripe from 'stripe';
import { Request, Response } from 'express';
import { logger } from '../../../shared/logger';
import { CheckoutRequestBody } from '../../../types/product';
import { Order } from './product.order.model';
import { getNextSequence } from './counter.model';
import { sendPushNotification } from './product.service';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-07-30.basil',
});

export const createCheckoutSession = async (
  req: Request<unknown, unknown, CheckoutRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { products, token } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      res.status(400).json({ message: 'Products array is required.' });
      return;
    }
    if (!token) {
      res.status(400).json({ message: 'Token is required.' });
      return;
    }

    logger.info('Firebase token:', token);

    const lineItems = products.map(product => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'dish' in product ? product.dish : product.name,
          images: ['imgdata' in product ? product.imgdata : product.image_url],
        },
        unit_amount: Math.round(('price' in product ? product.price : 0) * 100),
      },
      quantity: 'qnty' in product ? product.qnty : 1,
    }));

    const generatedOrderId = await getNextSequence('orderId');

    await Order.create({ orderId: generatedOrderId, token, status: 'pending' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:5173/success?orderId=${generatedOrderId}`,
      cancel_url: 'http://localhost:5173/cancel',
      metadata: { orderId: generatedOrderId },
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create checkout session.' });
  }
};

// webhook enent for confimation the payment system...
// webhook.controller.ts

// Webhook handler for normal payments and subscription events

type StripeInvoice = Stripe.Invoice & {
  subscription?: string | Stripe.Subscription;
};
export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      // ONE-TIME PAYMENT SUCCESS
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (orderId) {
          const order = await Order.findOne({
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
            console.log(`📩 Normal payment completed for order ${orderId}`);
          }
        }
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(
          `🆕 Subscription ${subscription.id} created for customer ${subscription.customer}`
        );
        // Optionally save subscription info to DB
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`🔄 Subscription ${subscription.id} updated`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`❌ Subscription ${subscription.id} deleted`);
        break;
      }

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err: any) {
    console.error('❌ Webhook error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
