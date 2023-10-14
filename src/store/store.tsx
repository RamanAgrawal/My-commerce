import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../components/product/ProductSlice';
import authReducer from '../components/auth/AuthSlice'
import cartReducer from '../components/cart/CartSlice'
import orderReducer from '../components/order/OrderSlice'
import userReducer from '../components/user/UserSlice'

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
