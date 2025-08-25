import dotenv from 'dotenv';
dotenv.config();
import { getNextSequenceSpacialProduct } from '../special_product/specialProduct.counter.model';
import { SubscribeOrder } from '../special_product/spacialProduct.order.model';
import type { ISubscriptionProducts } from '../products/product.interface';
import Stripe from 'stripe';
import { Request, Response } from 'express';
import { logger } from '../../../shared/logger';
import type { CheckoutRequestBody } from '../products/product.interface';
import { Order } from '../products/product.order.model';
import { getNextSequence } from '../products/counter.model';
import { sendPushNotification } from '../products/product.service';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-07-30.basil',
});
// Type definitions (add these at the top of your file)

export const createCheckoutSession = async (
  req: Request<unknown, unknown, CheckoutRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { products, token } = req.body;

    // Enhanced validation
    if (!products || !Array.isArray(products) || products.length === 0) {
      res.status(400).json({ message: 'Products array is required.' });
      return;
    }
    if (!token) {
      res.status(400).json({ message: 'Token is required.' });
      return;
    }

    // Separate subscription and regular products
    const subscriptionProducts = products.filter(
      p => 'subscription' in p && p.subscription
    );
    const regularProducts = products.filter(
      p => !('subscription' in p) || !p.subscription
    );

    // Validate that we don't have mixed cart (subscription + regular products)
    if (subscriptionProducts.length > 0 && regularProducts.length > 0) {
      res.status(400).json({
        message:
          'Cannot mix subscription and regular products in the same checkout.',
      });
      return;
    }

    let generatedOrderId;

    // Handle regular products only
    if (regularProducts.length > 0) {
      // Validate regular products
      for (const product of regularProducts) {
        const name = 'dish' in product ? product.dish : product.productName;
        const price = 'price' in product ? product.price : product.sub_price;

        if (!name || price === undefined || price <= 0) {
          res.status(400).json({
            message: 'All products must have valid name and price.',
          });
          return;
        }
      }

      const lineItems = regularProducts.map(product => {
        const name = 'dish' in product ? product.dish : product.productName;
        const image = 'image' in product ? product.image : product.image_url;
        const price = 'price' in product ? product.price : product.sub_price;

        return {
          price_data: {
            currency: 'inr',
            product_data: {
              name: name || 'Product', // Ensure name is never undefined
              images: image ? [image] : [],
            },
            unit_amount: Math.round((price ?? 0) * 100),
          },
          quantity: 'qnty' in product ? Math.max(1, product.qnty || 1) : 1,
        };
      });

      generatedOrderId = await getNextSequence('orderId');

      await Order.create({
        orderId: generatedOrderId,
        token,
        status: 'pending',
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success?orderId=${generatedOrderId}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
        metadata: {
          orderId: generatedOrderId.toString(),
          type: 'regular_payment',
        },
      });

      res.json({ id: session.id });
      return;
    }

    // Handle subscription products only
    if (subscriptionProducts.length > 0) {
      // Validate subscription products - cast to ISubscriptionProducts
      const validSubscriptionProducts =
        subscriptionProducts as ISubscriptionProducts[];

      for (const product of validSubscriptionProducts) {
        if (!product.priceId) {
          res.status(400).json({
            message: 'All subscription products must have a valid priceId.',
          });
          return;
        }
      }

      generatedOrderId = await getNextSequenceSpacialProduct('orderId');

      await SubscribeOrder.create({
        orderId: generatedOrderId,
        token,
        status: 'Deactive',
      });

      const subscriptionLineItems = validSubscriptionProducts.map(p => ({
        price: p.priceId,
        quantity: 1,
      }));

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: subscriptionLineItems,
        success_url: `${process.env.CLIENT_URL}/success?success=true&session_id=${generatedOrderId}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel?canceled=true`,
        metadata: {
          orderId: generatedOrderId.toString(),
          type: 'subscription',
        },
      });

      res.json({ id: session.id });
      return;
    }

    // If we reach here, no valid products were found
    res.status(400).json({ message: 'No valid products found.' });
  } catch (error) {
    console.error('Checkout session creation error:', error);
    res.status(500).json({ message: 'Failed to create checkout session.' });
  }
};

