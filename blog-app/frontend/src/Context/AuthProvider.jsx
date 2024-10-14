import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios"

export const AuthContext = createContext()



const AuthProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/api/blogs/all-blogs");
                console.log(data); // Logs the fetched blogs
                setBlogs(data); // Update state with fetched blogs
            } catch (error) {
                console.error("Error fetching blogs:", error.message);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <AuthContext.Provider value={{ blogs }}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext);