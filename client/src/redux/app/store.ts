import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "../feature/cardSlice";
import authReducer from "../feature/auth/loginSlice";

export const store = configureStore({
  reducer: {
    cart: cardReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
