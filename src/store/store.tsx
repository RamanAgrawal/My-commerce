import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../components/product/ProductSlice';
import authReducer from '../components/auth/authSlice'

const store = configureStore({
  reducer: {
    product: productReducer,
    auth:authReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
