/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Data, fetchAllProducts,fetchCategories, fetchProductsByFilters, fetchBrands, fetchSingleProduct } from './ProductApi';
import { ProductDataI } from '../../models/Models';
import { CategoryI } from '../../models/Models';




interface ProductStateI {
  products: ProductDataI[];
  status: 'idle' | 'loading' | 'completed';
  totalItems:number
  categories:CategoryI[]
  brands:CategoryI[]
  selectedProduct:ProductDataI|null
}

const initialState: ProductStateI = {
  products: [],
  status: 'idle',
  totalItems:0,
  categories:[],
  brands:[],
  selectedProduct:null
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async (): Promise<ProductDataI[]> => {
    const response:any = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data as ProductDataI[];
  }
);
export const fetchSingleProductAsync = createAsyncThunk(
  'product/fetchSingleProduct',
  async (id:number): Promise<ProductDataI> => {
    const response:any = await fetchSingleProduct(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data as ProductDataI;
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
export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response:any = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response:any = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
);

export const productSlice:Slice<ProductStateI> = createSlice({
  name: 'product',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action: PayloadAction<ProductDataI[]>) => {
        state.status = 'completed';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action: PayloadAction<Data>) => {
        state.status = 'completed';
        state.products=action.payload.products
        state.totalItems = Number(action.payload.totalItems);
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action: PayloadAction<CategoryI[]>) => {
        state.status = 'completed';
        state.categories = action.payload;
        
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action: PayloadAction<CategoryI[]>) => {
        state.status = 'completed';
        state.brands = action.payload;
        
      })
      .addCase(fetchSingleProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleProductAsync.fulfilled, (state, action: PayloadAction<ProductDataI>) => {
        state.status = 'completed';
        state.selectedProduct = action.payload;
        
      })
  },
});

// export const { increment } = productSlice.actions;

export const selectAllProducts = (state: { product: ProductStateI }) => state.product.products;
export const selectSingleProduct = (state: { product: ProductStateI }) => state.product.selectedProduct;
export const selectTotalItems = (state: { product: ProductStateI }) => state.product.totalItems;
export const selectCategories = (state: { product: ProductStateI }) => state.product.categories;
export const selectBrands = (state: { product: ProductStateI }) => state.product.brands;

export default productSlice.reducer;
