import axiosInstance from "../../../utils/axios.js"; // adjust path as needed
import axios from "axios";
import type {
  AuthResponse,
  LoginPayload,
  forgetPayload,
  ResetPasswordPayload,
  ResetPasswordState,
  verifyOtpPayload,
} from "../../../type/auth/auth.type.js"; // adjust path to your types

//login Api response....
export const loginProcess = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      payload
    );
    // Store token in localStorage upon successful login
    if (response.data.data) {
      localStorage.setItem("adminToken", response.data.data);
    }

    return response.data;
  } catch (err: any) {
    // Properly type and handle Axios error
    if (axios.isAxiosError(err)) {
      throw err.response?.data || err.message;
    }
    throw new Error("Login failed");
  }
};

//forget password Api response.
export const forgetPasswordApiResponse = async (
  payload: forgetPayload
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/forget-password",
      payload
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

//reset password Api response...
export const resetPasswordApi = async (
  payload: ResetPasswordPayload
): Promise<ResetPasswordState> => {
  const { token, ...body } = payload;

  const res = await axiosInstance.post("/auth/reset-password", body, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return res.data;
};

//verify email api response..
export const verifyOtpApiResponse = async (
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
