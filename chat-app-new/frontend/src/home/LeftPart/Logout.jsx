import React from 'react'
import { RiLogoutBoxLine } from "react-icons/ri";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
const Logout = () => {

    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const response = await axios.post("http://localhost:3000/users/logout", {}, { withCredentials: true })
            console.log(response.data)
            localStorage.removeItem("ChatApp")
            window.location.reload()
            navigate("/")
        } catch (error) {
            console.log("Error in logging out : ", error)
        }
    }
    return (
        <div className=" h-[8vh] flex items-center justify-start bg-slate-800">
            <div className="px-6 ">
                <RiLogoutBoxLine className='text-4xl my-auto text-red-500 cursor-pointer' onClick={handleLogout} />
            </div>
        </div>
    )
}

export default Logout
