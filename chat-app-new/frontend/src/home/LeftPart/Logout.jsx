import React from 'react'
import { RiLogoutBoxLine } from "react-icons/ri";


const Logout = () => {
    return (
        <div className=" h-[10vh] flex items-center justify-start ">
            <div className="px-6 py-4">
                <RiLogoutBoxLine className='text-5xl my-auto text-red-500 cursor-pointer'/>
            </div>
        </div>
    )
}

export default Logout
