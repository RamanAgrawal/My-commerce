import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../authSlice'
import { Navigate } from 'react-router-dom'
interface ProtectedAdminProps {
    children: ReactNode;
}

const ProtectedAdmin: FC<ProtectedAdminProps> = ({ children }) => {
    const user = useSelector(selectLoggedInUser)

    if (!user) {
        return <Navigate to={'/signin'} />
    }
    if (user && user.role!=='admin') {
        return <Navigate to={'/'} />
    }
    return <>{children}</>

}

export default ProtectedAdmin