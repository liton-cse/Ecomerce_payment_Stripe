export interface Dish {
  id: number;
  dish: string;
  image: File;
  address: string;
  somedata: string;
  price: number;
  rating: number;
  qnty: number;
}
import { type JSX } from "react";
export interface Action {
  label: string;
  icon: React.ElementType;
  renderForm?: (onSubmitSuccess: () => void) => JSX.Element;
  handleFunction?: (id: string, onSubmitSuccess?: () => void) => void;
}
