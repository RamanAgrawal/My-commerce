/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Data, fetchCategories, fetchProductsByFilters, fetchBrands, fetchSingleProduct, createProduct, updateProduct } from './ProductApi';
import { ProductDataI } from '../../models/Models';
import { CategoryI } from '../../models/Models';




interface ProductStateI {
  products: ProductDataI[];
  status: 'idle' | 'loading' | 'completed';
  totalItems: number
  categories: CategoryI[]
  brands: CategoryI[]
  selectedProduct: ProductDataI | null
}

const initialState: ProductStateI = {
  products: [],
  status: 'idle',
  totalItems: 0,
  categories: [],
  brands: [],
  selectedProduct: null
};


export const fetchSingleProductAsync = createAsyncThunk(
  'product/fetchSingleProduct',
  async (id: string): Promise<ProductDataI> => {
    const response: any = await fetchSingleProduct(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data as ProductDataI;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({ filter, sort, pagination,admin }: any) => {
    const response = await fetchProductsByFilters(filter, sort, pagination,admin);
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response: any = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response: any = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
);

export const createProductAsync = createAsyncThunk(
  'product/create',
  async (product: Omit<ProductDataI, 'id'>) => {
    const response: any = await createProduct(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/update',
  async (product: ProductDataI) => {
    const response: any = await updateProduct(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
);



export const productSlice: Slice<ProductStateI> = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct:(state)=>{
      state.selectedProduct=null
    }

  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action: PayloadAction<Data>) => {
        state.status = 'completed';
        state.products = action.payload.products
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
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action: PayloadAction<ProductDataI>) => {
        state.status = 'completed';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action: PayloadAction<ProductDataI>) => {
        state.status = 'completed';
        const index = state.products.findIndex(item => item.id === action.payload.id)
        state.products[index] = action.payload
      })
  },
});

// export const { increment } = productSlice.actions;
export const {clearSelectedProduct}=productSlice.actions
export const selectProductStatus = (state: { product: ProductStateI }) => state.product.status;
export const selectAllProducts = (state: { product: ProductStateI }) => state.product.products;
export const selectSingleProduct = (state: { product: ProductStateI }) => state.product.selectedProduct;
export const selectTotalItems = (state: { product: ProductStateI }) => state.product.totalItems;
export const selectCategories = (state: { product: ProductStateI }) => state.product.categories;
export const selectBrands = (state: { product: ProductStateI }) => state.product.brands;

export default productSlice.reducer;
