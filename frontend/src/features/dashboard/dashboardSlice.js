import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardStatsAPI } from "./dashboardAPI";

const initialState = {
  stats : null,
  isFetchingStats: null,
  error: null,
};

export const fetchDashboardStats = createAsyncThunk(
  "/dashboard/fetchStats",
  async (_, thunk) => {
    try {
      const res = await fetchDashboardStatsAPI();
      return res;
    } catch (err) {
      thunk.rejectWithValue(err || "Unable to fetch dashboard data");
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDashboardStats.pending, (state, action) => {
      state.isFetchingStats = true;
    });
    builder.addCase(fetchDashboardStats.fulfilled, (state, action) => {
      state.stats = action.payload;
      state.isFetchingStats = false;
      state.error = false;
    });
    builder.addCase(fetchDashboardStats.rejected, (state, action) => {
      state.isFetchingStats = false;
      state.error = action.payload;
    });
  },
});

export default dashboardSlice.reducer;
