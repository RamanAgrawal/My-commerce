import { createAsyncThunk, createSlice, SerializedError, Slice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut } from './authApi';
import { AxiosResponse } from 'axios';
import { AuthResI, UserDataI } from '../../models/Models';
import { updateUser } from '../user/userApi';


// const temUser=  {
//     email: "iramanagrawal@gmail.com",
//     password: "Agrawal@1",
//     addresses: [
//       {
//         name: "Raman",
//         email: "iramanagrawal@gmail.com",
//         phoneNo: "09522063370",
//         street: "Shivam mobiles, thakur road",
//         city: "JAGDALPUR",
//         state: "k10",
//         pincode: "147852"
//       },
//       {
//         name: "Raman",
//         email: "iramanagrawal@gmail.com",
//         phoneNo: "+918959095100",
//         street: "agrawal material suppliers, near ambe rice mill, near ambe rice mill, near ambe rice mill",
//         city: "thankhamharia",
//         state: "Chhattisgarh",
//         pincode: "123654"
//       },
//       {
//         name: "Aman",
//         email: "agrawalraman277@gmail.com",
//         phoneNo: "09522063370",
//         street: "Near ambe rice mile than khamharia",
//         city: "Bemetara",
//         state: "Chhattisgarh",
//         pincode: "4657542"
//       }
//     ],
//     id: '2'
//   }
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