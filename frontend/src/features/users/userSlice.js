import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUsersAPI,
  toggleUserStatusAPI,
  updateUserRoleByIdAPI,
} from "./userAPI";

const initialState = {
  users: null,
  error: null,
  isFetchingUsers: false,
  isUpdatingUserRole: false,
  isUpdatingUserStatus: false,
  selectedUser: null,
};

export const getUsers = createAsyncThunk(
  "/users/getUsers",
  async (_, thunk) => {
    try {
      const res = await fetchUsersAPI();
      return res;
    } catch (err) {
      thunk.rejectWithValue(
        err.response?.data?.message || "Failed to retreive users data",
      );
    }
  },
);

export const toggleUserStatusById = createAsyncThunk(
  "/users/toggleUserStatusById",
  async ({ id, isActive }, thunk) => {
    try {
      const res = await toggleUserStatusAPI(id, isActive);
      return res;
    } catch (err) {
      thunk.rejectWithValue(
        err.response?.data?.message || "Failed to update user status",
      );
    }
  },
);

export const updateUserRoleById = createAsyncThunk(
  "/users/updateUserRoleById",
  async ({ id, role }, thunk) => {
    try {
      const res = await updateUserRoleByIdAPI(id, role);
      return res;
    } catch (err) {
      thunk.rejectWithValue(
        err.response?.data?.message || "Failed to update role",
      );
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.isFetchingUsers = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isFetchingUsers = false;
      state.users = action.payload.users;
      state.error = null;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isFetchingUsers = false;
      state.users = null;
      state.error = action.payload;
    });

    builder.addCase(toggleUserStatusById.pending, (state, action) => {
      state.isUpdatingUserStatus = true;
    });
    builder.addCase(toggleUserStatusById.fulfilled, (state, action) => {
      state.isUpdatingUserStatus = false;
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user,
      );
      state.error = null;
    });
    builder.addCase(toggleUserStatusById.rejected, (state, action) => {
      state.isUpdatingUserStatus = false;
      state.error = action.payload;
    });

    builder.addCase(updateUserRoleById.pending, (state, action) => {
      state.isUpdatingUserRole = true;
    });
    builder.addCase(updateUserRoleById.fulfilled, (state, action) => {
      state.isUpdatingUserRole = false;
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user,
      );
      state.error = null;
    });
    builder.addCase(updateUserRoleById.rejected, (state, action) => {
      state.isUpdatingUserRole = false;
      state.error = action.payload;
    });
  },
});

export default usersSlice.reducer;
