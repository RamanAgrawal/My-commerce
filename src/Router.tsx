import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUpPage"));
import Home from "./pages/Home";
import StripeCheckoutPage from "./pages/StripeCheckoutPage";
import ProductPage from "./pages/ProductsPage";
const CartPage = lazy(() => import("./pages/CartPage"));
const Contact = lazy(() => import("./pages/Contact"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const Protected = lazy(() => import("./features/auth/components/Protected"));
const PageNotFound = lazy(() => import("./pages/404Page"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const UserOrderPage = lazy(() => import("./pages/UserOrderPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const AddAddress = lazy(() => import("./pages/AddAddress"));
const Logout = lazy(() => import("./features/auth/components/Logout"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ProtectedAdmin = lazy(
  () => import("./features/auth/components/ProtectedAdmin")
);
const AdminHome = lazy(() => import("./pages/AdminHome"));
const AdminProductDetailsPage = lazy(
  () => import("./pages/AdminProductDetailsPage")
);
const AdminProductFormPage = lazy(() => import("./pages/AdminProductFormPage"));
const AdminOrdersPage = lazy(() => import("./pages/AdminOrdersPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <ProductPage />,
  },
  {
    path: "/privacy",
    element: <PrivacyPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome />,
      </ProtectedAdmin>
    ),
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
    path: "products/product-detail/:id",
    element: <ProductDetailsPage />,
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailsPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "/contact",
    element: <Contact />,
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
    path: "/payment",
    element: (
      <Protected>
        <StripeCheckoutPage />,
      </Protected>
    ),
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
