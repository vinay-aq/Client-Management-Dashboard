import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import clientReducer from "../features/clients/clientSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        clients: clientReducer,
        dashboard: dashboardReducer
    }
})

export default store;