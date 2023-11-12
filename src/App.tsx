import './App.css'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store/store';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import { fetchCartAsync } from './features/cart/CartSlice';
import { fetchLoggedInUserAsync } from './features/user/userSlice';

import { router } from './Router';



function App() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectLoggedInUser)
  const userChecked = useSelector(selectUserChecked)

  useEffect(() => {
    dispatch(checkAuthAsync())
  },[dispatch])

  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync())
      dispatch(fetchLoggedInUserAsync())
    }
  }, [dispatch, user])

  return (<>
    {userChecked && <RouterProvider router={router} />}
  </>
  )
}

export default App
