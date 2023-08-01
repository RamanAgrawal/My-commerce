import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductsByFilters,Filter } from './ProductApi';


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
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response:any = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data as ProductData[];
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async (filter:Filter) => {
    const response = await fetchProductsByFilters(filter);
    // The value we return becomes the `fulfilled` action payload
    return response.data as ProductData[];
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      // Do something with state
    },
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
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action: PayloadAction<ProductData[]>) => {
        state.status = 'completed';
        state.products = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state: { product: ProductState }) => state.product.products;

export default productSlice.reducer;
