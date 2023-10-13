import { createAsyncThunk, createSlice, SerializedError, Slice } from '@reduxjs/toolkit';
import { checkUser, createUser, updateUser, UserData } from './authApi';
import { AxiosResponse } from 'axios';
import { Address } from '../checkout/Checkout';

interface AuthState {
    loggedInUser: AuthRes | null;
    status: string;
    error: SerializedError | null
}

const initialState: AuthState = {
    loggedInUser: null,
    status: 'idle',
    error: null
}
export interface AuthRes extends UserData {
    id?: string | undefined;
    addresses: Address[]
}

export const createUserAsync = createAsyncThunk(
    'users/createUser',
    async (userData: AuthRes) => {
        const response = await createUser(userData) as AxiosResponse<AuthRes>;
        // The value we return becomes the `fulfilled` action payload
        return response.data as AuthRes
    }
);

export const checkUserAsync = createAsyncThunk(
    'users/checkUser',
    async (loginInfo: UserData) => {
        const response = await checkUser(loginInfo) as AxiosResponse<AuthRes>;
        return response.data as AuthRes
    }
);


export const updateUserAsync = createAsyncThunk(
    'users/updateUser',
    async (update: AuthRes) => {
        const response = await updateUser(update) as AxiosResponse<AuthRes>;
        return response.data as AuthRes
    }
);

const authSlice: Slice<AuthState> = createSlice({
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
export const selectLoggedInuser = (state: { auth: AuthState }) => state.auth.loggedInUser
export const selectError = (state: { auth: AuthState }) => state.auth.error
export default authSlice.reducer