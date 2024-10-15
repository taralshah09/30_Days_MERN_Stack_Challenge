import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from '../context/AuthProvider';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { profile, isAuthenticated } = useAuth()
  const logOut = async () => {
    try {
      await axios.post("http://localhost:3000/api/users/logout", {}, { withCredentials: true });
      console.log("User logged out!");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <nav className="border-b shadow-md">
      <div className="container flex justify-between items-center mx-auto px-4 py-3">
        {/* Logo */}
        <Link to="/">
          <h2 className="text-2xl font-bold">Blog<span className="text-blue-500">App</span></h2>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <Link to="/about" className="nav-link font-semibold  hover:text-blue-500 duration-75 ">About</Link>
          <Link to="/blogs" className="nav-link font-semibold hover:text-blue-500 duration-75">Blogs</Link>
          <Link to="/creators" className="nav-link font-semibold hover:text-blue-500 duration-75">Creators</Link>
          <Link to="/contact" className="nav-link font-semibold hover:text-blue-500 duration-75">Contact</Link>
        </ul>

        {/* Action Buttons (Desktop Only) */}
        <div className="hidden md:flex space-x-6">
          {
            profile?.role === "admin" && isAuthenticated ?
              <Link to="/dashboard">
                <button className="bg-blue-400 text-white font-semibold px-2 py-1 rounded-md">Dashboard</button>
              </Link>
              : ""
          }
          <button
            className="bg-red-500 text-white font-semibold px-2 py-1 rounded-md"
            onClick={logOut}
          >
            Logout
          </button>
        </div>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="md:hidden" onClick={() => setShow(!show)}>
          {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {show && (
        <div className="md:hidden bg-white border-t">
          <ul className="flex flex-col space-y-4 p-4">
            <Link to="/about" className="nav-link" onClick={() => setShow(false)} smooth="true" duration={500} offset={-70}>About</Link>
            <Link to="/blogs" className="nav-link" onClick={() => setShow(false)} smooth="true" duration={500} offset={-70}>Blogs</Link>
            <Link to="/creators" className="nav-link" onClick={() => setShow(false)} smooth="true" duration={500} offset={-70}>Creators</Link>
            <Link to="/contact" className="nav-link" onClick={() => setShow(false)} smooth="true" duration={500} offset={-70}>Contact</Link>

            {
              profile?.role === "admin" && isAuthenticated ?
                <Link to="/dashboard" className="nav-link" onClick={() => setShow(false)} smooth="true" duration={500} offset={-70}>Dashboard</Link>
                : ""
            }
            <button
              className="bg-red-500 text-white font-semibold px-2 py-1 rounded-md"
              onClick={() => {
                logOut();
                setShow(false);
              }}
            >
              Logout
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
