import { Slice, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchLoggedInUser, fetchLoggedInUserOrder, updateUser } from "./userApi"
import { AxiosResponse } from "axios"
import {  AuthResI, OrderResI } from "../../models/Models"

interface UserStateI {
    userOrder: OrderResI[]
    status: string;
    userInfo:AuthResI | null;
}
const initialState: UserStateI = {
    userInfo:null,
    userOrder: [],
    status: 'idle'
}

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
    'user/fetchLoggedInUserOrder',
    async () => {
        const response = await fetchLoggedInUserOrder() as AxiosResponse
        return response.data
    }
)

export const fetchLoggedInUserAsync = createAsyncThunk(
    'user/fetchLoggedInUser',
    async () => {
        
        const response = await fetchLoggedInUser() as AxiosResponse
        return response.data
    }
)
export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async (userId:AuthResI) => {
        const response = await updateUser(userId) as AxiosResponse
        return response.data
    }
)

const userSlice: Slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserInfo:(state)=>{
            state.userInfo=null;          
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state,action) => {
                state.status = "completed"
                state.userOrder=action.payload
            })
            .addCase(fetchLoggedInUserAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchLoggedInUserAsync.fulfilled, (state,action) => {
                state.status = "completed"
                state.userInfo=action.payload
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(updateUserAsync.fulfilled, (state,action) => {
                state.status = "completed"
                state.userInfo=action.payload
            })
    }
})

export const {clearUserInfo}=userSlice.actions
export const selectUserStatus = (state: { user: UserStateI }) => state.user.status;
export const selectUserOrders=(state:{user:UserStateI})=>state.user.userOrder;
export const selectUserInfo=(state:{user:UserStateI})=>state.user.userInfo;
export default userSlice.reducer