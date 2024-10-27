import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/useSendMessage';

const TypeSend = () => {
    const { loading, sendMessages } = useSendMessage()
    const [text, setText] = useState("")

    const handleSubmit = async () => {
        await sendMessages(text);
        setText("")
    }
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
        }}>
            <div className='h-[9vh] bg-slate-700 flex items-center justify-center gap-4'>
                <div className='w-[80%]'>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full" value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <button>
                    <IoSend className='text-5xl text-white hover:text-blue-400 duration-300  p-2' />
                </button>
            </div>
        </form>
    )
}

export default TypeSend