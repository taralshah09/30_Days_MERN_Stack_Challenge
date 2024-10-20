import React, { useContext, useState } from 'react';
import './Navbar.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../../context/userAuth';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:5000/auth/logout", {
                method: "GET",
                credentials: "include",
            });

            if (res.ok) {
                navigate("/login");
            } else {
                console.error("Logout failed");
            }
            setUser(null)
        } catch (err) {
            console.error("Error during logout:", err);
        }
    }
    return (
        <nav className="header">
            <div className="logo">
                <Link to="/">
                    <img src="./images/logo.png" alt="Logo" />
                </Link>
            </div>
            <ul className="nav-links">
                <li>
                    <NavLink to="/all" className="link">All</NavLink>
                </li>
                <li>
                    <NavLink to="/income" className="link">Income</NavLink>
                </li>
                <li>
                    <NavLink to="/expense" className="link">Expense</NavLink>
                </li>
                <li>
                    <NavLink to="/add" className="link">Add</NavLink>
                </li>
            </ul>
            <div className="profile-box" onClick={toggleDropdown}>
                <img
                    src={user?.profilePicture ? user?.profilePicture : './default-profile.png'}
                    alt="Profile"
                    className="w-11 h-11 rounded-full cursor-pointer"
                />
                {isDropdownOpen && (
                    <div className="dropdown">
                        <h3>{user?.name || 'Guest'}</h3>
                        <p>{user?.email || 'guest@example.com'}</p>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
