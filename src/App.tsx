import './App.css'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store/store';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import { fetchCartAsync } from './features/cart/CartSlice';
import { fetchLoggedInUserAsync } from './features/user/userSlice';

import { router } from './Router';


//   {
//     path: "/",
//     element: <Protected>
//       <Home />,
//     </Protected>

//   },
//   {
//     path: "/admin",
//     element: <ProtectedAdmin>
//       <AdminHome />,
//     </ProtectedAdmin>

//   },
//   {
//     path: "/signin",
//     element: <SignIn />,

//   },
//   {
//     path: "/signup",
//     element: <SignUp />,

//   },
//   {
//     path: "/logout",
//     element: <Logout />,

//   },
//   {
//     path: "/forgot-password",
//     element: <ForgotPasswordPage />,

//   },
//   {
//     path: "/cart",
//     element: <Protected><CartPage /></Protected>,

//   },
//   {
//     path: "/product-detail/:id",
//     element: <ProductDetailsPage />,

//   },
//   {
//     path: "/admin/product-detail/:id",
//     element: <ProtectedAdmin>
//       <AdminProductDetailsPage />
//     </ProtectedAdmin>,

//   },
//   {
//     path: "/admin/orders",
//     element: <ProtectedAdmin>
//       <AdminOrdersPage />
//     </ProtectedAdmin>,

//   },
//   {
//     path: "/admin/product-form",
//     element: <ProtectedAdmin>
//       <AdminProductFormPage />
//     </ProtectedAdmin>,

//   },
//   {
//     path: "/admin/product-form/edit/:id",
//     element: <ProtectedAdmin>
//       <AdminProductFormPage />
//     </ProtectedAdmin>,

//   },
//   {
//     path: "/checkout",
//     element: <Protected><CheckoutPage /></Protected>,

//   },
//   {
//     path: "/contact",
//     element: <Contact />,

//   },
//   {
//     path: "/about",
//     element: <About />,

//   },
//   {
//     path: "/orders",
//     element: <UserOrderPage />,

//   },
//   {
//     path: "/profile",
//     element: <UserProfilePage />,

//   },
//   {
//     path: "/addaddress",
//     element: <AddAddress />,

//   },
//   {
//     path: "/order-succcess/:id",
//     element: <OrderSuccess />,

//   },
//   {
//     path: "*",
//     element: <PageNotFound />,

//   },

// ]);
function App() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectLoggedInUser)
  const userChecked = useSelector(selectUserChecked)

  useEffect(() => {
    dispatch(checkAuthAsync())
  })

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
