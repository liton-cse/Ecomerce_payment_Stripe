import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "../feature/card/cardSlice";
import authReducer from "../feature/auth/loginSlice";
import forgetPasswordReducer from "../feature/auth/forgetPasswordSlice";
import verifyEmailReducer from "../feature/auth/verifyOptSlice";
import resetPaswordReducer from "../feature/auth/resetPasswordSlice";

export const store = configureStore({
  reducer: {
    cart: cardReducer,
    loginAuth: authReducer,
    forgetAuth: forgetPasswordReducer,
    verifyEmailAuth: verifyEmailReducer,
    resetPasswordAuth: resetPaswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
