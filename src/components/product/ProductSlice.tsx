/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Data, fetchAllProducts, fetchProductsByFilters } from './ProductApi';


export interface ProductData {
  id: number;
  title: string;
  price: number;
  thumbnail:string;
  imageAlt:string;
  color:string;
  rating:number; 
}

interface ProductState {
  products: ProductData[];
  status: 'idle' | 'loading' | 'completed';
  totalItems:number
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
  totalItems:0
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async (): Promise<ProductData[]> => {
    const response:any = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data as ProductData[];
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter,sort,pagination}:any) => {
    const response = await fetchProductsByFilters(filter,sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
);

export const productSlice:Slice<ProductState> = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Do something with state
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action: PayloadAction<ProductData[]>) => {
        state.status = 'completed';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action: PayloadAction<Data>) => {
        state.status = 'completed';
        state.products = action.payload.products;
        state.totalItems = Number(action.payload.totalItems);
      });
  },
});

// export const { increment } = productSlice.actions;

export const selectAllProducts = (state: { product: ProductState }) => state.product.products;
export const selectTotalItems = (state: { product: ProductState }) => state.product.totalItems;

export default productSlice.reducer;
