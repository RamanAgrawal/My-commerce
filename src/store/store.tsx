import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/ProductSlice';
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/CartSlice'
import orderReducer from '../features/order/OrderSlice'
import userReducer from '../features/user/userSlice'

const store = configureStore({
  reducer: {
    product: productReducer,
    auth:authReducer,
    cart:cartReducer,
    order:orderReducer,
    user:userReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
