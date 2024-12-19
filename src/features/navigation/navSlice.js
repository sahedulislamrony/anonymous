import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: true,
};

const navSlice = createSlice({
    name: "popup",
    initialState,
    reducers: {
        showNavbar: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { showNavbar } = navSlice.actions;
export default navSlice.reducer;

