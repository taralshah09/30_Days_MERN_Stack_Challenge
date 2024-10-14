import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios"

export const AuthContext = createContext()



const AuthProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            await axios.get("http://localhost:3000/api/blogs/all-blogs")
                .then((res) => {
                    setBlogs(res.data)
                })
                .catch((err) => console.log(err))
        }

        fetchBlogs()
    }, [])

    return (
        <AuthContext.Provider value={{ blogs }}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext);