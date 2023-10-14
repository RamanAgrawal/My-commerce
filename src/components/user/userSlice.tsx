import { Slice, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchLoggedInUserOrder } from "./userApi"
import { AxiosResponse } from "axios"
import {  OrderResI } from "../../models/Models"

interface UserStateI {
    userOrder: OrderResI[]
    status: string;
    userDetails:string;
}
const initialState: UserStateI = {
    userDetails:'',
    userOrder: [],
    status: 'idle'
}

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
    'users/fetchLoggedInUser',
    async (userId: number) => {
        const response = await fetchLoggedInUserOrder(userId) as AxiosResponse
        return response.data
    }
)

const userSlice: Slice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state,action) => {
                state.status = "completed"
                state.userOrder=action.payload
            })
    }
})


export const selectUserOrders=(state:{user:UserStateI})=>state.user.userOrder;
export const selectUserDetails=(state:{user:UserStateI})=>state.user.userDetails;
export default userSlice.reducer