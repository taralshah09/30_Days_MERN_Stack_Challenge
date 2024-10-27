import React from 'react';
import User from './User';
import useGetAllUsers from '../../context/useGetAllUsers';

const Users = () => {
    const [allUsers, loading] = useGetAllUsers();
    console.log(allUsers);

    return (
        <div className="flex-1 overflow-y-hidden" style={{ height: "calc(89.55vh - 8vh)" }}>
            {/* Conditional Loading State */}
            {!loading ? (
                <p>Loading</p>
            ) : (
                <>
                    {/* Sticky Header */}
                    <div className="sticky top-0 z-10 bg-slate-800" style={{ zIndex: 2147483647 }}>
                        <h1 className="px-8 py-2 text-white font-semibold rounded-md">Messages</h1>
                    </div>

                    {/* Scrollable User List */}
                    <div>
                        {allUsers.map((user, index) => (
                            <User key={index} user={user} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Users;
