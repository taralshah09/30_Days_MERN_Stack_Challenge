import React from 'react'

const User = () => {
    return (
        <div className='flex space-x-4 items-center w-[100%] px-8 py-3 hover:bg-slate-700 rounded-lg duration-300 cursor-pointer'>
            <div className="avatar online">
                <div className="w-12 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div>
                <h1>Taral Shah</h1>
                <span>taral@dev.com</span>
            </div>
        </div>
    )
}

export default User
