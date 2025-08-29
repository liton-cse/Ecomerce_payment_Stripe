export interface Product {
  _id: number;
  dish: string;
  image: string;
  rating: number;
  somedata: string;
  address: string;
  price: number;
  qnty: number;
  description?: string;
}

export interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: Product) => void;
}
// src/types/cart.ts
export interface CartItem {
  _id: number | string;
  dish: string;
  address: string;
  somedata: string;
  image: string;
  rating: number;
  price: number;
  qnty: number;
}

export interface CardImageProps {
  image: string;
  altData: string;
  className?: string;
}
