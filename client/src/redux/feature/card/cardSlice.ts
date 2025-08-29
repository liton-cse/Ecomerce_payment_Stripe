import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CartItem } from "../../../type/product/product.type.js";
import axiosInstance from "../../../utils/axios.js";
export type CartState = {
  card: CartItem[];
  loading: boolean;
  currentDish?: CartItem | undefined;
  error?: string | undefined;
  refresher: boolean;
  cartItem: CartItem[];
};

const initialState: CartState = {
  card: [],
  currentDish: undefined,
  loading: false,
  error: undefined,
  refresher: false,
  cartItem: [],
};

// Fetch all dishes
export const fetchDishes = createAsyncThunk(
  "dish/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/products");
      return res.data.data as CartItem[];
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch dishes");
    }
  }
);

// Fetch a single dish by ID
export const fetchDishById = createAsyncThunk(
  "dish/fetchById",
  async (id: string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      return res.data as CartItem;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch dish");
    }
  }
);

// Create
export const saveDish = createAsyncThunk<
  string | null,
  { data: FormData },
  { rejectValue: string }
>("dish/save", async ({ data }, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data._id || null;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Failed to save dish"
    );
  }
});

// Update (use a different action type to avoid clashing with saveDish)
export const updateDish = createAsyncThunk<
  string | null,
  { _id?: string; data?: FormData; qnty?: number },
  { rejectValue: string }
>("dish/update", async ({ _id, data }, thunkAPI) => {
  try {
    if (_id) {
      await axiosInstance.put(`/products/${_id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
    return _id || null;
  } catch {
    return thunkAPI.rejectWithValue("Failed to save dish");
  }
});

// Delete
export const deleteDish = createAsyncThunk(
  "dish/delete",
  async (id: string, thunkAPI) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      return id;
    } catch {
      return thunkAPI.rejectWithValue("Failed to delete dish");
    }
  }
);

const cardSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.cartItem.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        const existingItem = state.cartItem[itemIndex];
        if (existingItem) {
          existingItem.qnty += 1;
        }
      } else {
        const temp = { ...action.payload, qnty: 1 };
        state.cartItem = [...state.cartItem, temp];
      }
    },
    removeFromCart: (state, action: PayloadAction<CartItem["_id"]>) => {
      state.cartItem = state.cartItem.filter(
        (item) => item._id !== action.payload
      );
    },
    removeSingleItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndexDec = state.cartItem.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndexDec >= 0) {
        const existingItem = state.cartItem[itemIndexDec];
        if (existingItem) {
          if (existingItem.qnty > 1) {
            existingItem.qnty -= 1;
          } else if (existingItem.qnty === 1) {
            state.cartItem.splice(itemIndexDec, 1);
          }
        }
      }
    },

    emptyCart: (state) => {
      state.cartItem = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchDishes.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.loading = false;
          state.card = action.payload;
        }
      )
      .addCase(fetchDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchById
      .addCase(fetchDishById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchDishById.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.loading = false;
          state.currentDish = action.payload;
        }
      )
      .addCase(fetchDishById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // saveDish — set refresher true when it finishes successfully
      .addCase(saveDish.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(saveDish.fulfilled, (state) => {
        state.loading = false;
        state.refresher = true; // 👈 flip on
      })
      .addCase(saveDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // inside extraReducers builder chain...
      .addCase(updateDish.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateDish.fulfilled, (state) => {
        state.loading = false;
        state.refresher = true;
      })
      .addCase(updateDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // deleteDish local update (optional; left as-is)
      .addCase(deleteDish.fulfilled, (state, action: PayloadAction<string>) => {
        state.card = state.card.filter(
          // adjust this if your Dish uses _id:string
          (dish) => dish._id !== Number(action.payload)
        );
      });
  },
});

export const { addToCart, removeFromCart, removeSingleItem, emptyCart } =
  cardSlice.actions;

export default cardSlice.reducer;
