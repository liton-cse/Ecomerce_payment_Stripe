// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type {
  LoginPayload,
  AuthResponse,
  LoginAuthState,
} from "../../../type/auth/auth.type.js";
import axiosInstance from "../../../utils/axios.js";

const loginProcess = async (payload: LoginPayload): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      payload
    );
    // Store token in localStorage upon successful login
    if (response.data.data) {
      localStorage.setItem("authToken", response.data.data);
    }

    return response.data;
  } catch (err: any) {
    // Properly type the error
    if (axios.isAxiosError(err)) {
      throw err.response?.data || err.message;
    }
    throw new Error("Login failed");
  }
};

export const login = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  {
    rejectValue: string;
  }
>("auth/login", async (payload: LoginPayload, { rejectWithValue }) => {
  try {
    return await loginProcess(payload);
  } catch (err) {
    let errorMessage = "Login failed";

    if (typeof err === "string") {
      errorMessage = err;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === "object" && err !== null && "message" in err) {
      errorMessage = String(err.message);
    }

    return rejectWithValue(errorMessage);
  }
});

const initialState: LoginAuthState = {
  user: null,
  token: localStorage.getItem("authToken") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "loginAuth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authToken"); // Clear token on logout
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.data;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
