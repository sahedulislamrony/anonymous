import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sendMsg from "./sendMsg";


const initialState = {
    status: "idle", // idle, loading, success, error  
    send: {
        status: "idle",
        error: null,
    },
};


export const send = createAsyncThunk("data/send", async (userData, { rejectWithValue }) => {
    try {
        const user = await sendMsg(userData);
        return user;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});




const dataSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(send.fulfilled, (state, action) => {
                state.send = action.payload;
            })
            .addCase(send.rejected, (state) => {
                state.send = {
                    status:"error",
                    error: "Failed to send message",
                };
            });

    },
});



export default dataSlice.reducer;