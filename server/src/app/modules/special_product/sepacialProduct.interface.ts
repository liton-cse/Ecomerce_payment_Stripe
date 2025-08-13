// Type for request body
export type CreateCheckoutSessionBody = {
  priceId: string;
  productName: string;
  billingCycle: string;
  returnUrl: string;
};
export type apiVersion = '2020-08-27' | '2022-11-15' | '2024-06-20';
