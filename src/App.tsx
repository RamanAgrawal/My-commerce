import './App.css'
import {useEffect} from 'react'
import SignIn from './pages/SignIn'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom';
import SignUp from './pages/SignUpPage';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Contact from './pages/Contact';
import About from './pages/About';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Protected from './components/auth/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store/store';

import { selectLoggedInuser } from './components/auth/authSlice';
import { fetchCartAsync } from './components/cart/CartSlice';


const router = createBrowserRouter([
    {
      path: "/",
      element:<Protected>
      <Home />,
      </Protected> 
     
    },
    {
      path: "/signin",
      element: <SignIn />,
     
    },
    {
      path: "/signup",
      element: <SignUp />,
     
    },
    {
      path: "/cart",
      element: <Protected><CartPage /></Protected>,
     
    },
    {
      path: "/product-detail/:id",
      element: <ProductDetailsPage />,
     
    },
    {
      path: "/checkout",
      element: <Protected><CheckoutPage /></Protected>,
     
    },
    {
      path: "/contact",
      element: <Contact />,
     
    },
    {
      path: "/about",
      element: <About />,
     
    },
   
  ]);
function App() {
  const dispatch=useDispatch<AppDispatch>()
  const user=useSelector(selectLoggedInuser)
  let userId:number;
  if(user){
      userId=Number(user.id)
  }
 
  useEffect(()=>{
    if(user){
      dispatch(fetchCartAsync(userId))
    }
  },[dispatch,user])
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
