import React from 'react'
import useConversation from "../../zustand/useConversation.js"
import { useSocketContext } from '../../context/SocketContext.jsx';
const ChatUser = () => {
    const { selectedConversation } = useConversation();
    const authUser = JSON.parse(localStorage.getItem("ChatApp")).user.fullName;
    const { socket, onlineUsers } = useSocketContext()
    const isOnline = onlineUsers.includes(selectedConversation._id)

    return (
        <div className='h-[10vh]'>
            <div className='flex w-full bg-slate-700 px-10 py-1 gap-4 hover:bg-slate-600 duration-300 items-center'>
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div className='chat-user-details flex-col items-start'>
                    <p className='text-lg font-semibold'>{selectedConversation?.fullName || authUser}</p>
                    <span className='text-sm text-gray-400'>{isOnline ? "Online" : "Offline"}</span>
                </div>
            </div>
        </div>
    )
}

export default ChatUser
