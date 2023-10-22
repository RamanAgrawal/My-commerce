import { useEffect } from 'react';
import { selectLoggedInUser, signOutAsync } from '../authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppDispatch } from '../../../store/store';
import { clearCart } from '../../cart/CartSlice';

function Logout() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
    dispatch(clearCart)
  });

  // but useEffect runs after render, so we have to delay navigate part
  return <>{!user && <Navigate to="/signin" replace={true}></Navigate>}</>;
}

export default Logout;