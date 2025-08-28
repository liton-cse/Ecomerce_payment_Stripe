// Product fields configuration
export const product = [
  { key: "dish", type: "text", placeholder: "Dish Name", required: true },
  { key: "address", type: "text", placeholder: "Address", required: true },
  { key: "somedata", type: "text", placeholder: "Some Data", required: true },
  { key: "price", type: "number", placeholder: "Price", required: true },
  { key: "rating", type: "number", placeholder: "Rating", required: true },
  { key: "qnty", type: "number", placeholder: "Quantity", required: true },
  { key: "image", type: "file", placeholder: "Dish Image", required: true },
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
