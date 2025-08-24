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

export const SubscriptionProduct: {
  type: "text" | "textarea" | "number" | "select" | "file";
  name: string;
  label: string;
  placeholder?: string;
  options?: { label: string; value: string }[]; // for select
  required?: boolean;
}[] = [
  {
    name: "name",
    label: "Product Name",
    type: "text",
    placeholder: "Enter name",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Brief description",
    required: true,
  },
  {
    name: "price",
    label: "Price ($)",
    type: "number",
    placeholder: "Enter price",
    required: true,
  },
  {
    name: "billing_cycle",
    label: "Billing Cycle",
    type: "select",
    options: [
      { label: "Monthly", value: "monthly" },
      { label: "Yearly", value: "yearly" },
    ],
    required: true,
  },
  { name: "image", label: "Product Image", type: "file", required: true },
  {
    name: "stripe_price_id",
    label: "Stripe Price ID",
    type: "text",
    placeholder: "Stripe price ID",
    required: true,
  },
];
