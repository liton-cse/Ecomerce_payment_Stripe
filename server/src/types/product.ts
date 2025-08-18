export interface CardProduct {
  id: number;
  dish: string;
  imgdata: string;
  address: string;
  delimg: string;
  somedata: string;
  price: number;
  rating: string;
  arrimg: string;
  qnty: number;
  subscription?: boolean;
}

export interface SpecialProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  billing_cycle: string;
  image_url: string;
  stripe_price_id: string;
}

export interface Products {
  priceId: string;
  productName: string;
  billingCycle: string;
  image_url: string;
  sub_price: number;
  subscription?: boolean;
}

export interface CheckoutRequestBody {
  products: (CardProduct | Products)[];
  token: string;
}
