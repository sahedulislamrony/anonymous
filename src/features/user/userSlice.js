import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getUserInfo from "./getUserInfo";
import isNewUser from "./isNewUser";
import { signNewUser } from "./signNewUser";

const initialState = {
    userInfo: null,
    status: "idle", // idle, loading, success, error  
    isNew: false,
    signUser: {
        status: "idle",
        error: null,    
    },
    clearUserDB : {
        status: "idle",
        error: null,
    },
};


export const getUser = createAsyncThunk("user/getUser", async (username, { rejectWithValue }) => {
    try {
        const user = await getUserInfo(username);
        return user;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const isNew = createAsyncThunk("user/isNew", async (user, { rejectWithValue }) => {
    try {
        const response = await isNewUser(user);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const signUser = createAsyncThunk("user/signUser", async (user, { rejectWithValue }) => {
    try {
        const response = await signNewUser(user);
        if (response) {
            return user;
        } else {
            return rejectWithValue("User already exists");
        }
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
            })

            .addCase(isNew.fulfilled, (state , action) => {
                state.isNew = action.payload;
            })
            .addCase(isNew.rejected, (state) => {
                state.isNew = false;
            })
            .addCase(signUser.fulfilled, (state) => {
                state.signUser.status = "success";
            })
            .addCase(signUser.pending, (state) => {
                state.signUser.status = "loading";
            })
            .addCase(signUser.rejected, (state, action) => {
                state.signUser.status = "error";
                state.signUser.error = action.payload;
            });
            


    },
});



export default userSlice.reducer;