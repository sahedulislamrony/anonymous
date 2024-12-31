import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    forceHeader: {
        status: false,
        text: "",
    },
    showPopup: false,
};

const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
        setHeader: (state, action) => {
            state.forceHeader = action.payload;
        },
        setPopup: (state, action) => {
            state.showPopup = action.payload;
        },
    },
});


export const { setHeader, setPopup } = viewSlice.actions;
export default viewSlice.reducer;