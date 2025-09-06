"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'
import { useAuth } from '../Context/AuthContext'


const login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { setIsloggedIn, isloggedIn } = useAuth();
 

  function register() {
    router.push('/Registerpage')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await fetch('api/registeruser', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json();
    console.log(data)
    const name = data.find((user) => user.email === username)?.email;
    const pass = data.find((user) => user.password === password)?.password;
    if (username === name && password === pass) {
      setIsloggedIn(true)
      router.push('/')
    } else {
      alert("Invalid Credentials")
    }
  }
  return (
    <div className="fr bg-cyan-100 h-screen">
      <span className='log text-blue-600 text-4xl m-3 '><i className="fa-solid fa-blog"></i></span>
      <div className="box flex items-center justify-center" >
        <div className="login border-4 bg-yellow-200 backdrop-blur-3xl p-15 rounded-3xl w-150">
          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <h2 className='Blo text-3xl m-2 font-bold font-serif text-center underline'>Login to BlogVerse</h2>
            <label htmlFor="username" className='text-[15px] font-mono font-bold'>Email</label>
            <input type="text" id="username" name="username" placeholder="Enter Email" className='bg-white rounded-lg p-2 border-2 border-black' onChange={(e) => { setUsername(e.target.value) }} />
            <label htmlFor="password" className='text-[15px] font-mono font-bold'>Password</label>
            <input type="password" id="password" name="password" placeholder="Enter Password" className='bg-white rounded-lg p-2 border-2 border-black' onChange={(e) => { setPassword(e.target.value) }} />
            <button type='submit' className='button border-2 bg-violet-700 font-bold text-white rounded-lg p-2 cursor-pointer hover:bg-violet-800 mt-2 mb-5'>Log in</button>
          </form>
          <small className='font-bold underline '>Not register<button onClick={() => { register() }} className='cursor-pointer font-bold pl-1'> Sign Up for free</button></small>
        </div>
      </div>
    </div>
  )
}

export default login
