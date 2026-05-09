import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import clientReducer from "../features/clients/clientSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        clients: clientReducer,
    }
})

export default store;