// src/store/slices/subscriptionSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadStripe } from "@stripe/stripe-js";
import type {
  SubscribePayload,
  SubscriptionState,
} from "../../../type/SepcialProduct/spacialProduct.type.js";

const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY!;

const initialState: SubscriptionState = {
  loading: false,
  error: null,
};

export const subscribe = createAsyncThunk<
  void,
  SubscribePayload,
  { rejectValue: string }
>(
  "subscription/subscribe",
  async (
    { priceId, productName, billingCycle, returnUrl },
    { rejectWithValue }
  ) => {
    try {
      // your existing logic, e.g.:
      const stripe = await loadStripe(stripePublicKey);
      if (!stripe) throw new Error("Stripe failed to initialize");

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, productName, billingCycle, returnUrl }),
      });

      if (!response.ok) throw new Error("Failed to create checkout session");

      const { id: sessionId } = await response.json();

      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) throw result.error;

      return; // <--- Add this explicit return here
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subscribe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribe.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(subscribe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default subscriptionSlice.reducer;
