// src/apiAction/products/subscriptionApi.ts

import axiosInstance from "../../../utils/axios.js";

// Create Subscription (already existing)
export const subscribeApiResponse = async ({
  products,
  token,
}: {
  products: any[];
  token: string;
}) => {
  return axiosInstance.post("/subscriptions", { products, token });
};

// Read Subscriptions
export const fetchSubscriptionsApi = async () => {
  return axiosInstance.get("/special/products");
};

// Update Subscription
export const updateSubscriptionApi = async (id: string, updatedData: any) => {
  return axiosInstance.put(`/subscriptions/${id}`, updatedData);
};

// Delete Subscription
export const deleteSubscriptionApi = async (id: string) => {
  return axiosInstance.delete(`/subscriptions/${id}`);
};
