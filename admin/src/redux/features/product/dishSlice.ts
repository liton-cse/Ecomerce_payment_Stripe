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
  refresher: boolean; // 👈 add this
}

const initialState: DishState = {
  dishes: [],
  currentDish: undefined,
  loading: false,
  error: undefined,
  refresher: false,
};

// Fetch all dishes
export const fetchDishes = createAsyncThunk(
  "dish/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/products");
      return res.data.data as Dish[];
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
      const res = await axiosInstance.get(`/api/dishes/${id}`);
      return res.data as Dish;
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

const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {
    clearCurrentDish(state) {
      state.currentDish = undefined;
    },
    consumeRefresher(state) {
      // 👈 call this after another component reacts to the change
      state.refresher = false;
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
        (state, action: PayloadAction<Dish[]>) => {
          state.loading = false;
          state.dishes = action.payload;
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
        (state, action: PayloadAction<Dish>) => {
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
        state.dishes = state.dishes.filter(
          // adjust this if your Dish uses _id:string
          (dish) => dish.id !== Number(action.payload)
        );
      });
  },
});

export const { clearCurrentDish, consumeRefresher } = dishSlice.actions;
export default dishSlice.reducer;
