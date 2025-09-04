"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'
import { useAuth } from '../Context/AuthContext'

const login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { setIsloggedIn } = useAuth();

  function handleSubmit(e) {
    e.preventDefault()
    if (username === "admin" && password === "admin123") {
      setIsloggedIn(true)
      router.push('/')
    } else {
      alert("Invalid Credentials")
    }
  }
  return (
    <div className="fr bg-cyan-100 h-screen">
      <form onSubmit={handleSubmit}>
        <span className='log text-blue-600 text-4xl m-3 '><i className="fa-solid fa-blog"></i></span>
        <div className="box flex items-center justify-center mt-10 " >
          <div className="login border-4 bg-yellow-200 backdrop-blur-3xl p-5 flex flex-col gap-5 rounded-lg w-150">
            <h2 className='Blo text-3xl m-2 text-center underline'>Login to BlogVerse</h2>
            <label htmlFor="username" className='text-[15px] font-mono font-bold'>Email</label>
            <input type="text" id="username" name="username" placeholder="Enter Email" className='bg-white rounded-lg p-2 border-2 border-black' onChange={(e) => { setUsername(e.target.value) }} />
            <label htmlFor="password" className='text-[15px] font-mono font-bold'>Password</label>
            <input type="password" id="password" name="password" placeholder="Enter Password" className='bg-white rounded-lg p-2 border-2 border-black' onChange={(e) => { setPassword(e.target.value) }} />
            <button type='submit' className='button border-2 bg-violet-800 font-bold text-white rounded-lg p-2 mt-3 cursor-pointer'>Log in</button>
            <small className='font-bold underline'>Not register<button onClick={router.push('/Registerpage')} className='cursor-pointer font-bold pl-1'> Sign Up for free</button></small>
          </div>
        </div>
      </form>
    </div>
  )
}

export default login
