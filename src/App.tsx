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
import Protected from './features/auth/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store/store';
import PageNotFound from './pages/404Page'
import { selectLoggedInuser } from './features/auth/authSlice';
import { fetchCartAsync } from './features/cart/CartSlice';
import OrderSuccess from './pages/OrderSuccess';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import AddAddress from './pages/AddAddress';

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
    {
      path: "/orders",
      element: <UserOrderPage />,
     
    },
    {
      path: "/profile",
      element: <UserProfilePage />,
     
    },
    {
      path: "/addaddress",
      element: <AddAddress />,
     
    },
    {
      path: "/order-succcess/:id",
      element: <OrderSuccess />,
     
    },
    {
      path: "*",
      element: <PageNotFound/>,
     
    },
   
  ]);
function App() {
  const dispatch=useDispatch<AppDispatch>()
  const user=useSelector(selectLoggedInuser)
 
  useEffect(()=>{
    if(user?.id){
      dispatch(fetchCartAsync(+user.id))
    }
  },[dispatch,user])
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
