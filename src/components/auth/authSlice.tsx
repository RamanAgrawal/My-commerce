import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { checkUser, createUser,UserData } from './authApi';
import { AxiosResponse } from 'axios';

interface AuthState{
    loggedInUser:AuthRes | null;
    status:string;
    error:any|null
}

const initialState:AuthState = {
    loggedInUser:null,
    status: 'idle',
    error:null
}
interface AuthRes extends UserData{
id:string;
}

export const createUserAsync = createAsyncThunk(
    'users/createUser',
    async (userData:UserData) => {
        // const response = await createUser(userData);
        const response = await createUser(userData) as AxiosResponse<AuthRes>;
        // The value we return becomes the `fulfilled` action payload
        return response.data as AuthRes
    }
);

export const checkUserAsync = createAsyncThunk(
    'users/checkUser',
    async (loginInfo:UserData) => {
       
        const response = await checkUser(loginInfo) as AxiosResponse<AuthRes>;
        // The value we return becomes the `fulfilled` action payload
        return response.data as AuthRes
    }
);

const authSlice:Slice<AuthState> = createSlice({
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
                state.loggedInUser=action.payload           
            })
            .addCase(checkUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkUserAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                state.loggedInUser=action.payload           
            })
            .addCase(checkUserAsync.rejected, (state, action) => {
                state.status = 'completed'
                state.error=action.error        
            })
           
    },
});

// export const { } = authSlice.actions
export const selectLoggedInuser=(state:{auth:AuthState})=>state.auth.loggedInUser
export const selectError=(state:{auth:AuthState})=>state.auth.error
export default authSlice.reducer