import React from "react";
import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js"
import axios from "axios";
const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();


    const sendMessages = async (msg) => {
        setLoading(true);

        try {
            const res = await axios.post(
                `/api/messages/send/${selectedConversation._id}`,{message:msg}
            );
            setMessages([...messages,res.data]);
            setLoading(false);
        } catch (error) {
            console.log("Error in sending messages in useSendMessage", error);
            setLoading(false);
        }
    };


    return { loading, sendMessages};
};

export default useSendMessage;