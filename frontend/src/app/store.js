import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import clientReducer from "../features/clients/clientSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import usersReducer from "../features/users/userSlice";
import masterReducer from "../features/master/masterSlice"
const store = configureStore({
    reducer: {
        auth: authReducer,
        clients: clientReducer,
        dashboard: dashboardReducer,
        users: usersReducer,
        masters: masterReducer,
    }
})

export default store;