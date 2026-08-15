import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchClientsAPI,
  fetchClientByIdAPI,
  createClientAPI,
  updateClientAPI,
  deleteClientAPI,
  updateClientWorkflowAPI,
} from "./clientAPI";

const initialState = {
  clients: [],
  error: null,
  page: 1,
  limit: 10,
  totalPages: 0,
  totalCount: 0,
  selectedClient: null,
  isFetchingClients: false,
  hasFetchedClients: false,

  isFetchingClientDetails: false,

  isCreatingClient: false,

  isUpdatingClient: false,

  isDeletingClient: false,
};

export const fetchClients = createAsyncThunk(
  "/clients/fetchClients",
  async ({ page, limit, search }, thunkAPI) => {
    try {
      const res = await fetchClientsAPI(page, limit, search, thunkAPI.signal);
      return res;
    } catch (err) {
      if (err.name === "CanceledError") {
        return;
      }
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

export const updateClient = createAsyncThunk(
  "/clients/updateClient",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await updateClientAPI(id, data);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to updated client",
      );
    }
  },
);

export const deleteClient = createAsyncThunk(
  "/clients/deleleClient",
  async (id, thunkAPI) => {
    try {
      const res = await deleteClientAPI(id);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete client",
      );
    }
  },
);

export const updateClientWorkflow = createAsyncThunk(
  "/clients/updateClientWorkflow",
  async ({ id, nextStatus }, thunkAPI) => {
    try {
      const res = await updateClientWorkflowAPI(id, nextStatus);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update client",
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
      state.isFetchingClients = true;
    });
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.isFetchingClients = false;
      state.hasFetchedClients = true;
      state.clients = action.payload.clients;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalPages = action.payload.totalPages;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(fetchClients.rejected, (state, action) => {
      state.isFetchingClients = false;
      state.error = action.payload;
    });

    builder.addCase(fetchClientById.pending, (state) => {
      state.isFetchingClientDetails = true;
    });
    builder.addCase(fetchClientById.fulfilled, (state, action) => {
      state.isFetchingClientDetails = false;
      state.selectedClient = action.payload;
    });
    builder.addCase(fetchClientById.rejected, (state, action) => {
      state.isFetchingClientDetails = false;
      state.error = action.payload;
    });

    builder.addCase(createClient.pending, (state) => {
      state.isCreatingClient = true;
      state.error = null;
    });
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.isCreatingClient = false;
    });
    builder.addCase(createClient.rejected, (state, action) => {
      state.isCreatingClient = false;
      state.error = action.payload;
    });

    builder.addCase(updateClient.pending, (state) => {
      state.isUpdatingClient = true;
      state.error = null;
    });
    builder.addCase(updateClient.fulfilled, (state, action) => {
      state.isUpdatingClient = false;
    });
    builder.addCase(updateClient.rejected, (state, action) => {
      state.isUpdatingClient = false;
      state.error = action.payload;
    });

    builder.addCase(deleteClient.pending, (state) => {
      state.isDeletingClient = true;
      state.error = null;
    });
    builder.addCase(deleteClient.fulfilled, (state, action) => {
      state.isDeletingClient = false;
      state.selectedClient = null;
    });
    builder.addCase(deleteClient.rejected, (state, action) => {
      state.isDeletingClient = false;
      state.error = action.payload;
    });

    builder.addCase(updateClientWorkflow.fulfilled, (state, action) => {
      state.selectedClient = action.payload.client;
    });
  },
});

export default clientsSlice.reducer;
