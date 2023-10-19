import './App.css'
import { useEffect } from 'react'
import SignIn from './pages/SignIn'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUpPage';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Contact from './pages/Contact';
import About from './pages/About';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store/store';
import PageNotFound from './pages/404Page'
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchCartAsync } from './features/cart/CartSlice';
import OrderSuccess from './pages/OrderSuccess';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import AddAddress from './pages/AddAddress';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailsPage from './pages/AdminProductDetailsPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home />,
    </Protected>

  },
  {
    path: "/admin",
    element: <ProtectedAdmin>
      <AdminHome />,
    </ProtectedAdmin>

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
    path: "/logout",
    element: <Logout />,

  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,

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
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin>
      <AdminProductDetailsPage />
    </ProtectedAdmin>,

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
    element: <PageNotFound />,

  },

]);
function App() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectLoggedInUser)

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartAsync(+user.id))
      dispatch(fetchLoggedInUserAsync(+user.id))
    }
  }, [dispatch, user])

  return (
    <RouterProvider router={router} />
  )
}

export default App
