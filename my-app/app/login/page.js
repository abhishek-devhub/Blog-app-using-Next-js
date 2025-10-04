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
    const res = await fetch('api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username , password })
    })
    const data = await res.json()
    if (res.status === 200) {
      setIsloggedIn(true)
      router.push('/')
    } else {
      alert("Invalid Credentials" || data.error)
    }
  }
  return (
    <div className="fr bg-cyan-600 h-screen">
      {/* <span className='log text-blue-600 text-4xl p-3 border-white border-2 rounded-lg bg-white '><i className="fa-solid fa-blog"></i></span> */}
      <div className="box flex items-center justify-center" >
        <div className="login border-4 backdrop-blur-3xl bg-white p-15 rounded-3xl w-150 mt-10">
          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <h2 className='Blo text-3xl m-2 font-bold font-serif text-center underline'>Login to BlogVerse</h2>
            <label htmlFor="username" className='text-[15px] font-mono font-bold'>Email</label>
            <input type="text" id="username" name="username" placeholder="Enter Email" className='bg-white rounded-lg p-2 border-2 focus:border-blue-900 focus:border-2' onChange={(e) => { setUsername(e.target.value) }} />
            <label htmlFor="password" className='text-[15px] font-mono font-bold'>Password</label>
            <input type="password" id="password" name="password" placeholder="Enter Password" className='bg-white rounded-lg p-2 border-2 focus:border-blue-900 focus:border-2' onChange={(e) => { setPassword(e.target.value) }} />
            <button type='submit' className='button border-2 bg-violet-700 font-bold text-white rounded-lg p-2 cursor-pointer hover:bg-violet-800 mt-2 mb-5'>Log in</button>
          </form>
          <small className='font-bold underline '>Not register<button onClick={() => { register() }} className='cursor-pointer font-bold pl-1'> Sign Up for free</button></small>
        </div>
      </div>
    </div>
  )
}

export default login
