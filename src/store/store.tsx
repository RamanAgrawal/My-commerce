import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../components/product/ProductSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
