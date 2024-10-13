import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation.js";
import sound from "../assets/notification.mp3";
const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage } = useConversation();

  useEffect(() => {
    if(socket){

      socket.on("newMessage", (newMessage) => {
        const notification = new Audio(sound);
        notification.play();
        setMessage([...messages, newMessage]);
      });
      return () => {
        socket.off("newMessage");
      };
    }
    console.log("Socket not working")
  }, [socket, messages, setMessage]);
};
export default useGetSocketMessage;
