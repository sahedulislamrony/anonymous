import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sysLog from "./sysLog";

const initialState = {
    status: "idle", // idle | loading | succeeded | failed
    error: null,
};

export const writeLog = createAsyncThunk("system/writeLog", async (logData, { rejectWithValue })  => {
    try {
        const resposne = await sysLog(logData);
        return resposne;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});



const systemSlice = createSlice({
    name: "system",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(writeLog.pending, (state) => {
                state.status = "loading";
            })
            .addCase(writeLog.fulfilled, (state, action) => {
                state = action.payload;
                if (state.status !== "ok") {
                    state.status = "failed";
                }
            })
            .addCase(writeLog.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});


export default systemSlice.reducer;