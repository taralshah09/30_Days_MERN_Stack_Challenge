import React from 'react'
import Message from './Message'

const Messages = () => {
    return (
        <div className=" flex-1 overflow-y-hidden"
            style={{ maxHeight: "calc(90vh - 9vh)" }}>
            <div className='p-4 overflow-y-hidden'>
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
            </div>
        </div>
    )
}

export default Messages
