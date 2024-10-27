import React from 'react'

const Message = ({ message }) => {
    const authUser = JSON.parse(localStorage.getItem("ChatApp")).user._id
    const itsMe = authUser === message.senderId
    const date = new Date(message.createdAt);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    return (
        <div className='mb-1 '>
            <div className={`chat  ${itsMe ? "chat-end" : "chat-start"} flex-col`}>
                <div className={`chat-bubble text-white ${itsMe ? "chat-bubble-primary" : ""}`}>{message.message}</div>
            </div>
        </div>
    )
}

export default Message
