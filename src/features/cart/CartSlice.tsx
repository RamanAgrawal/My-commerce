import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { addTocart, deleteItemFromCart, fetchCartItems, resetCart, updatecart } from './CartApi';
import { AxiosResponse } from 'axios';
import { CartItemI, CartItemResI } from '../../models/Models';



interface CartStateI {
    value: number;
    items: CartItemResI[],
    status: string
}

const initialState: CartStateI = {
    items: [],
    value: 0,
    status: 'idle'
}


export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (item: CartItemI) => {

        const response = await addTocart(item) as AxiosResponse<CartItemResI>;
        // The value we return becomes the `fulfilled` action payload

        return response.data as CartItemResI
    }
);
export const fetchCartAsync = createAsyncThunk(
    'cart/fetchCartItems',
    async () => {
        const response = await fetchCartItems() as AxiosResponse<CartItemResI[]>;
        // The value we return becomes the `fulfilled` action payload
        return response.data as CartItemResI[]
    }

);

export const updateCartAsync = createAsyncThunk(
    'cart/updateCart',
    async (update: Omit<CartItemResI, 'user' | 'product'>) => {
        const response = await updatecart(update) as AxiosResponse<CartItemResI>;
        // The value we return becomes the `fulfilled` action payload
        return response.data as CartItemResI
    }
);
export const deleteItemFromCartAsync = createAsyncThunk(
    'cart/deleteItemFromCart',
    async (itemId: string) => {
        const response = await deleteItemFromCart(itemId) as AxiosResponse<{ id: string }>;
        // The value we return becomes the `fulfilled` action payload
        return response.data
    }
);
export const resetCartAsync = createAsyncThunk(
    'cart/resetCart',
    async () => {
        const response = await resetCart()
        // The value we return becomes the `fulfilled` action payload

        return response.status
    }
);


const cartSlice: Slice<CartStateI> = createSlice({
    name: "cart",
    initialState,
    reducers: {

        clearCart: (state) => {
            state.items = []
            state.value = 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {

                state.status = 'completed'
                state.items.push({ ...action.payload, quantity: 1 });
                state.value += action.payload.product.price
            })
            .addCase(fetchCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                state.items = action.payload

            })
            .addCase(updateCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCartAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                const index = state.items.findIndex(item => item.id === action.payload.id)
                state.items[index] = action.payload

            })
            .addCase(deleteItemFromCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
                state.status = 'completed'

                const index = state.items.findIndex(item => item.id === action.payload.id)


                state.items.splice(index, 1)

            })
            .addCase(resetCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resetCartAsync.fulfilled, (state) => {
                state.status = 'completed';
                state.items = []
            })


    },
});

export const { clearCart } = cartSlice.actions;
export const selectCart = (state: { cart: CartStateI }) => state.cart.items
export const selectTotalvalue = (state: { cart: CartStateI }) => state.cart.value
export default cartSlice.reducer