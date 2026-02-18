import { useAuth } from "../context/useAuth";

export interface User {
    id: string;
    name: string;
    email: string;
}

const EmployeeDashboard = () => {
    const {user} = useAuth()
    return (
        <div>EmployeeDashboard{user?.name}</div>
    )
}

export default EmployeeDashboard