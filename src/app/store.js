// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import navbarReducer from "../features/navigation/navSlice";
import popupReducer from "../features/popup/popupSlice";

const store = configureStore({
    reducer: {
        auth: authReducer, 
        popup: popupReducer,
        navbar: navbarReducer,
    },
    devTools: import.meta.env.VITE_APP_REDUX_DEVTOOLS === "true", 
});

export default store;
