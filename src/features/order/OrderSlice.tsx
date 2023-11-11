import { createAsyncThunk, createSlice, SerializedError, Slice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createOrder, fetchAllOrders, updateOrder } from './orderApi';
import { AdminOrdersI, OrderI, OrderResI, PaginationI, SortI, UpdateOrderI } from '../../models/Models';

interface OrderStateI{
    orders:OrderResI[];
    status:string;
    currentOrder:OrderResI|null
    error:SerializedError|null;
    totalOrders:number
}

const initialState:OrderStateI = {
    orders:[],
    status: 'idle',
    currentOrder:null,
    error:null,
    totalOrders:0
}


export const createOrderAsync = createAsyncThunk(
    'order/createOrder',
    async (order:OrderI) => {

        const response = await createOrder(order) as AxiosResponse<OrderResI>;
        // The value we return becomes the `fulfilled` action payload
        return response.data 
    }
);

export const updateOrderAsync = createAsyncThunk(
    'order/updateOrder',
    async (order:UpdateOrderI) => {
        const response = await updateOrder(order) as AxiosResponse<OrderResI>;
        // The value we return becomes the `fulfilled` action payload
        return response.data 
    }
);

export const fetchAllOrdersAsync = createAsyncThunk(
    'order/fetchAllOrders',
    async ({pagination,sort}:{pagination:PaginationI,sort:SortI}) => {
        const response = await fetchAllOrders(pagination,sort) as AxiosResponse<AdminOrdersI>;
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
            .addCase(updateOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateOrderAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                const index=state.orders.findIndex(order=>order.id===action.payload.id)
                state.orders[index]=action.payload
                      
            })
            .addCase(fetchAllOrdersAsync.pending, (state) => {
                state.status = 'loading';
            }) 
            .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                 state.orders=action.payload.orders
                state.totalOrders=action.payload.totalOrders
                      
            })
          
    },
});

export const { resetOrder} = orderSlice.actions
export const selectOrders=(state:{order:OrderStateI})=>state.order.orders
export const selectTotalOrders=(state:{order:OrderStateI})=>state.order.totalOrders
export const selectCurrentOrder=(state:{order:OrderStateI})=>state.order.currentOrder
export default orderSlice.reducer