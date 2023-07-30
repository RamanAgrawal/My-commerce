import './App.css'
import SignIn from './pages/SignIn'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom';
import SignUp from './pages/SignUpPage';
import Home from './Home';

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
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App
