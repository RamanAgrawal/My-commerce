import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { createUser,UserData } from './authApi';

interface AuthState{
    loggedInUser:null;
    status:string
}

const initialState:AuthState = {
    loggedInUser:null,
    status: 'idle',
}
interface AuthRes extends UserData{
id:string;
}

export const createUserAsync = createAsyncThunk(
    'auth/createUser',
    async (userData:UserData) => {
        const response = await createUser(userData);
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
           
    },
});

// export const { } = authSlice.actions
export const selectLoggedInuser=(state:{auth:AuthState})=>state.auth.loggedInUser
export default authSlice.reducer