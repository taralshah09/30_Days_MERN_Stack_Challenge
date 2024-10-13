import React from 'react'
import './Loading.css'
const Loading = () => {
    return (
        <div className='w-[100%] h-[100%] flex items-center justify-center mt-28'>
            <div className="flex w-[50%] h-[50%] flex-col gap-4">
                <div className="skeleton h-52 w-full"></div>
                <div className="skeleton h-10 w-28"></div>
                <div className="skeleton h-10 w-full"></div>
                <div className="skeleton h-10 w-full"></div>
            </div>
        </div>
    )
}

export default Loading
