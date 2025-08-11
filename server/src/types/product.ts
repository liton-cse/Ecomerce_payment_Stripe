export type Product = {
  dish: string;
  imgdata: string;
  price: number;
  qnty: number;
};

export type CheckoutRequestBody = {
  products: Product[];
};
