import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import clientReducer from "../features/clients/clientSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import usersReducer from "../features/users/userSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        clients: clientReducer,
        dashboard: dashboardReducer,
        users: usersReducer
    }
})

export default store;