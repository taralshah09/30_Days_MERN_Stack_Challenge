import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Get initial state from cookies or local storage
    const initialState = Cookies.get("jwt") || localStorage.getItem("ChatApp");

    // Parsing the user data and storing it in user state
    const [authUser, setAuthUser] = useState(initialState ? JSON.parse(initialState) : null);

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext)