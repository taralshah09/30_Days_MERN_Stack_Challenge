import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  // console.log(messages);
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `http://localhost:3000/messages/get/${selectedConversation._id}`,
            { withCredentials: true }
          );
          setMessages(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages : ", error.message);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessages]);
  return { loading, messages };
};

export default useGetMessage;
