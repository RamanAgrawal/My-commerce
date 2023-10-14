import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInuser } from './AuthSlice'
import { Navigate } from 'react-router-dom'
interface ProtectedProps {
    children: ReactNode;
}

const Protected: FC<ProtectedProps> = ({ children }) => {
    const user = useSelector(selectLoggedInuser)

    if (!user) {
        return <Navigate to={'/signin'} />
    }
    return <>{children}</>

}

export default Protected