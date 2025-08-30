export interface SubscriptionProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  billing_cycle: "monthly" | "yearly" | string;
  image: string;
  stripe_price_id?: string; // Added Stripe Price ID
}

export interface SpecialProductCardProps {
  product: SubscriptionProduct;
}

export interface ProductModalProps {
  product: {
    name: string;
    description: string;
    price: number;
    image: string;
    billing_cycle: string;
    stripe_price_id?: string;
  };
  onClose: () => void;
  onSubscribe: (
    e: React.MouseEvent,
    product: ProductModalProps["product"]
  ) => void;

  isSubscribing: boolean;
}
export interface SubscriptionState {
  loading: boolean;
  error: string | null;
  subscriptions: SubscriptionProduct[];
}
export interface SubscribeProduct {
  priceId: string;
  productName: string;
  billingCycle: string;
  image_url?: string;
  sub_price: number;
  subscription: boolean;
}

export interface SubscribePayload {
  products: SubscribeProduct[];
  token: string;
}
