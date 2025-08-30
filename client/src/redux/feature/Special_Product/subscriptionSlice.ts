// src/store/slices/subscriptionSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  SubscribePayload,
  SubscriptionState,
} from "../../../type/SepcialProduct/spacialProduct.type.js";
import { subscribeApiResponse } from "../../apiAction/products/product.action.js";

import {
  fetchSubscriptionsApi,
  updateSubscriptionApi,
  deleteSubscriptionApi,
} from "./subscription.action.js";

const initialState: SubscriptionState = {
  loading: false,
  error: null,
  subscriptions: [], // Added to store subscriptions
};

// Create subscription
// Corrected subscribe thunk

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
export const updateSubscription = createAsyncThunk(
  "subscription/updateSubscription",
  async (
    { _id, updatedData }: { _id: string; updatedData: any },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateSubscriptionApi(_id, updatedData);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update subscription");
    }
  }
);

// Fetch subscriptions
export const fetchSubscriptions = createAsyncThunk(
  "subscription/fetchSubscriptions",
  async (_, thunkAPI) => {
    try {
      const response = await fetchSubscriptionsApi();
      return response.data.data; // Assuming the response contains an array of subscriptions
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch subscriptions"
      );
    }
  }
);

// Delete subscription
export const deleteSubscription = createAsyncThunk(
  "subscription/deleteSubscription",
  async ({ _id }: { _id: string }, { rejectWithValue }) => {
    // Add { rejectWithValue }
    try {
      await deleteSubscriptionApi(_id);
      return _id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete subscription");
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
      // Create Subscription
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
      })

      // Fetch Subscriptions
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload; // Update subscriptions
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch subscriptions";
      })

      // Update Subscription
      .addCase(updateSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscription.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to update subscription";
      })

      // Delete Subscription
      .addCase(deleteSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = state.subscriptions.filter(
          (subscription) => subscription._id !== action.meta.arg._id
        );
      })
      .addCase(deleteSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to delete subscription";
      });
  },
});

export default subscriptionSlice.reducer;
