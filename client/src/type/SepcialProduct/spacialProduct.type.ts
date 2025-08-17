export interface SubscriptionProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  billing_cycle: "monthly" | "yearly" | "weekly" | string;
  image_url: string;
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
    image_url: string;
    billing_cycle: string;
  };
  onClose: () => void;
  onSubscribe: (
    e: React.MouseEvent,
    product: ProductModalProps["product"]
  ) => void;

  isSubscribing: boolean;
}

export interface SubscribePayload {
  products: {
    priceId: string;
    productName: string;
    billingCycle: string;
  };
  token: string;
}

export interface SubscriptionState {
  loading: boolean;
  error: string | null;
}
