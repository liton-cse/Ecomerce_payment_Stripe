import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  ResetPasswordState,
  ResetPasswordPayload,
} from "../../../type/auth/auth.type.js";
import { resetPasswordApi } from "../../apiAction/auth/authApi.js";
// Initial state
const initialState: ResetPasswordState = {
  loading: false,
  error: null,
  success: false,
};

// Async thunk
export const resetPassword = createAsyncThunk<
  ResetPasswordState,
  ResetPasswordPayload,
  { rejectValue: string }
>("resetPassword/resetPassword", async (payload, thunkAPI) => {
  try {
    return await resetPasswordApi(payload); // ✅ return typed result
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Reset password failed"
    );
  }
});

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    clearResetPasswordState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Reset password failed";
      });
  },
});

export const { clearResetPasswordState } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
