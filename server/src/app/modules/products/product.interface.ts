import { string } from 'zod';

export interface IProduct extends Document {
  dish?: string;
  address?: string;
  somedata?: string;
  price?: number;
  image?: string | undefined;
  rating?: number;
  qnty?: number;
  subscription?: string;
  image_url?: string;
  sub_price?: number;
  productName?: string;
}

export interface SpecialProduct {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  billing_cycle?: string;
  image_url?: string;
  stripe_price_id?: string;
}

// export interface ISubscriptionProducts {
//   priceId?: string;
//   productName?: string;
//   billingCycle?: string;
//   image_url?: string;
//   sub_price?: number;
//   subscription?: boolean;
// }

// interface IProduct {
//   dish?: string;
//   productName?: string;
//   price?: number;
//   sub_price?: number;
//   image?: string;
//   image_url?: string;
//   qnty?: number;
//   subscription?: false;
// }

export interface ISubscriptionProducts {
  dish?: string;
  productName?: string;
  price?: number;
  sub_price?: number;
  image?: string;
  image_url?: string;
  qnty?: number;
  subscription: true;
  priceId: string;
}

export interface CheckoutRequestBody {
  products: (IProduct | ISubscriptionProducts)[];
  token: string;
}
