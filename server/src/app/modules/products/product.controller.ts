import dotenv from 'dotenv';
dotenv.config();

import Stripe from 'stripe';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { errorLogger } from '../../../shared/logger';
import { CheckoutRequestBody } from '../../../types/product';

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2025-07-30.basil',
});

const counterFilePath = path.resolve(__dirname, 'order_counter.txt');

function getNextOrderId(): number {
  let lastId = 0;
  try {
    if (fs.existsSync(counterFilePath)) {
      const data = fs.readFileSync(counterFilePath, 'utf-8');
      lastId = parseInt(data, 10) || 0;
    }
  } catch (err) {
    errorLogger.error('Failed to read counter file:', err);
  }

  const nextId = lastId + 1;

  try {
    fs.writeFileSync(counterFilePath, nextId.toString(), 'utf-8');
  } catch (err) {
    errorLogger.error('Failed to write counter file:', err);
  }

  return nextId;
}

export const createCheckoutSession = async (
  req: Request<unknown, unknown, CheckoutRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      res.status(400).json({ message: 'Products array is required.' });
      return;
    }

    const lineItems = products.map(product => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: product.dish,
          images: [product.imgdata],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.qnty,
    }));

    const generatedOrderId = getNextOrderId().toString();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:5173/success?orderId=${generatedOrderId}`,
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create checkout session.' });
  }
};
