//import { Navigate } from "react-router-dom"
//import { useAuth } from "../context/useAuth"
import AdminSidebar from "../components/dashboard/AdminSidebar"
//import AdminSummary from "../components/dashboard/AdminSummary"
import Navbar from "../components/dashboard/Navbar"
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
    // const {user, loading}= useAuth()
    // if(loading){
    //     return <div>Loading...</div>
    // }
    // if(!user){
    //     return <Navigate to="/login" replace />;
    // }
    return (
        <div className="flex">
            <AdminSidebar/>
            <div className="
            flex-1
            ml-64
            bg-gray-100
            h-screen
            ">
                <Navbar/>{/* Child Routes Render Here */}
                <Outlet />
            </div>
        </div>

    )
}

export default AdminDashboard