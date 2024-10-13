import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/users/allusers", {
          headers: {
            Authorization: `Bearer ${token}`, // Removed credentials as it's not valid in axios config
          },
        });
        setAllUsers(response.data.filteredUsers); // Set filteredUsers
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
        setError(error.response?.data?.error || "Failed to fetch users."); // Handle error response
      } finally {
        setLoading(false); // Always reset loading state
      }
    };
    
    getUsers();
  }, []);

  return [ allUsers, loading, error ]; // Return error state as well
}

export default useGetAllUsers; // Ensure this is present
