import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Admin from "../../admin.config";
import deleteAccount from "./deleteAccount";
import { withGoogle } from "./login";
import logoutUser from "./logout";



const user = localStorage.getItem("user");


// Initial state
const initialState = user ? JSON.parse(user) : {
    user: null,
    isValidUser: false,
    isLoading: false,
    error: null,
    isNew: true,
};

// Async thunks
export const login = createAsyncThunk("auth/login", async (_, { rejectWithValue }) => {
    try {
        const user = await withGoogle();
        return user;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


export const deleteUserAccount = createAsyncThunk("auth/deleteUserAccount", async (_, { rejectWithValue }) => {
    try {
        const response = await deleteAccount();
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        await logoutUser();
        return null;
    } catch (error) {
        return rejectWithValue(error.message);
        
    }
});

// Slice
const authSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                const loggedInUser = action.payload;
                const adminUser = Admin.find((validUser) => validUser.email === loggedInUser.email);
                
                if (adminUser) {
                    state.user = {
                        ...loggedInUser,
                        username: adminUser.username,
                        isVerified: adminUser.verified,
                    };
                    state.isValidUser = true;

                    
                    localStorage.setItem("user", JSON.stringify(state));
                } else {
                    state.isValidUser = false;
                    state.user = loggedInUser; // because we need to show the error popup && sysylogs
                }
            })
            .addCase(deleteUserAccount.fulfilled, (state,action) => {
                if(action.payload.status === "ok"){
                    state.user = null;
                    state.isValidUser = false;
                    localStorage.removeItem("user");
                }
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isValidUser = false;
                localStorage.removeItem("user");
            })
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                },
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.error = action.payload || action.error.message;
                    state.isLoading = false;
                },
            )
            .addMatcher(
                (action) => action.type.endsWith("/fulfilled"),
                (state) => {
                    state.isLoading = false;
                    state.error = null;
                },
            );
    },
});

export default authSlice.reducer;
