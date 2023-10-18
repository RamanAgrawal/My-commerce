import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../authSlice'
import { Navigate } from 'react-router-dom'
interface ProtectedProps {
    children: ReactNode;
}

const Protected: FC<ProtectedProps> = ({ children }) => {
    const user = useSelector(selectLoggedInUser)

    if (!user) {
        return <Navigate to={'/signin'} />
    }
    return <>{children}</>

}

export default Protected