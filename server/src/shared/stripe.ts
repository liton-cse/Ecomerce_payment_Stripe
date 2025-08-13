// src/shared/stripe.ts
import dotenv from 'dotenv';
import Stripe from 'stripe';
dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY missing');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-07-30.basil',
});

export default stripe;
