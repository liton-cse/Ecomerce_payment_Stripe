// src/redux/features/forgetAuthSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios.js";
import type {
  verifyEmailAuthState,
  AuthResponse,
  verifyOtpPayload,
} from "../../../type/auth/auth.type.js";

const initialState: verifyEmailAuthState = {
  email: "",
  loading: false,
  error: null,
  success: false,
  token: null,
};

const verifyOtpApiResponse = async (
  payload: verifyOtpPayload
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/verify-email",
      payload
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// Async thunk to verify OTP
// Async thunk
export const verifyOtp = createAsyncThunk<
  AuthResponse,
  verifyOtpPayload,
  { rejectValue: any }
>("auth/verify-email", async (payload, { rejectWithValue }) => {
  try {
    return await verifyOtpApiResponse(payload);
  } catch (error) {
    return rejectWithValue(error);
  }
});

const verifyEmailSlice = createSlice({
  name: "verifyEmailAuth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.token = action.payload.data;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP verification failed";
      });
  },
});

export const { setEmail } = verifyEmailSlice.actions;
export default verifyEmailSlice.reducer;
