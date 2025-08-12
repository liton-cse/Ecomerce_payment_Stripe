import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../../type/product/product.type.js";

export type CartState = {
  card: CartItem[];
};

const initialState: CartState = {
  card: [],
};

const cardSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.card.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        const existingItem = state.card[itemIndex];
        if (existingItem) {
          existingItem.qnty += 1;
        }
      } else {
        const temp = { ...action.payload, qnty: 1 };
        state.card = [...state.card, temp];
      }
    },
    removeFromCart: (state, action: PayloadAction<CartItem["id"]>) => {
      state.card = state.card.filter((item) => item.id !== action.payload);
    },
    removeSingleItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndexDec = state.card.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndexDec >= 0) {
        const existingItem = state.card[itemIndexDec];
        if (existingItem) {
          if (existingItem.qnty > 1) {
            existingItem.qnty -= 1;
          } else if (existingItem.qnty === 1) {
            state.card.splice(itemIndexDec, 1);
          }
        }
      }
    },

    emptyCart: (state) => {
      state.card = [];
    },
  },
});

export const { addToCart, removeFromCart, removeSingleItem, emptyCart } =
  cardSlice.actions;

export default cardSlice.reducer;
