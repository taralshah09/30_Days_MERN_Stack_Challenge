import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [profile, setProfile] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = Cookies.get("jwt");
                console.log("token : " , token)
                if (token) {
                    // Token might be just a string (e.g., JWT)
                    const { data } = await axios.get("http://localhost:3000/api/users/my-profile", { 
                        withCredentials: true, 
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } 
                    });

                    console.log(data.user);
                    setProfile(data.user);
                    setIsAuthenticated(true); // User is authenticated after profile is fetched
                } else {
                    console.log("No token found");
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Error fetching profile:", error.message);
                setIsAuthenticated(false);
            }
        };

        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/api/blogs/all-blogs", { 
                    withCredentials: true, 
                    headers: { 'Content-Type': 'application/json' } 
                });

                console.log(data);
                setBlogs(data); // Update state with fetched blogs
            } catch (error) {
                console.error("Error fetching blogs:", error.message);
            }
        };

        fetchProfile();
        fetchBlogs();
    }, []);

    return (
        <AuthContext.Provider value={{ blogs, profile, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
