import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../context/userAuth';

const HomePage = () => {

  const { user, setUser } = useContext(UserContext)


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
    } catch (err) {
      console.error("Error during logout:", err);
    }
  }


  console.log(user)

  if (!user) return <p>Loading...</p>;
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Welcome, {user.name}!</h2>
     
      <p className="text-lg mt-2">Email: {user.email}</p>
      <button className='text-2xl my-2 px-5 py-1 bg-red-600 rounded-full text-white' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default HomePage
