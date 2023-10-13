import { createAsyncThunk, createSlice, SerializedError, Slice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createOrder } from './orderApi';
import { CartItem } from '../cart/CartSlice';
import { AuthRes } from '../auth/authSlice';
import { Address } from '../checkout/Checkout';
export interface Order{
    products: CartItem[];
    totalAmount: number;
    totalItems: number;
    user: AuthRes | null;
    selectedAddress: Address;
    selectedPaymentMethod: string;
    status: string;
}
interface OrderRes extends Order{
    id:string
}
interface OrderState{
    orders:Order[];
    status:string;
    currentOrder:OrderRes|null
    error:SerializedError|null
}

const initialState:OrderState = {
    orders:[],
    status: 'idle',
    currentOrder:null,
    error:null
}


export const createOrderAsync = createAsyncThunk(
    'order/createOrder',
    async (order:Order) => {
        const response = await createOrder(order) as AxiosResponse<OrderRes>;
        // The value we return becomes the `fulfilled` action payload
        return response.data 
    }
);



const orderSlice:Slice<OrderState> = createSlice({
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
// export const selectOrder=(state:{order:OrderState})=>state.order.orders
export const selectCurrentOrder=(state:{order:OrderState})=>state.order.currentOrder
export default orderSlice.reducer