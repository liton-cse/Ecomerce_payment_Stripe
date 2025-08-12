import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import cardReducer from "../feature/card/cardSlice.js";
import authReducer from "../feature/auth/loginSlice.js";
import forgetPasswordReducer from "../feature/auth/forgetPasswordSlice.js";
import verifyEmailReducer from "../feature/auth/verifyOptSlice.js";
import resetPaswordReducer from "../feature/auth/resetPasswordSlice.js";

export const store = configureStore({
  reducer: {
    cart: cardReducer,
    loginAuth: authReducer,
    forgetAuth: forgetPasswordReducer,
    verifyEmailAuth: verifyEmailReducer,
    resetPasswordAuth: resetPaswordReducer,
  },
});

// Infer RootState from the store's getState method
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
