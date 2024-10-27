import React from 'react'
import Message from './Message'
import useGetMessage from '../../context/useGetMessage'
import Loading from '../../components/Loading'

const Messages = () => {
    const { loading, messages } = useGetMessage()
    return (
        <div className=" flex-1 overflow-y-hidden"
            style={{ height: "calc(90vh - 9vh)" }}>
            <div className='p-4 overflow-y-hidden'>

                {loading ? <Loading /> : (messages.length > 0 && messages.map((message, index) => <Message key={index} message={message} />))}

                {
                    !loading && messages.length === 0 && <div>
                        <p className='text-center mt-[20%]'>Say Hi👋🏻 and start the conversation!</p>
                    </div>
                }

            </div>
        </div>
    )
}

export default Messages