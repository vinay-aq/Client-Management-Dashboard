import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchClientsAPI,
  fetchClientByIdAPI,
  createClientAPI,
} from "./clientAPI";

const initialState = {
  clients: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  totalPages: 0,
  totalCount: 0,
  selectedClient: null,
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

export const fetchClientById = createAsyncThunk(
  "/clients/fetchClientById",
  async (id, thunkAPI) => {
    try {
      const res = await fetchClientByIdAPI(id);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch client",
      );
    }
  },
);

export const createClient = createAsyncThunk(
  "/clients/createClient",
  async (data, thunkAPI) => {
    try {
      const res = await createClientAPI(data);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create client",
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
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.loading = false;
      state.clients = action.payload.clients;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalPages = action.payload.totalPages;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(fetchClients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchClientById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchClientById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedClient = action.payload;
    });
    builder.addCase(fetchClientById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createClient.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default clientsSlice.reducer;
