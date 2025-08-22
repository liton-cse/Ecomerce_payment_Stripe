//Login type...
export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  image: string;
  role?: string;
  status?: string;
  verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface AuthResponse {
  token: string;
  user: UserData;
  message: string;
  data: string;
}

export interface LoginAuthState {
  loading: boolean;
  error: string | null;
  token: string | null;
  user: UserData | null;
}

//forget password interface...

export interface ForgetAuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
}

export interface forgetPayload {
  email: string;
}
// verify Otp...
export interface verifyEmailAuthState {
  email: string;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface verifyOtpPayload {
  email: string;
  oneTimeCode?: number;
}

// resetPassword
export interface ResetPasswordState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface ResetPasswordPayload {
  newPassword: string;
  confirmPassword: string;
  token: string;
}
