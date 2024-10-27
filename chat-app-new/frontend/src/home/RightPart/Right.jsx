import React, { useEffect } from 'react';
import ChatUser from './ChatUser';
import Messages from './Messages';
import TypeSend from './TypeSend';
import useConversation from '../../zustand/useConversation.js';
import { useAuth } from "../../context/AuthProvider.jsx";

const NoChatSelected = () => {
    const [authUser] = useAuth();

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl">
                    Welcome,{" "}
                    <span className="font-semibold text-2xl">
                        {authUser.user.fullname}
                    </span>
                </h1>
                <p className="mt-4 text-lg">
                    No chat selected. Please start a conversation by selecting a contact.
                </p>
            </div>
        </div>
    );
};

const Right = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    // Effect to clear the selected conversation when the component mounts
    useEffect(() => {
        setSelectedConversation(null); // Only set this when necessary, i.e., when mounting
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div className='w-full'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <div className='w-full text-white bg-slate-900'>
                    <ChatUser />
                    <Messages />
                    <TypeSend />
                </div>
            )}
        </div>
    );
};

export default Right;
