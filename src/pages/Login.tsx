import axios, {AxiosError} from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"



const Login = () => {
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [error, setError]= useState<string|null>(null)
    const {login}=useAuth()
    const navigate=useNavigate()
    
    const handleSubmit= async(e:React.SubmitEvent)=>{
        e.preventDefault()
        try{
            const response=await axios.post(
                "http://localhost:5000/api/auth/login",
                {email, password}
            )
            if(response.data.success){
                login(response.data.user, response.data.token)
                console.log(response.data.user)
                if(response.data.user.role === "admin"){
                    navigate('/admin-dashboard')
                }else{
                    navigate("/employee-dashboard")
                }
            }
        }catch (error) {
            if (error instanceof AxiosError) {
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.error);
                }
            }
        }
    }
    return (
        <div>
            <div
            className="
                flex
                flex-col
                justify-center
                items-center
                h-screen
                bg-linear-to-b
                from-teal-600
                from-50%
                to-gray-100
                to-50%
                space-y-6
                gap-8
                ">
                <h2
                className="
                font-serif
                text-3xl
                text-white
                ">Employee Management System</h2>
                <form
                    onSubmit={handleSubmit}
                    className="
                    flex
                    flex-col
                    gap-6
                    bg-white
                    rounded-md
                    shadow-2xl
                    p-20
                    w-150
                    h-130
                    ">
                    <h3
                    className="
                    font-bold
                    text-2xl
                    mb-4
                    ">Login</h3>
                    {error && <p className="text-red-500">{error}</p>}
                    <div
                    className="
                        flex
                        flex-col
                        gap-2
                        ">

                        <label
                        htmlFor="email"
                        className="
                        text-gray-700
                        ">Email</label>

                        <input
                        required
                        onChange={(e)=>setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter Username"
                        className="
                        border-2
                        w-full
                        px-3
                        py-2
                        text-gray-700
                        "/>

                    </div>
                    <div
                        className="
                        flex
                        flex-col
                        gap-2
                        ">

                        <label
                        htmlFor="password"
                        className="
                        text-gray-700
                        ">Password</label>

                        <input
                        required
                        onChange={(e)=>setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter Password"
                        className="
                        border-2
                        w-full
                        px-3
                        py-2
                        text-gray-700
                        "/>

                    </div>
                    <div
                    className="
                    flex
                    flex-row
                    gap-3
                    ">
                        <input
                        type="checkbox"
                        className="
                        w-[5%]
                        "/>
                        <p className="
                        w-[50%]
                        ">Remember Me</p>
                        <p className="
                        w-[45%]
                        flex
                        justify-end
                        text-teal-500
                        ">Forget password?</p>
                    </div>
                    <button
                    className="
                    rounded-md
                    bg-teal-600
                    px-3
                    py-2
                    text-sm
                    font-semibold
                    text-white
                    shadow-xs
                    hover:bg-teal-500
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-teal-600
                    ">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login