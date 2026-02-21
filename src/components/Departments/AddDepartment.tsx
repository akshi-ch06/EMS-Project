import axios, { AxiosError } from "axios"
import { useState } from "react"
import {useNavigate}  from "react-router-dom"

const AddDepartment = () => {
        const navigate=useNavigate()
        const [error, setError]= useState<string|null>(null)
        const [department, setDepartment]= useState({
        dep_name:'',
        description:''
    })

    const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        const{name, value}=e.target
        setDepartment({...department, [name]:value})
    }

    const handleSubmit=async (e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
            const response=await axios.post(
                "http://localhost:5000/api/department/add", department,
                {
                    headers:{
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
            if(response.data.success){
                if(response.data.success === "admin"){
                    navigate('/admin-dashboard/departments')
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
        <div className="
        max-w-3xl
        mx-auto
        mt-10
        bg-white
        p-8
        rounded-md
        shadow-md
        w-96
        ">
            <h2 className="
            text-2xl
            font-bold
            mb-6
            ">Add New Department</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div>
                    <label
                    htmlFor="dep_name" className="
                    text-sm
                    font-medium
                    text-gray-700
                    "> Department Name</label>
                    <input
                    type="text"
                    onChange={handleChange}
                    name="dep_name"
                    placeholder="Enter Dep Name"
                    className="
                    mt-1
                    w-full
                    p-2
                    border
                    border-gray-300
                    rounded-md
                    "/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                    name="description"
                    onChange={handleChange}
                    placeholder="Description"
                    className="
                    mt-1
                    w-full
                    p-2
                    border
                    border-gray-300
                    rounded-md
                    "></textarea>
                </div>
                <button
                type="submit"
                className="
                w-full
                mt-6
                bg-teal-600
                hover:bg-teal-700
                text-white
                font-bold
                py-2
                px-4
                rounded
                ">Add Department</button>
            </form>
        </div>
    )
}

export default AddDepartment
