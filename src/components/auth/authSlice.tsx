import { createAsyncThunk, createSlice, SerializedError, Slice } from '@reduxjs/toolkit';
import { checkUser, createUser, updateUser } from './authApi';
import { AxiosResponse } from 'axios';
import { AuthResI, UserDataI } from '../../models/Models';

interface AuthStateI  {
    loggedInUser: AuthResI | null;
    status: string;
    error: SerializedError | null
}

const initialState: AuthStateI = {
    loggedInUser: null,
    status: 'idle',
    error: null
}


export const createUserAsync = createAsyncThunk(
    'users/createUser',
    async (userData: AuthResI) => {
        const response = await createUser(userData) as AxiosResponse<AuthResI>;
        // The value we return becomes the `fulfilled` action payload
        return response.data as AuthResI
    }
);

export const checkUserAsync = createAsyncThunk(
    'users/checkUser',
    async (loginInfo: UserDataI) => {
        const response = await checkUser(loginInfo) as AxiosResponse<AuthResI>;
        return response.data as AuthResI
    }
);


export const updateUserAsync = createAsyncThunk(
    'users/updateUser',
    async (update: AuthResI) => {
        const response = await updateUser(update) as AxiosResponse<AuthResI>;
        return response.data as AuthResI
    }
);

const authSlice: Slice<AuthStateI> = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                state.loggedInUser = action.payload
                console.log(action.payload);

            })
            .addCase(checkUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkUserAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                state.loggedInUser = action.payload
                console.log(action.payload);
            })
            .addCase(checkUserAsync.rejected, (state, action) => {
                state.status = 'completed'
                state.error = action.error
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                state.loggedInUser = action.payload
            })

    },
});

// export const { } = authSlice.actions
export const selectLoggedInuser = (state: { auth: AuthStateI }) => state.auth.loggedInUser
export const selectError = (state: { auth: AuthStateI }) => state.auth.error
export default authSlice.reducer