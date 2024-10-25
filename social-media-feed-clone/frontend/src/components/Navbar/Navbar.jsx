import React, { useContext, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/getUser';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/auth/logout", {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();
            if (response.ok) {
                setUser(null);
                console.log(data.message);
                navigate("/login"); // Redirect to login page after logout
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    return (
        <div className='bg-white shadow-md w-full py-3 px-5 flex items-center justify-between'>
            <Link to="/">
                <h2 className='text-2xl font-semibold text-purple-600 hover:text-purple-800 transition duration-300'>Instagram</h2>
            </Link>
            <div className="flex gap-10">
                <NavLink to="/my-posts" className={({ isActive }) => `text-lg font-medium px-4 py-2 rounded-md  ${isActive ? 'bg-purple-600 text-white' : 'text-gray-600'} hover:text-purple-200 transition duration-300`}>
                    My Posts
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => `text-lg font-medium px-4 py-2 rounded-md ${isActive ? 'bg-purple-600 text-white' : 'text-gray-600'} hover:text-purple-200 transition duration-300`}>
                    Profile
                </NavLink>
                {/* You can add more NavLinks here if needed */}
            </div>
            <div className="flex items-center gap-3">
                {user?.profilePicture && (
                    <img
                        src={user?.profilePicture}
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover border-2 border-purple-600"
                    />
                )}
                <Link to="/add-post" className='bg-white border-purple text-purple-600 px-4 py-2 rounded-md hover:bg-purple-700 hover:text-white transition duration-300'>Add Post</Link>
                <button onClick={handleLogout} className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300'>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
