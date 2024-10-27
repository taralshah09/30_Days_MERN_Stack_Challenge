import React from 'react'
import { IoSend } from "react-icons/io5";
const TypeSend = () => {
    return (
        <div className='h-[9vh] bg-slate-700 flex items-center justify-center gap-4'>
            <div className='w-[80%]'>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
            </div>
            <button>
            <IoSend className='text-5xl text-white hover:text-blue-400 duration-300  p-2'/>
            </button>
        </div>
    )
}

export default TypeSend
