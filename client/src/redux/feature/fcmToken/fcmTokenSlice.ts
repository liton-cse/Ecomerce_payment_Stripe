// store/fcmSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { requestPermission } from "../../../services/firebase/firebase.js"; // adjust path

// Define the state type
export interface FcmState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: FcmState = {
  token: null,
  status: "idle",
  error: null,
};

// Async thunk to request permission & get FCM token
export const getFcmToken = createAsyncThunk<string>(
  "fcm/fetchToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = await requestPermission();
      if (!token) throw new Error("Token not available");
      return token;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the slice
const fcmSlice = createSlice({
  name: "fcm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFcmToken.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getFcmToken.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.token = action.payload;
        }
      )
      .addCase(getFcmToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default fcmSlice.reducer;
