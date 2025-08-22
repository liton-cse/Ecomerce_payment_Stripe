export const product = [
  { key: "dish", type: "text", placeholder: "Dish Name", required: true },
  { key: "imgdata", type: "file", placeholder: "Dish Image" },
  { key: "address", type: "text", placeholder: "Address" },
  { key: "delimg", type: "file", placeholder: "Delivery Image" },
  { key: "somedata", type: "text", placeholder: "Some Data" },
  { key: "price", type: "number", placeholder: "Price" },
  { key: "rating", type: "text", placeholder: "Rating" },
  { key: "arrimg", type: "file", placeholder: "Arr Image" },
  { key: "qnty", type: "number", placeholder: "Quantity" },
];

import type { UserData } from "@/type/auth/auth.type";
export const userFields: {
  key: keyof UserData;
  placeholder: string;
  type: "text" | "email" | "checkbox" | "url" | "file";
  required?: boolean;
}[] = [
  { key: "name", placeholder: "Name", type: "text", required: true },
  { key: "email", placeholder: "Email", type: "email", required: true },
  { key: "role", placeholder: "Role", type: "text" },
  { key: "status", placeholder: "Status", type: "text" },
  { key: "verified", placeholder: "Verified", type: "checkbox" },
  { key: "image", placeholder: "Image URL", type: "file" },
];
