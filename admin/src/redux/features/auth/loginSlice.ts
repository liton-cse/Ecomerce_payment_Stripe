// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  LoginPayload,
  AuthResponse,
  LoginAuthState,
  UserData,
} from "../../../type/auth/auth.type";
import { loginProcess } from "../../apiAction/auth/authApi.js";
import axiosInstance from "@/utils/axios";
import type { RootState } from "@/redux/app/store";

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

export const fetchUserProfile = createAsyncThunk<
  UserData, // Changed to UserData (not AuthResponse)
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>("auth/fetchProfile", async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().loginAuth.token;
    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    const response = await axiosInstance.get("/user/profile", {
      // Proper response type
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data; // This returns UserData
  } catch (err: unknown) {
    let errorMessage = "Failed to fetch profile";

    if (typeof err === "string") {
      errorMessage = err;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === "object" && err !== null && "message" in err) {
      errorMessage = String((err as { message: unknown }).message);
    }

    return rejectWithValue(errorMessage);
  }
});

const initialState: LoginAuthState = {
  user: null,
  token: localStorage.getItem("adminToken") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "loginAuth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("adminToken"); // Clear token on logout
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
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
