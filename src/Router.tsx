import SignIn from './pages/SignIn'
import SignUp from './pages/SignUpPage';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Contact from './pages/Contact';
import About from './pages/About';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Protected from './features/auth/components/Protected';
import PageNotFound from './pages/404Page'
import OrderSuccess from './pages/OrderSuccess';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import AddAddress from './pages/AddAddress';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailsPage from './pages/AdminProductDetailsPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import { createBrowserRouter } from 'react-router-dom';



export const router = createBrowserRouter([
  {
    path: "/",
    element:
      <Home />
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
    element: <CartPage />,

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
    path: "/admin/orders",
    element: <ProtectedAdmin>
      <AdminOrdersPage />
    </ProtectedAdmin>,

  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin>
      <AdminProductFormPage />
    </ProtectedAdmin>,

  },
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin>
      <AdminProductFormPage />
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