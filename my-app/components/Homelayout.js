"use client";

import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from "@/app/Context/AuthContext";
import TextType from './typinganimation';
import Navbar from './Navbar';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Homelayout = () => {
  const [Blogs, setBlogs] = useState([])
  const { data: session, status } = useSession();
  const { isloggedIn } = useAuth();
  const [liked, setliked] = useState(false)
  const [input, setinput] = useState('')

  function likeCount(blogId) {
    setliked(prev => ({
      ...prev,
      [blogId]: !prev[blogId]
    })
    )
  }

  const userloggedIn = status === "authenticated" || isloggedIn;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('/api/blog', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        const res = await data.json()
        setBlogs(res)
        console.log(res)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData()
  }, [])

  return (

    <div className=" min-h-screen w-full">
      <div className="header flex items-center justify-between">
        <Navbar />
      </div>
      <div className="main-content text-center mt-12">
        <TextType
          className="text-black text-4xl md:text-5xl lg:text-4xl font-extrabold  p-3"
          text={["Welcome to our Blog Page!", "Here you can Post your Blogs", "Read Amazing Blogs"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
        <h2 className="text-3xl text-gray-900 font-bold">Unleash Your Thoughts</h2>
        <p className="text-lg mt-2">Explore the latest blogs and articles.</p>
      </div>
      <div className="erro">
        {!userloggedIn && (
          <div className="flex justify-center mt-10">
            {Blogs && <p className="bg-black/70 text-white px-6 py-3 rounded-lg text-3xl font-semibold shadow-lg ">
              🔒 Please login to see the blogs!
            </p>}
          </div>
        )}
        <div className="conta flex items-center justify-end mr-2">
          <div className="search border-2 w-60 border-black mt-6 rounded-2xl bg-white p-2">
            <input type="text" placeholder='Search By Category...' value={input} className='outline-none ' onChange={(e)=> setinput(e.target.value)} />
            <i className="fa-solid fa-magnifying-glass p-2 border rounded-2xl bg-blue-300 cursor-pointer" onClick={(e)=> {e.target.value}}></i>
          </div>
        </div>
      </div>
      <div className={`blogs grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-3 mt-5 ${!userloggedIn ? 'blur-sm' : ''}`}>
        {Blogs.filter((blog)=>
        blog.Category.toLowerCase().includes(input.toLowerCase()))
        .map((blog) => (
          <div key={blog._id} className="blog-card bg-white p-2 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-gray-700 cursor-pointer">
            <img src={blog.image} alt={blog.Title} width={100} height={100} className='' />
            <p className="text-gray-600 mb-2">{blog.Author}</p>
            <h3 className="text-xl font-semibold mb-2">{blog.Title}</h3>
            <p className="text-gray-600 mb-2">{blog.Content.substring(0, 100)}...</p>
            <p className="text-gray-600 mb-2">{blog.Category}</p>
            <div className="foot flex justify-between">
              {userloggedIn && <Link href={`/blog/${blog._id}`} className="text-blue-500 hover:underline">Read More</Link>}
              <button><i className={`fa-solid fa-heart transition-transform duration-300 cursor-pointer ${liked[blog._id] ? "text-red-400" : "text-gray-400"}`} onClick={(e) => likeCount(blog._id)}></i></button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Homelayout

