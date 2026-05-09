import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchClientsAPI from "./clientAPI";

const initialState = {
  clients: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  totalPages: 0,
  totalCount: 0,
};

export const fetchClients = createAsyncThunk(
  "/clients/fetchClients",
  async ({ page, limit }, thunkAPI) => {
    try {
      const res = await fetchClientsAPI(page, limit);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch clients",
      );
    }
  },
);

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClients.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(fetchClients.fulfilled, (state,action) => {
        state.loading = false;
        state.clients = action.payload.clients;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
        state.totalCount = action.payload.totalCount;
    });
    builder.addCase(fetchClients.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
    });
  },
});

export default clientsSlice.reducer;
