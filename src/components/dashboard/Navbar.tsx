//import { useAuth } from "../../context/useAuth"

const Navbar = () => {

    //const {user}= useAuth()
    return (
        <div className="
        flex
        justify-between
        h-12
        bg-teal-600
        ">
            <p>Welcome</p>
            <button className="
            px-4
            py-1
            bg-teal-700
            hover:bg-teal-800
            ">Logout</button>
        </div>
    )
}

export default Navbar