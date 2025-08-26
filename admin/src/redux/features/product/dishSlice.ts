// store/slices/dishSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { Dish } from "@/type/product/product.type";
import axiosInstance from "@/utils/axios";

export interface DishState {
  dishes: Dish[];
  currentDish?: Dish;
  loading: boolean;
  error?: string;
}

const initialState: DishState = {
  dishes: [],
  currentDish: undefined,
  loading: false,
  error: undefined,
};

// Fetch all dishes
export const fetchDishes = createAsyncThunk(
  "dish/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/products");
      return res.data.data as Dish[];
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch dishes");
    }
  }
);

// Fetch a single dish by ID
export const fetchDishById = createAsyncThunk(
  "dish/fetchById",
  async (id: string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/api/dishes/${id}`);
      return res.data as Dish;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch dish");
    }
  }
);

// Add or update dish and update the quantity..
// Add or update dish and update the quantity
export const saveDish = createAsyncThunk<
  string | null, // return type
  { data: FormData }, // payload type - make data required
  { rejectValue: string } // thunkAPI reject type
>("dish/save", async ({ data }, thunkAPI) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axiosInstance.post("/products", data, config);
    // Return the product ID if successful
    return res.data._id || null;
  } catch (err: any) {
    console.error("Error while saving dish:", err);

    // More detailed error logging
    if (err.response) {
      console.error("Response error:", err.response.data);
      console.error("Response status:", err.response.status);
    }

    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Failed to save dish"
    );
  }
});

export const updateDish = createAsyncThunk<
  string | null, // return type
  { _id?: string; data?: FormData; qnty?: number }, // payload type
  { rejectValue: string } // thunkAPI reject type (optional)
>("dish/save", async ({ _id, data, qnty }, thunkAPI) => {
  try {
    if (_id && qnty) {
      await axiosInstance.put(`/products/${_id}`, qnty);
    } else if (_id) {
      await axiosInstance.put(`/products/${_id}`, data);
    } else {
      await axiosInstance.post("/products", data);
    }

    return _id || null;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to save dish");
  }
});

// Delete dish
export const deleteDish = createAsyncThunk(
  "dish/delete",
  async (id: string, thunkAPI) => {
    try {
      await axiosInstance.delete(`/api/dishes/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to delete dish");
    }
  }
);

const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {
    clearCurrentDish(state) {
      state.currentDish = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchDishes.fulfilled,
        (state, action: PayloadAction<Dish[]>) => {
          state.loading = false;
          state.dishes = action.payload;
        }
      )
      .addCase(fetchDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchDishById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchDishById.fulfilled,
        (state, action: PayloadAction<Dish>) => {
          state.loading = false;
          state.currentDish = action.payload;
        }
      )
      .addCase(fetchDishById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteDish.fulfilled, (state, action: PayloadAction<string>) => {
        state.dishes = state.dishes.filter(
          (dish) => dish.id !== Number(action.payload)
        );
      });
  },
});

export const { clearCurrentDish } = dishSlice.actions;
export default dishSlice.reducer;
