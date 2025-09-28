
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers, createUser, updateUser, deleteUserApi } from "../../api/api";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const getUsers = createAsyncThunk<User[], number>(
  "user/fetchUsers",
  async (page = 1) => {
    const res = await fetchUsers(page);
    return res.data.data.map((u: any) => ({
      id: Number(u.id),
      email: u.email,
      first_name: u.first_name,
      last_name: u.last_name,
      avatar: u.avatar,
    })) as User[];
  }
);

export const addUser = createAsyncThunk<User, Partial<User>>(
  "user/addUser",
  async (userData) => {
    const res = await createUser(userData);
    return { ...userData, ...res.data, id: Number(res.data.id) } as User;
  }
);

export const editUser = createAsyncThunk<User, { id: number; data: Partial<User> }>(
  "user/editUser",
  async ({ id, data }) => {
    const res = await updateUser(id, data);
    return { ...data, ...res.data, id } as User;
  }
);

export const removeUser = createAsyncThunk<number, number>(
  "user/removeUser",
  async (id) => {
    await deleteUserApi(id);
    return id;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(removeUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
