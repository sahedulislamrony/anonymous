import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showPopup: false,
};

const popupSlice = createSlice({
    name: "popup",
    initialState,
    reducers: {
        setPopup: (state, action) => {
            state.showPopup = action.payload;
        },
    },
});

export const { setPopup } = popupSlice.actions;
export default popupSlice.reducer;

