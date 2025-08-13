import { Request, Response } from 'express';
import { CreateCheckoutSessionBody } from './sepacialProduct.interface';
import { errorLogger, logger } from '../../../shared/logger';
import stripe from '../../../shared/stripe';

export const createCheckoutSession = async (
  req: Request<object, object, CreateCheckoutSessionBody>,
  res: Response
) => {
  try {
    const { priceId, productName, billingCycle } = req.body;
    logger.info(priceId, productName, billingCycle);
    if (!priceId) {
      return res.status(400).json({ error: 'Missing priceId' });
    }

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
    });

    res.json({ id: session.id });
  } catch (error) {
    errorLogger.error('Stripe session creation failed:', error);
    const message =
      error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: message });
  }
};
