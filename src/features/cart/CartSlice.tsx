import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { addTocart, deleteItemFromCart, fetchCartItems, resetCart, updatecart } from './CartApi';
import { AxiosResponse } from 'axios';
import { CartItemI } from '../../models/Models';



interface CartStateI {
    value: number;
    items: CartItemI[],
    status:string
}

const initialState: CartStateI = {
    items: [],
    value: 0,
    status:'idle'
}


export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (item:CartItemI) => {
        const response = await addTocart(item) as AxiosResponse<CartItemI>;
        // The value we return becomes the `fulfilled` action payload
        return response.data as CartItemI
    }
);
export const fetchCartAsync = createAsyncThunk(
    'cart/fetchCartItems',
    async (id:number) => {
        const response = await fetchCartItems(id) as AxiosResponse<CartItemI[]>;
        // The value we return becomes the `fulfilled` action payload
        return response.data as CartItemI[]
    }
    
);

export const updateCartAsync = createAsyncThunk(
    'cart/updateCart',
    async (update:CartItemI) => {
        const response = await updatecart(update) as AxiosResponse<CartItemI>;
        // The value we return becomes the `fulfilled` action payload
        return response.data as CartItemI
    }
);
export const deleteItemFromCartAsync = createAsyncThunk(
    'cart/deleteItemFromCart',
    async (itemId:number) => {
        const response = await deleteItemFromCart(itemId) as AxiosResponse<{id:number}>;
        // The value we return becomes the `fulfilled` action payload
        return response.data
    }
);
export const resetCartAsync = createAsyncThunk(
    'cart/resetCart',
    async (userId:number) => {
        const response = await resetCart(userId) as AxiosResponse
        // The value we return becomes the `fulfilled` action payload
        return response.data
    }
);


const cartSlice: Slice<CartStateI> = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                // const index=state.items.findIndex(item=>item.id===action.payload.id)
                // if(index!==null){
                //     state.items[index].quantity++
                // }else{
                    state.items.push(action.payload)

                // }
                state.value+=action.payload.price
            })
            .addCase(fetchCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                state.items=action.payload
                // state.value+=action.payload.price
            })
            .addCase(updateCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCartAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                const index=state.items.findIndex(item=>item.id===action.payload.id)
                state.items[index]=action.payload
                
            })
            .addCase(deleteItemFromCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                console.log("payload:  ",action.payload.id);
                
                const index=state.items.findIndex(item=>item.id===action.payload.id)
                console.log("index no: ",index);
                
                state.items.splice(index,1)
                
            })
            .addCase(resetCartAsync.pending,(state)=>{
                state.status='loading';
            })
            .addCase(resetCartAsync.fulfilled,(state)=>{
                state.status='completed';
                state.items=[]
            })
          

    },
});


export const selectCart= (state:{cart:CartStateI})=>state.cart.items
export const selectTotalvalue= (state:{cart:CartStateI})=>state.cart.value
export default cartSlice.reducer