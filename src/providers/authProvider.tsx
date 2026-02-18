import { useEffect, useState, type ReactNode } from "react";
import { UserContext, type User } from "../context/authContext";
import axios, { AxiosError } from "axios";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading]= useState(true)

    useEffect(()=>{
        const verifyUser=async()=>{
            try{
                const token=localStorage.getItem('token')
                if (token){
                const response=await axios.get(
                    "http://localhost:5000/api/auth/verify",{
                        headers:{
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    if(response.data.success){
                        setUser(response.data.user)
                    }
                }else{
                    setUser(null)
                }
            }catch(error){
                if (error instanceof AxiosError) {
                                if (error.response && !error.response.data.error) {
                                    setUser(null)
                                }
                            }
            }finally{
                                setLoading(false)
                            }
        }
        verifyUser()
    },[])

    const login = (userData: User, token: string) => {
        setUser(userData);
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default AuthProvider;
