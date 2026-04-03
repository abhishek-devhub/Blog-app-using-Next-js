"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isloggedIn, setIsloggedIn] = useState(false);
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("isloggedIn");
            if (stored === "true") {
                setIsloggedIn(true);
            }
            setIsAuthLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthLoaded) {
            if (isloggedIn) {
                localStorage.setItem("isloggedIn", "true");
            } else {
                localStorage.removeItem("isloggedIn");
            }
        }
    }, [isloggedIn, isAuthLoaded]);

  return (
    <AuthContext.Provider value={{ isloggedIn, setIsloggedIn, isAuthLoaded }}>
     {children}   
    </AuthContext.Provider>
  )
}
export default AuthProvider;
export function useAuth() {
  return useContext(AuthContext);
}
