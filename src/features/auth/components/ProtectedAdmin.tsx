import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../authSlice'
import { Navigate } from 'react-router-dom'
import { selectUserInfo } from '../../user/userSlice';
interface ProtectedAdminProps {
    children: ReactNode;
}

const ProtectedAdmin: FC<ProtectedAdminProps> = ({ children }) => {
    const user = useSelector(selectLoggedInUser)
    const userInfo=useSelector(selectUserInfo)

    if (!user) {
        return <Navigate to={'/signin'} />
    }
    if (user && userInfo?.role!=='admin') {
        return <Navigate to={'/'} />
    }
    return <>{children}</>

}

export default ProtectedAdmin