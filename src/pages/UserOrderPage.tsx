import Protected from "../features/auth/components/Protected"
import Footer from "../features/footer/Footer"
import Navbar from "../features/navbar/Navbar"
import UserOrder from "../features/user/components/UserOrder"


const UserOrderPage = () => {
  return (
    <Protected>
        <Navbar/>
        <UserOrder/>
        <Footer/>
    </Protected>
  )
}

export default UserOrderPage