import React, { useEffect, useState } from "react";
import ChatUser from "./ChatUser";
import Messages from "./Messages";
import './Right.css'
import axios from "axios";
import useConversation from "../../../zustand/useConversation.js";
import TypeSend from "./TypeSend.jsx"
const Right = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
 
  return (
    <div className="w-full md:w-[75%] text-white bg-slate-900 h-screen flex flex-col overflow-hidden">
      <ChatUser />
      <div className="flex-grow overflow-auto hide-scrollbar">
      
       
        <Messages />
      </div>
      <TypeSend/>
    </div>
  );
};

export default Right;
