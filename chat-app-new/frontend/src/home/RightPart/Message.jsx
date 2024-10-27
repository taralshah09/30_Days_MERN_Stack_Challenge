import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ messageObj }) => {
    const storedData = localStorage.getItem("ChatApp");
    const authUser = storedData ? JSON.parse(storedData).user._id : null;
    const itsMe = authUser === messageObj.senderId;
    // const date = new Date(messageObj.createdAt);
    // const hours = date.getHours().toString().padStart(2, '0');
    // const minutes = date.getMinutes().toString().padStart(2, '0');
    // const time = `${hours}:${minutes}`;

    return (
        <div className='mb-1 '>
            <div className={`chat ${itsMe ? "chat-end" : "chat-start"} flex-col`}>
                <div className={`chat-bubble text-white ${itsMe ? "chat-bubble-primary" : ""}`}>
                    {messageObj.message}
                </div>
            </div>
        </div>
    );
}

Message.propTypes = {
    messageObj: PropTypes.shape({
        senderId: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
    }).isRequired,
};

export default Message;
