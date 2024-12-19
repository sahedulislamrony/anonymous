import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getUserInfo from "./getUserInfo";

const initialState = {
    userInfo: null,
    status: "idle", // idle, loading, success, error  
};


export const getUser = createAsyncThunk("user/getUser", async (username, { rejectWithValue }) => {
    try {
        const user = await getUserInfo(username);
        return user;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});




const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                if(!state.userInfo) {
                    state.status = "error";
                } else {
                    state.status = "success";
                }
            })
            .addCase(getUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUser.rejected, (state) => {
                state.status = "error";
            });

    },
});



export default userSlice.reducer;