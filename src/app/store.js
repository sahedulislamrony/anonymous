// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dataReducer from "../features/data/dataSlice";
import userReducer from "../features/user/userSlice";
import viewReducer from "../features/view/viewSlice";

const store = configureStore({
    reducer: {
        auth: authReducer, 
        user: userReducer,
        data: dataReducer,
        view: viewReducer,
    },
    devTools: import.meta.env.VITE_APP_REDUX_DEVTOOLS === "true", 
});

export default store;
