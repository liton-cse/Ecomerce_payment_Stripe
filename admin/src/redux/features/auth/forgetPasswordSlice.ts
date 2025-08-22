// features/auth/authSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  AuthResponse,
  forgetPayload,
  ForgetAuthState,
} from "../../../type/auth/auth.type.js";
import { forgetPasswordApiResponse } from "../../apiAction/auth/authApi.js";

// Async thunk
export const forgetPassword = createAsyncThunk<
  AuthResponse,
  forgetPayload,
  { rejectValue: any }
>("auth/forgetPassword", async (payload, { rejectWithValue }) => {
  try {
    return await forgetPasswordApiResponse(payload);
  } catch (error) {
    return rejectWithValue(error);
  }
});

const initialState: ForgetAuthState = {
  loading: false,
  error: null,
  success: false,
  message: null,
};

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(
        forgetPassword.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message || "Password reset link sent.";
        }
      )
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          (action.payload as any)?.message ||
          "Failed to send reset password link.";
      });
  },
});

export const { resetAuthState } = forgetPasswordSlice.actions;
export default forgetPasswordSlice.reducer;
