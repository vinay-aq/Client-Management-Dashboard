import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, sessionRestoreAPI } from "./authAPI";
import { setAccessToken, clearAccessToken } from "../../services/axiosInstance";

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  authInitialized: false,
  loading: false,
  error: null,
};

export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async (_, thunkAPI) => {
    try {
      const response = await sessionRestoreAPI();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Session Expired",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "/auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await loginAPI(credentials);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload?.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action?.payload?.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.loading = false;
      setAccessToken(action.payload.accessToken);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      clearAccessToken();
    });

    builder.addCase(restoreSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(restoreSession.fulfilled, (state, action) => {
      state.user = action?.payload?.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.authInitialized = true;
      state.loading = false;
      setAccessToken(action.payload.accessToken);
    });
    builder.addCase(restoreSession.rejected, (state, action) => {
      state.loading = false;
      state.authInitialized = true;
      state.error = action.payload;
      clearAccessToken();
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
