import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { addTocart, deleteItemFromCart, fetchCartItems, resetCart, updatecart } from './CartApi';
import { AxiosResponse } from 'axios';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    thumbnail:string;
    imageAlt:string;
    color:string;
    rating:number; 
    images:string[];
    description:string;
    user:number;
    quantity:number
}

interface CartState {
    value: number;
    items: CartItem[],
    status:string
}

const initialState: CartState = {
    items: [],
    value: 0,
    status:'idle'
}


export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (item:CartItem) => {
        const response = await addTocart(item) as AxiosResponse<CartItem>;
        // The value we return becomes the `fulfilled` action payload
        return response.data as CartItem
    }
);
export const fetchCartAsync = createAsyncThunk(
    'cart/fetchCartItems',
    async (id:number) => {
        const response = await fetchCartItems(id) as AxiosResponse<CartItem[]>;
        // The value we return becomes the `fulfilled` action payload
        return response.data as CartItem[]
    }
    
);

export const updateCartAsync = createAsyncThunk(
    'cart/updateCart',
    async (update:CartItem) => {
        const response = await updatecart(update) as AxiosResponse<CartItem>;
        // The value we return becomes the `fulfilled` action payload
        return response.data as CartItem
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


const cartSlice: Slice<CartState> = createSlice({
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


export const selectCart= (state:{cart:CartState})=>state.cart.items
export const selectTotalvalue= (state:{cart:CartState})=>state.cart.value
export default cartSlice.reducer