import React from 'react'
import useConversation from '../../zustand/useConversation.js'

const User = ({ user }) => {

    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === user._id;
    // console.log(selectedConversation)
    return (
        <div className={`hover:bg-slate-600 duration-300 ${isSelected ? "bg-slate-500" : ""}`} onClick={() => setSelectedConversation(user)}>

            <div className='flex space-x-4 items-center w-[100%] px-8 py-3 hover:bg-slate-700 rounded-lg duration-300 cursor-pointer'>
                <div className="avatar online">
                    <div className="w-12 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div>
                    <h1>{user.fullName}</h1>
                    <span>{user.email}</span>
                </div>
            </div>
        </div>
    )
}

export default User
