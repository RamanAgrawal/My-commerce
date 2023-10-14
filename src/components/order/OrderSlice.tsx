import { createAsyncThunk, createSlice, SerializedError, Slice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createOrder } from './OrderApi';
import { OrderI, OrderResI } from '../../models/Models';

interface OrderStateI{
    orders:OrderI[];
    status:string;
    currentOrder:OrderResI|null
    error:SerializedError|null
}

const initialState:OrderStateI = {
    orders:[],
    status: 'idle',
    currentOrder:null,
    error:null
}


export const createOrderAsync = createAsyncThunk(
    'order/createOrder',
    async (order:OrderI) => {
        const response = await createOrder(order) as AxiosResponse<OrderResI>;
        // The value we return becomes the `fulfilled` action payload
        return response.data 
    }
);



const orderSlice:Slice<OrderStateI> = createSlice({
    name: "order",
    initialState,
    reducers: {
        resetOrder:(state)=>{
            state.currentOrder=null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                state.orders.push(action.payload)
                state.currentOrder=action.payload
                      
            })
          
    },
});

export const { resetOrder} = orderSlice.actions
// export const selectOrder=(state:{order:OrderStateI})=>state.order.orders
export const selectCurrentOrder=(state:{order:OrderStateI})=>state.order.currentOrder
export default orderSlice.reducer