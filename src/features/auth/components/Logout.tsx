import { useEffect } from 'react';
import { selectLoggedInUser, signOutAsync } from '../authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppDispatch } from '../../../store/store';
import { clearCart } from '../../cart/CartSlice';
import { clearUserInfo } from '../../user/userSlice';
import { clearAuthState } from '../../auth/authSlice';

function Logout() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
    dispatch(clearCart({}))
    dispatch(clearUserInfo({}))
    dispatch(clearAuthState({}))
  });

  // but useEffect runs after render, so we have to delay navigate part
  return <>{!user && <Navigate to="/signin" replace={true}></Navigate>}</>;
}

export default Logout;