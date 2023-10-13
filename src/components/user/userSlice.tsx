import { Slice, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchLoggedInUserOrder } from "./userApi"
import { AxiosResponse } from "axios"
import { Order } from "../order/OrderSlice"
interface OrderRes extends Order{
    id:string
}
interface UserState {
    userOrder: OrderRes[]
    status: string;
    userDetails:string;
}
const initialState: UserState = {
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


export const selectUserOrders=(state:{user:UserState})=>state.user.userOrder;
export const selectUserDetails=(state:{user:UserState})=>state.user.userDetails;
export default userSlice.reducer