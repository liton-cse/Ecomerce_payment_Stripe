import axiosInstance from "../../../utils/axios.js"; // adjust path to your axios setup
import { loadStripe } from "@stripe/stripe-js";
import type { SubscribePayload } from "../../../type/SepcialProduct/spacialProduct.type.js";

// Put your Stripe public key here (or import from config)
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLISH_KEY as string;
export const subscribeApiResponse = async ({
  products,
  token,
}: SubscribePayload): Promise<void> => {
  // Load Stripe
  const stripe = await loadStripe(stripePublicKey);

  if (!stripe) {
    throw new Error("Stripe failed to initialize");
  }
  const response = await axiosInstance.post(
    "/products/create-checkout-session",
    { products, token }
  );

  if (!response.data) {
    throw new Error("Failed to create checkout session");
  }

  const { id: sessionId } = response.data;
  if (!sessionId || typeof sessionId !== "string") {
    throw new Error("Invalid session id received from API");
  }
  // Redirect to checkout
  const result = await stripe.redirectToCheckout({ sessionId });
  if (result.error) {
    throw result.error;
  }
};
