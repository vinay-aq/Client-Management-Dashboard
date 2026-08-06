import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchMastersDataAPI,
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
  "/master/fetchMaster",
  async (type, thunk) => {
    try {
      const res = await fetchMastersDataAPI(type);
      return res;
    } catch (err) {
        return thunk.rejectWithValue(err?.response?.data?.error?.message || "Unable to fetch master data");
    }
  },
);

export const createMaster = createAsyncThunk(
  "/master/createMaster",
  async (master, thunk) => {
    try {
      const res = await createMasterAPI(master);
      return res;
    } catch (err) {
      console.dir(err);
      return thunk.rejectWithValue(
        err?.response?.data?.error?.message || "Unable to create Master",
      );
    }
  },
);

export const updateMaster = createAsyncThunk(
  "/master/updateMaster",
  async (master, thunk) => {
    try {
      const res = await updateMasterAPI(master);
      return res;
    } catch (err) {
      return  thunk.rejectWithValue(err?.response?.data?.error?.message || "Unable to update Master");
    }
  },
);

export const deleteMaster = createAsyncThunk(
  "/master/deleteMaster",
  async (id, thunk) => {
    try {
      const res = await deleteMasterAPI(id);
      return res;
    } catch (err) {
      return  thunk.rejectWithValue(err?.response?.data?.error?.message || "Unable to delete Master");
    }
  },
);

const dashboardSlice = createSlice({
  name: "master",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMastersData.pending, (state, action) => {
      state.isFetchingMasters = true;
    });
    builder.addCase(fetchMastersData.fulfilled, (state, action) => {
      state.masters = action.payload.masters;
      state.isFetchingMasters = false;
    });
    builder.addCase(fetchMastersData.rejected, (state, action) => {
      state.isFetchingMasters = false;
      state.error = action.payload;
    });
    builder.addCase(createMaster.pending, (state, action) => {
      state.isCreatingMaster = true;
    });
    builder.addCase(createMaster.fulfilled, (state, action) => {
      state.isCreatingMaster = false;
    });
    builder.addCase(createMaster.rejected, (state, action) => {
      state.isCreatingMaster = false;
      state.error = action.payload;
    });

    builder.addCase(updateMaster.pending, (state, action) => {
      state.isUpdatingMaster = true;
    });
    builder.addCase(updateMaster.fulfilled, (state, action) => {
      state.isUpdatingMaster = false;
    });
    builder.addCase(updateMaster.rejected, (state, action) => {
      state.isUpdatingMaster = false;
      state.error = action.payload;
    });

    builder.addCase(deleteMaster.pending, (state, action) => {
      state.isDeletingMaster = true;
    });
    builder.addCase(deleteMaster.fulfilled, (state, action) => {
      state.isDeletingMaster = false;
    });
    builder.addCase(deleteMaster.rejected, (state, action) => {
      state.isDeletingMaster = false;
      state.error = action.payload;
    });
  },
});

export default dashboardSlice.reducer;