// Improved webhook handler
const handleOrderPayment = async (orderId: string | undefined) => {
  if (!orderId) {
    console.error('Missing orderId for order payment');
    return;
  }

  try {
    const order = await Order.findOne({ orderId: parseInt(orderId, 10) });
    if (!order) {
      console.error(`Order not found: ${orderId}`);
      return;
    }

    if (order.status !== 'paid') {
      order.status = 'paid';
      await order.save();

      logger.info(
        `Payment successful for order ${orderId}, token: ${order.token}`
      );

      await sendPushNotification({
        title: 'Payment Successful ✅',
        body: `Your order ${orderId} was successful!`,
        recipientToken: order.token,
      });

      console.log(`📩 One-time payment completed for order ${orderId}`);
    } else {
      console.log(`Order ${orderId} already marked as paid`);
    }
  } catch (error) {
    console.error(`Error handling order payment for ${orderId}:`, error);
  }
};

const handleSubscription = async (
  orderId: string | undefined,
  status: 'active' | 'cancelled',
  subscriptionId?: string
) => {
  if (!orderId) {
    console.error('Missing orderId for subscription');
    return;
  }

  try {
    const subOrder = await SubscribeOrder.findOne({
      orderId: parseInt(orderId, 10),
    });

    if (!subOrder) {
      console.error(`Subscription order not found: ${orderId}`);
      return;
    }

    // Only update if status is different
    if (subOrder.status !== status) {
      subOrder.status = status;
      if (subscriptionId) {
        // Store subscription ID for future reference
        (subOrder as any).stripeSubscriptionId = subscriptionId;
      }
      await subOrder.save();

      const messages = {
        active: {
          title: 'Subscription Active ✅',
          body: `Your subscription for order ${orderId} is now active!`,
          log: `🆕 Subscription activated/renewed for order ${orderId}`,
        },
        cancelled: {
          title: 'Subscription Cancelled ❌',
          body: `Your subscription for order ${orderId} has been cancelled.`,
          log: `❌ Subscription cancelled for order ${orderId}`,
        },
      };

      const msg = messages[status];
      await sendPushNotification({
        title: msg.title,
        body: msg.body,
        recipientToken: subOrder.token,
      });
      console.log(msg.log);
    } else {
      console.log(`Subscription ${orderId} already has status: ${status}`);
    }
  } catch (error) {
    console.error(`Error handling subscription for ${orderId}:`, error);
  }
};

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  if (!sig) {
    console.error('Missing stripe-signature header');
    return res.status(400).send('Missing stripe-signature header');
  }

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log(`📨 Received webhook: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const orderId = session.metadata?.orderId;

        console.log(
          `Checkout completed - Mode: ${session.mode}, OrderId: ${orderId}`
        );

        if (session.mode === 'payment') {
          await handleOrderPayment(orderId);
        } else if (session.mode === 'subscription') {
          await handleSubscription(orderId, 'active', session.subscription);
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as any;
        const subscriptionId = invoice.subscription;

        // For recurring subscription payments
        if (subscriptionId && invoice.billing_reason === 'subscription_cycle') {
          console.log(
            `🔄 Recurring payment succeeded for subscription: ${subscriptionId}`
          );
          // Handle recurring payment if needed
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;
        // Try to find orderId from subscription metadata or customer
        const orderId = subscription.metadata?.orderId;
        await handleSubscription(orderId, 'cancelled', subscription.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as any;
        console.log(
          `💳 Payment failed for subscription: ${invoice.subscription}`
        );
        // Handle failed payment notification
        break;
      }

      default: {
        console.log(`⚠️ Unhandled event type: ${event.type}`);
      }
    }

    res.json({ received: true });
  } catch (err: any) {
    console.error('❌ Webhook error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
