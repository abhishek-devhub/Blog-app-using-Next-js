"use client"

import React from 'react'
import { useState } from 'react'

const login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e){
    e.preventDefault();
    console.log(username)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="box flex items-center justify-center mt-20 bg-[url('')]" >
        <div className="login border-4 border-yellow-300 bg-yellow-200/50 backdrop-blur-md p-5 flex flex-col gap-5 rounded-lg w-140 h-100">
          <h2 className='Blo text-3xl m-2 text-center underline'>Login to usBlogs</h2>
          <label htmlFor="username" className='text-[15px] font-mono font-bold'>Username</label>
          <input type="text" id="username" name="username" placeholder="Enter Username" className='bg-white rounded-lg p-2 border-2 border-black 'onChange={(e)=>{setUsername(e.target.value)}} />
          <label htmlFor="password" className='text-[15px] font-mono font-bold'>Password</label>
          <input type="password" id="password" name="password" placeholder="Enter Password" className='bg-white rounded-lg p-2 border-2 border-black' />
          <button type='submit' className='button border-2 bg-violet-800 font-bold text-white rounded-lg p-2 mt-3'>Log in</button>
        </div>
      </div>
    </form>
  )
}

export default login
