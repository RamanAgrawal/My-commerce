import './App.css'
import SignIn from './pages/SignIn'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom';
import SignUp from './pages/SignUpPage';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Contact from './pages/Contact';
import About from './pages/About';
import CheckoutPage from './pages/CheckoutPage';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
     
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
      element: <CartPage />,
     
    },
    {
      path: "/checkout",
      element: <CheckoutPage />,
     
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
  return (
    <RouterProvider router={router} />
  )
}

export default App
