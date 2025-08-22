// store/slices/dishSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { Dish } from "@/type/product/product.type";

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
      const res = await axios.get("/api/dishes");
      return res.data as Dish[];
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
      const res = await axios.get(`/api/dishes/${id}`);
      return res.data as Dish;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch dish");
    }
  }
);

// Add or update dish
export const saveDish = createAsyncThunk(
  "dish/save",
  async (payload: { id?: string; data: FormData }, thunkAPI) => {
    try {
      if (payload.id) {
        await axios.put(`/api/dishes/${payload.id}`, payload.data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("/api/dishes", payload.data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      return payload.id || null;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to save dish");
    }
  }
);

// Delete dish
export const deleteDish = createAsyncThunk(
  "dish/delete",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`/api/dishes/${id}`);
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
