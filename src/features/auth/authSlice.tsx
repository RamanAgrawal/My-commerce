/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, SerializedError, Slice } from '@reduxjs/toolkit';
import { loginUser, createUser, signOut, checkAuth, resetPassword, resetPasswordRequest } from './authApi';
import { AxiosResponse } from 'axios';
import { AuthResI, ResetPasswordI, UserDataI } from '../../models/Models';

interface AuthStateI {
    loggedInUser: AuthResI | null;
    status: string;
    error: SerializedError | unknown | null | any;
    userChecked: boolean;
    mailStatus:boolean;
    passwordReset: boolean;
}

const initialState: AuthStateI = {
    loggedInUser: null,
    status: 'idle',
    error: null,
    userChecked: false,
    mailStatus:false,
    passwordReset: false,
}

export const createUserAsync = createAsyncThunk(
    'users/createUser',
    async (userData: Omit<AuthResI, 'id'>, { rejectWithValue }) => {
        try {
            const response = await createUser(userData) as AxiosResponse<AuthResI>;
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }

    }
)

export const loginUserAsync = createAsyncThunk(
    'user/loginUser',
    async (loginInfo: UserDataI, { rejectWithValue }) => {
        try {
            const response = await loginUser(loginInfo) as AxiosResponse<AuthResI>;
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const checkAuthAsync = createAsyncThunk('user/checkAuth', async () => {
    const response = await checkAuth() as AxiosResponse<AuthResI>;
    return response.data
});

export const signOutAsync = createAsyncThunk(
    'user/signOut',
    async () => {
        const response = await signOut() as string;
        return response as string
    }
);
export const resetPasswordRequestAsync = createAsyncThunk(
    'user/resetPasswordRequest',
    async (email:string) => {
        const response = await resetPasswordRequest(email);
        return response
    }
);
export const resetPasswordAsync = createAsyncThunk(
    'user/resetPassword',
    async (data:ResetPasswordI) => {
        const response = await resetPassword(data);
        return response
    }
);


const authSlice: Slice<AuthStateI> = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthState: (state) => {
            state.loggedInUser = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                state.loggedInUser = action.payload
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.status = 'completed'
                state.error = action.payload;
            })
            .addCase(loginUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                state.loggedInUser = action.payload

            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.status = 'completed'
                state.error = action.error
            })
            .addCase(checkAuthAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkAuthAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                state.loggedInUser = action.payload
                state.userChecked = true;
            })
            .addCase(checkAuthAsync.rejected, (state) => {
                state.status = 'completed'
                state.userChecked = true;
            })
            .addCase(resetPasswordRequestAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resetPasswordRequestAsync.fulfilled, (state) => {
                state.status = 'completed'
                state.mailStatus = true
            })
            .addCase(resetPasswordAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resetPasswordAsync.fulfilled, (state) => {
                state.status = 'completed'
                state.passwordReset = true
            })

            .addCase(signOutAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signOutAsync.fulfilled, (state) => {
                state.status = 'completed'
                state.loggedInUser = null
            })

    },
});

export const { clearAuthState} = authSlice.actions
export const selectAuthStatus= (state: { auth: AuthStateI }) => state.auth.status;
export const selectLoggedInUser = (state: { auth: AuthStateI }) => state.auth.loggedInUser
export const selectError = (state: { auth: AuthStateI }) => state.auth.error;
export const selectUserChecked = (state: { auth: AuthStateI }) => state.auth.userChecked;
export const selectMailStatus = (state: { auth: AuthStateI }) => state.auth.mailStatus;
export const selectPasswordReset = (state: { auth: AuthStateI }) => state.auth.passwordReset;
export default authSlice.reducer