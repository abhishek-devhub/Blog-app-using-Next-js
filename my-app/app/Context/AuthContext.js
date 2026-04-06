"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isloggedIn, setIsloggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("isloggedIn");
            const storedEmail = localStorage.getItem("userEmail");
            if (stored === "true") {
                setIsloggedIn(true);
                if (storedEmail) setUserEmail(storedEmail);
            }
            setIsAuthLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthLoaded) {
            if (isloggedIn) {
                localStorage.setItem("isloggedIn", "true");
                if (userEmail) localStorage.setItem("userEmail", userEmail);
            } else {
                localStorage.removeItem("isloggedIn");
                localStorage.removeItem("userEmail");
            }
        }
    }, [isloggedIn, userEmail, isAuthLoaded]);

  return (
    <AuthContext.Provider value={{ isloggedIn, setIsloggedIn, userEmail, setUserEmail, isAuthLoaded }}>
     {children}   
    </AuthContext.Provider>
  )
}
export default AuthProvider;
export function useAuth() {
  return useContext(AuthContext);
}
