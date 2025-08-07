import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  card: [],
};

const cardSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to card or increment quantity if already exists
    addToCart: (state, action) => {
      const itemIndex = state.card.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.card[itemIndex].qnty += 1;
      } else {
        const temp = { ...action.payload, qnty: 1 };
        state.card = [...state.card, temp];
      }
    },

    // Remove item completely from card
    removeFromCart: (state, action) => {
      state.card = state.card.filter((item) => item.id !== action.payload);
    },

    // Remove single quantity of an item (or remove if quantity becomes 0)
    removeSingleItem: (state, action) => {
      const itemIndexDec = state.card.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.carts[itemIndexDec].qnty >= 1) {
        state.carts[itemIndexDec].qnty -= 1;
      }
    },

    // Empty the entire card
    emptyCart: (state) => {
      state.card = [];
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, removeSingleItem, emptyCart } =
  cardSlice.actions;

export default cardSlice.reducer;
