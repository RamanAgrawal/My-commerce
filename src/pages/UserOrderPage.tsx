import Protected from "../features/auth/components/Protected"
import Navbar from "../features/navbar/Navbar"
import UserOrder from "../features/user/components/UserOrder"


const UserOrderPage = () => {
  return (
    <Protected>
        <Navbar/>
        <UserOrder/>
    </Protected>
  )
}

export default UserOrderPage