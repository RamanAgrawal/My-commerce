import Protected from "../features/auth/Protected"
import Navbar from "../features/navbar/Navbar"
import UserOrder from "../features/user/UserOrder"


const UserOrderPage = () => {
  return (
    <Protected>
        <Navbar/>
        <UserOrder/>
    </Protected>
  )
}

export default UserOrderPage