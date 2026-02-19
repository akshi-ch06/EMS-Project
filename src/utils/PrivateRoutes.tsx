import { Navigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import { type ReactNode } from "react";

interface PrivateRoutesProps {
    children: ReactNode;
}

const PrivateRoutes = ({children}: PrivateRoutesProps) => {
    const {user,loading}= useAuth()

    if(loading){
        <div>Loading...</div>
    }
    return user? children: <Navigate to='/login'/>
}

export default PrivateRoutes