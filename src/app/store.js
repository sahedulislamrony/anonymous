// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dataReducer from "../features/data/dataSlice";
import navbarReducer from "../features/navigation/navSlice";
import popupReducer from "../features/popup/popupSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
    reducer: {
        auth: authReducer, 
        popup: popupReducer,
        navbar: navbarReducer,
        user: userReducer,
        data: dataReducer,
    },
    devTools: import.meta.env.VITE_APP_REDUX_DEVTOOLS === "true", 
});

export default store;
