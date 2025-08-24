// Type for request body
export type CreateCheckoutSessionBody = {
  priceId: string;
  productName: string;
  billingCycle: string;
  returnUrl: string;
  token: string;
};
export type apiVersion = '2020-08-27' | '2022-11-15' | '2024-06-20';

export interface ISubscriptionProduct {
  name: string;
  description: string;
  price: number; // price in your chosen currency (e.g., USD)
  billing_cycle: 'monthly' | 'yearly' | 'weekly'; // restrict to allowed values
  image_url: string;
  stripe_price_id?: string; // Stripe Price ID for checkout
  createdAt?: Date;
  updatedAt?: Date;
}
