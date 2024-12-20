import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import clearUserDB from "./clearUserDB";
import getMsg from "./getMsg";
import removeMsg from "./removeMsg";
import sendMsg from "./sendMsg";
import updateMsg from "./updateMsg";
const initialState = {
    status: "idle", // idle, loading, success, error  
    send: {
        status: "idle",
        error: null,
    },
    inbox: {
        data: null,
        status: "idle",
        error: null,
    },
    remove :{
        status: "idle",
        error: null,
    },
    update : {
        status: "idle",
        error: null,
    },
    clearDB : {
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

export const get = createAsyncThunk("data/get", async (UID, { rejectWithValue }) => {
    try {
        const user = await getMsg(UID);
        return user;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const remove = createAsyncThunk("data/remove", async ({msgID,uid}, { rejectWithValue }) => {
    try {
        const user = await removeMsg(msgID,uid);
        return user;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


export const update = createAsyncThunk("data/update", async ({msgID,uid , isUnread}, { rejectWithValue }) => {
    try {
        const user = await updateMsg(msgID,uid , isUnread);
        return user;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const clearDB = createAsyncThunk("data/clearDB", async (user, { rejectWithValue }) => {
    try {
        const response = await clearUserDB(user);
        return response;
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
            })
            .addCase(get.fulfilled, (state, action) => {
                state.inbox.data = action.payload;
                if(!state.inbox.data) {
                    state.inbox.status = "error";
                } else {
                    state.inbox.status = "success";
                }
            })
            .addCase(get.pending, (state) => {
                state.inbox.status = "loading";
            })
            .addCase(get.rejected, (state , action) => {
                state.inbox.status = "error";
                state.inbox.error = action.payload || action.error.message;
            })
            .addCase(remove.fulfilled, (state, action) => {
                state.remove = action.payload;
               
                if(state.remove.status !== "ok") {
                    state.remove.status = "error";
                }
            })
            .addCase(remove.rejected, (state) => {
                state.remove = {
                    status:"error",
                    error: "Failed to remove message",
                };
            })
            .addCase(remove.pending, (state) => {
                state.remove = {
                    status:"loading",
                    error: null,
                };
            })
            .addCase(update.fulfilled, (state, action) => {
                state.update = action.payload;
               
                if(state.update.status !== "ok") {
                    state.update.status = "error";
                }
            })
            .addCase(update.rejected, (state) => {
                state.update = {
                    status:"error",
                    error: "Failed to remove message",
                };
            })
            .addCase(update.pending, (state) => {
                state.update = {
                    status:"loading",
                    error: null,
                };
            })
            .addCase(clearDB.fulfilled, (state, action) => {
                state.clearDB = action.payload;
                if(state.clearDB.status !== "ok") {
                    state.clearDB.status = "error";
                }
            })
            .addCase(clearDB.rejected, (state , action) => {
                state.clearDB = {
                    status:"error",
                    error: action.payload || action.error.message,
                };
            })
            .addCase(clearDB.pending, (state) => {
                state.clearDB = {
                    status:"loading",
                    error: null,
                };
            });
    },
});



export default dataSlice.reducer;