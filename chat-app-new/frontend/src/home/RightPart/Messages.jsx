import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessage from '../../context/useGetMessage'
import Loading from '../../components/Loading'
import useGetSocketMessage from '../../context/useGetSocketMessage'

const Messages = () => {
    const { loading, messages } = useGetMessage()
    useGetSocketMessage();

    const lastMsgRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            if (lastMsgRef.current) {
                lastMsgRef.current.scrollIntoView({
                    behavior: "smooth",
                });
            }
        }, 100);
    }, [messages]);



    return (
        <div className=" flex-1 overflow-y-hidden"
            style={{ height: "calc(90vh - 9vh)" }}>
            <div className='p-4 overflow-y-hidden'>

                {loading ? (
                    <Loading />
                ) : (
                    messages.length > 0 &&
                    messages.map((msg, index) => (
                        <div key={index} ref={lastMsgRef}>
                            <Message messageObj={msg} />
                        </div>
                    ))
                )}

                {!loading && messages.length === 0 && (
                    <div>
                        <p className="text-center mt-[20%]">
                            Say! Hi to start the conversation
                        </p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Messages