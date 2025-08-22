export interface Dish {
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
import { type JSX } from "react";
export interface Action {
  label: string;
  icon: React.ElementType;
  renderForm?: (onSubmitSuccess: () => void) => JSX.Element;
  handleFunction?: (id: string, onSubmitSuccess?: () => void) => void;
}
