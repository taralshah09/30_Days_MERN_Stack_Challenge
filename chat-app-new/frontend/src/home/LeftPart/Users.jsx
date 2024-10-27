import React from 'react';
import User from './User';

const Users = () => {
    return (
        <div
            className=" flex-1 overflow-y-hidden"
            style={{ maxHeight: "calc(89.55vh - 10vh)" }}
        >
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-slate-800 " style={{ zIndex: 2147483647 }}>
                <h1 className='px-8 py-2 text-white font-semibold rounded-md '>Messages</h1>
            </div>

            {/* Scrollable User List */}
            <div>
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
            </div>
        </div>
    );
};

export default Users;
