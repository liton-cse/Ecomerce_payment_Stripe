export interface Product {
  id: number;
  dish: string;
  imgdata: string;
  rating: number;
  address: string;
  price: number;
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
  id: number | string;
  dish: string;
  imgdata: string;
  price: number;
  qnty: number;
}

export interface CardImageProps {
  image: string;
  altData: string;
  className?: string;
}
