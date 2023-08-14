import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../components/product/ProductSlice';
import authReducer from '../components/auth/authSlice'
import cartReducer from '../components/cart/CartSlice'

const store = configureStore({
  reducer: {
    product: productReducer,
    auth:authReducer,
    cart:cartReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
