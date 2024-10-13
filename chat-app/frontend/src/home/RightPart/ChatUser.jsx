import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const ChatUser = () => {
  // Parse authUser from localStorage
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const { messages, selectedConversation, setSelectedConversation } = useConversation();

  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  console.log(selectedConversation);

  // Add a check for selectedConversation
  const userStatus = selectedConversation ? getOnlineUsersStatus(selectedConversation._id) : "Offline";
  const userName = selectedConversation && selectedConversation.fullName
    ? selectedConversation.fullName
    : authUser && authUser.user.fullName
    ? `${authUser.user.fullName} (self)`
    : '';

  return (
    <div className="flex gap-5 items-center justify-start py-0.5 px-5 bg-slate-800" style={{ alignItems: "center" }}>
      <div className="avatar">
        <div className={`w-10 rounded-full ${userStatus === "Online" ? "online" : ""}`}>
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User Avatar" />
        </div>
      </div>
      <div className="details flex-col gap-1 ">
        <p className="text-white font-medium">{userName}</p>
        <span className="text-gray-400">{userStatus}</span>
      </div>
    </div>
  );
};

export default ChatUser;
