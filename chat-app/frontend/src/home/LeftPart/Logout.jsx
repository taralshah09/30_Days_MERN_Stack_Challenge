import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/users/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };
  return (
    <>
      <hr />
      <div className=" h-[10vh] bg-transparent flex items-center" >
        <div>
          <button onClick={handleLogout} className="bg-red-500 px-5 py-2 rounded-md"><i className="fa-solid fa-right-from-bracket text-xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full " ></i>Logout</button>
          {/*  */}
        </div>
      </div>
    </>
  );
}

export default Logout;