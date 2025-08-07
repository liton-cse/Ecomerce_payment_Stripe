import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "../feature/cardSlice";

export const store = configureStore({
  reducer: {
    cart: cardReducer,
  },
});
