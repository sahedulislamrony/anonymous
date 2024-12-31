import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItemFromStorage, setItemWithExpiry } from "../../utils/localStore";
import isNewUser from "../user/isNewUser";
import deleteAccount from "./deleteAccount";
import getUserNames from "./getUserNames";
import { withGoogle } from "./login";
import logoutUser from "./logout";
import { updateLinkStatus, updateUserName } from "./updateUserProfile";





const user = getItemFromStorage("user");



// Initial state
const initialState = {
    user: user || null,
    status: "idle", // idle | loading | success | failed
    error: null,
    isNew: false,
    login: {
        status: "idle", 
        error: null,
    },
    deleteAccount: {
        status: "idle",
        error: null,
    },
    usernames: null,
    updateProfile: {
        status: "idle",
        error: null,
    },
};

// Async thunks
export const login = createAsyncThunk("auth/login", async (_, { rejectWithValue }) => {
    try {
        let {user} = await withGoogle();
        const isNew = await isNewUser(user);

        if(isNew) {
             
            const   handle = user.email.split("@")[0];

            // add default settings for new users
            user = {
                ...user,
                username: handle,
                settings: {
                    isLinkActive: true,
                },
            };
     
            
            // eslint-disable-next-line no-unused-vars
            const [_ ,__, fetchedUsernames] = await Promise.all([
                // do neccessary actions for new user
                
            ]);

            

            // for current user
            return {user, isNew};
        }

        // for old user gater data from database
        // async call to get user data
        
        return {user, isNew};
        
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchUserNames = createAsyncThunk("auth/fetchUserNames", async (_, { rejectWithValue }) => {
    try {
        const usernames = await getUserNames();
        return usernames;
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

export const  updateProfile = createAsyncThunk("auth/updateProfile", async (user, { rejectWithValue }) => {
    try {
        await updateUserName(user);
        const username = user.username;
        return username;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
    }
});


export const pauseLink = createAsyncThunk("auth/updateLinkStatus", async (userData, { rejectWithValue }) => {
    try {
        await updateLinkStatus(userData);
        const { isLinkActive } = userData;
        return isLinkActive;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


// Slice
const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetError: (state,action) => {
            const { target} = action.payload;
            if(target === "login"){
                state.login.error = null;
                state.login.status = "idle";
            }
        
        },
        setIsNew: (state, action) => {
            state.isNew = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        // login 
            .addCase(login.fulfilled, (state, action) => {
                const {user , isNew } = action.payload;
                state.user = {
                    ...user,
                    
                };
                state.isNew = isNew;
                state.login.status = "success";

                // save user to local storage
                setItemWithExpiry("user", state.user);
            })
            .addCase(login.rejected, (state, action) => {
                state.login.error = action.payload || action.error.message;
                state.login.status = "failed";
            })
            .addCase(login.pending, (state) => {
                state.login.status = "loading";
                state.login.error = null;
            })
        // logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.login.status = "idle";
                localStorage.removeItem("user");
            })
        // delete account
            .addCase(deleteUserAccount.fulfilled, (state,action) => {
                if(action.payload.status === "ok"){
                    state.user = null;
                    localStorage.removeItem("user");
                }
            })
            .addCase(deleteUserAccount.rejected, (state, action) => {
                state.deleteAccount.error = action.payload || action.error.message;
            })
            
            // update profile
            .addCase(updateProfile.fulfilled, (state , action) => {
                state.updateProfile.status = "success";
                state.isNew = false;
                state.user.username = action.payload;
                state.user.usernameLastUpdate = Date.now();

                setItemWithExpiry("user",state.user);
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.updateProfile.error = action.payload || action.error.message;
                state.updateProfile.status = "failed";
            })
            .addCase(updateProfile.pending, (state) => {
                state.updateProfile.status = "loading";
                state.updateProfile.error = null;
            })

            // get usernames
            .addCase(fetchUserNames.fulfilled, (state, action) => {
                state.usernames = action.payload;
            })
            .addCase(fetchUserNames.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })

            // pause link
            .addCase(pauseLink.fulfilled, (state , action) => {
                state.updateProfile.status = "success";
                state.user.settings.isLinkActive = action.payload;

            })
            .addCase(pauseLink.rejected, (state, action) => {
                state.updateProfile.error = action.payload || action.error.message;
                state.updateProfile.status = "failed";
            })
            .addCase(pauseLink.pending, (state) => {
                state.updateProfile.status = "loading";
                state.updateProfile.error = null;
            }); 


           
            
    },
});
export const { resetError , setIsNew } = authSlice.actions;
export default authSlice.reducer;
