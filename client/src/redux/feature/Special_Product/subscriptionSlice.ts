// src/store/slices/subscriptionSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  SubscribePayload,
  SubscriptionState,
} from "../../../type/SepcialProduct/spacialProduct.type.js";
import { subscribeApiResponse } from "../../apiAction/products/product.action.js";

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
  async ({ products, token }: SubscribePayload, { rejectWithValue }) => {
    try {
      await subscribeApiResponse({ products, token });
      return; // <--- Add this explicit return here
    } catch (error: any) {
      // Ensure error.message exists and is string
      if (error && error.message && typeof error.message === "string") {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
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
