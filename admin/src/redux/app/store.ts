import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import authReducer from "../features/auth/loginSlice";
import sidebarReducer from "../features/product/asideSlice";
import dishReducer from "../features/product/dishSlice";
import userReducer from "../features/user/userSliice";
import subcribeReducer from "../features/product/subscriptionSlice";

export const store = configureStore({
  reducer: {
    loginAuth: authReducer,
    sidebar: sidebarReducer,
    dish: dishReducer,
    user: userReducer,
    subscribe: subcribeReducer,
  },
});

// Infer RootState from the store's getState method
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
