import { createAsyncThunk, createSlice, SerializedError, Slice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut } from './authApi';
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
        console.log(response.data);
        
        return response.data as AuthResI
    }
);

export const checkUserAsync = createAsyncThunk(
    'user/checkUser',
    async (loginInfo: UserDataI) => {
        const response = await checkUser(loginInfo) as AxiosResponse<AuthResI>;
        return response.data as AuthResI
    }
);

export const signOutAsync = createAsyncThunk(
    'user/signOut',
    async () => {
        const response = await signOut() as AxiosResponse<AuthResI>;
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
          
            .addCase(signOutAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signOutAsync.fulfilled, (state) => {
                state.status = 'completed'
                state.loggedInUser = null
            })

    },
});

// export const { } = authSlice.actions
export const selectLoggedInUser = (state: { auth: AuthStateI }) => state.auth.loggedInUser
export const selectError = (state: { auth: AuthStateI }) => state.auth.error
export default authSlice.reducer