import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

// import profile from "../../../public/user.jpg";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
    const { socket, onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(user._id);
  return (
    <div className={`hover:bg-slate-500 duration-300 ${isSelected ? "bg-slate-800" : ""}`} onClick={()=>setSelectedConversation(user)}>
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : "" }`}>
          <div className="w-14 border-spacing-1">
            <img
              src="./images/user-icon-normal.webp"
              className="rounded-full"
              alt="user-img"
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold">{user.fullName}</h1>
          <span className="text-gray-400">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
