import React from 'react'
import ChatUser from './ChatUser'
import Messages from './Messages'
import TypeSend from './TypeSend'

const Right = () => {
    return (
        <div className='w-[70%] text-white bg-slate-900 '>
            <ChatUser />
            <Messages />
            <TypeSend />
        </div>
    )
}

export default Right
