import { Navigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import { type ReactNode } from "react";

interface RoleBaseRoutesProps {
    children: ReactNode;
    requiredRole: string | string[];
}


const RoleBaseRoutes = ({children, requiredRole}: RoleBaseRoutesProps) => {
    const{user, loading}= useAuth()
    
    if(loading){
        return <div>Loading...</div>
    }

    if (!user) {
    return <Navigate to="/login" replace />;
    }
    
    if(
    Array.isArray(requiredRole)
        ? !requiredRole.includes(user.role)
        : user.role !== requiredRole
    ) {
        <Navigate to='/unauthorized'/>
    }

    return <>{children}</>;
}

export default RoleBaseRoutes