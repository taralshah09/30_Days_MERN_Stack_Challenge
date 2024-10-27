import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const authUser = JSON.parse(localStorage.getItem("ChatApp")).user._id;
  const sendMessages = async (message) => {
    setLoading(true);
    if (selectedConversation && selectedConversation._id) {
      try {
        const res = await axios.post(
          `http://localhost:3000/messages/send/${selectedConversation._id}`,
          {
            senderId: authUser,
            receiverId: selectedConversation._id,
            message: message,
          },
          { withCredentials: true } 
        );
        setMessages([...messages, res.data]);
        setLoading(false);
      } catch (error) {
        console.log("Error in sending messages : ", error.message);
      }
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;
