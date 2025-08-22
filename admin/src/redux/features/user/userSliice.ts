// src/redux/features/user/userSlice.ts
import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { UserData } from "@/type/auth/auth.type";

// Async actions
export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await fetch("/api/users");
  return (await res.json()) as UserData[];
});

export const addUser = createAsyncThunk(
  "users/add",
  async (user: Partial<UserData>) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return (await res.json()) as UserData;
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, user }: { id: string; user: Partial<UserData> }) => {
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return (await res.json()) as UserData;
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id: string) => {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    return id;
  }
);

export interface UserState {
  users: UserData[];
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.users.push(action.payload);
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.users = state.users.map((u) =>
            u._id === action.payload._id ? action.payload : u
          );
        }
      )
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      });
  },
});

export default userSlice.reducer;
