"use client"

import React from 'react'
import { createContext , useState} from 'react'
import { useContext } from 'react'

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isloggedIn, setIsloggedIn] = useState(false);

  return (
    <div>
    <AuthContext.Provider value = {{isloggedIn, setIsloggedIn}}>
     {children}   
    </AuthContext.Provider>
    </div>
  )
}
export default AuthProvider;
export function useAuth() {
  return useContext(AuthContext);
}
