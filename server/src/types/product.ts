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

export interface CheckoutRequestBody {
  products: (CardProduct | SpecialProduct)[];
  token: string;
}
