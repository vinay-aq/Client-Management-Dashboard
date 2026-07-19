import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchMastersAPI,
  createMasterAPI,
  updateMasterAPI,
  deleteMasterAPI,
} from "./masterAPI";

const initialState = {
  masters: null,
  isFetchingMasters: false,
  isCreatingMaster: false,
  isUpdatingMaster: false,
  isDeletingMaster: false,
  error: null,
};

export const fetchMastersData = createAsyncThunk(
  "/master/fetchMasters",
  async (_, thunk) => {
    try {
      const res = await fetchMastersDataAPI();
      return res;
    } catch (err) {
      thunk.rejectWithValue(err || "Unable to fetch master data");
    }
  },
);

export const createMaster = createAsyncThunk(
  "/master/fetchMasters",
  async (_, thunk) => {
    try {
      const res = await createMasterAPI();
      return res;
    } catch (err) {
      thunk.rejectWithValue(err || "Unable to create Master");
    }
  },
);

export const updateMaster = createAsyncThunk(
  "/master/fetchMasters",
  async (_, thunk) => {
    try {
      const res = await updateMasterAPI();
      return res;
    } catch (err) {
      thunk.rejectWithValue(err || "Unable to update Master");
    }
  },
);

export const deleteMaster = createAsyncThunk(
  "/master/fetchMasters",
  async (_, thunk) => {
    try {
      const res = await deleteMasterAPI();
      return res;
    } catch (err) {
      thunk.rejectWithValue(err || "Unable to delete Master");
    }
  },
);

const dashboardSlice = createSlice({
  name: "master",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMastersData.pending, (state, action) => {
      state.isFetchingStats = true;
    });
    builder.addCase(fetchMastersData.fulfilled, (state, action) => {
      state.masters = action.payload.masters;
      state.isFetchingStats = false;
    });
    builder.addCase(fetchMastersData.rejected, (state, action) => {
      state.isFetchingStats = false;
      state.error = action.payload;
    });
    builder.addCase(createMasterAPI.pending, (state, action) => {
      state.isFetchingStats = true;
    });
    builder.addCase(createMasterAPI.fulfilled, (state, action) => {
      const master = action.payload.master;
      state.masters = { ...state.masters, master };
      state.error = false;
    });
    builder.addCase(createMasterAPI.rejected, (state, action) => {
      state.isCreatingMaster = false;
      state.error = action.payload;
    });

    builder.addCase(updateMasterAPI.pending, (state, action) => {
      state.isUpdatingMaster = true;
    });
    builder.addCase(updateMasterAPI.fulfilled, (state, action) => {
      state.masters = state.masters.map((m) =>
        m._id === action.payload._id ? action.paylod : m,
      );
      state.isUpdatingMaster = false;
    });
    builder.addCase(updateMasterAPI.rejected, (state, action) => {
      state.isUpdatingMaster = false;
      state.error = action.payload;
    });

    builder.addCase(deleteMasterAPI.pending, (state, action) => {
      state.isDeletingMaster = true;
    });
    builder.addCase(deleteMasterAPI.fulfilled, (state, action) => {
      state.isDeletingMaster = false;
      state.masters = state.masters.filter((m) => m._id !== action.payload.id);
    });
    builder.addCase(deleteMasterAPI.rejected, (state, action) => {
      state.isDeletingMaster = false;
      state.error = action.payload;
    });
  },
});

export default dashboardSlice.reducer;
