import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showNav: true,
    showPopup: false,
};

const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
        setNav: (state, action) => {
            state.showNav = action.payload;
        },
        setPopup: (state, action) => {
            state.showPopup = action.payload;
        },
    },
});


export const { setNav, setPopup } = viewSlice.actions;
export default viewSlice.reducer;