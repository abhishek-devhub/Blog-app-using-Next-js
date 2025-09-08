"use client";
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from "@/app/Context/AuthContext";
import SplitText from './textanimation';
import TextType from './typinganimation';
import Navbar from './Navbar';
import { useOptimistic } from 'react';
import Link from 'next/link';


const Homelayout = () => {
  const [Blogs, setBlogs] = useState([])
  const { isloggedIn } = useAuth();
 const [optimisticBlogs, addOptimistic] = useOptimistic(
  Blogs,
  (state, newBlog) => [newBlog, ...state]
);

function maincontent(){
  
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('/api/blog',{
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
       <Navbar/>
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
        {!isloggedIn && (
        <div className="flex justify-center mt-10">
          {Blogs &&<p className="bg-black/70 text-white px-6 py-3 rounded-lg text-3xl font-semibold shadow-lg ">
            🔒 Please login to see the blogs!
          </p>}
        </div>
      )}
      </div>
      <div className={`blogs grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-3 ${!isloggedIn ? 'blur-sm' : ''}`}>
        {optimisticBlogs.map((blog) => (
          <div key={blog.$oid} className="blog-card bg-white p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-gray-700 cursor-pointer">
            <p className="text-gray-600 mb-4">{blog.Author}</p>
            <h3 className="text-xl font-semibold mb-2">{blog.Title}</h3>
            <p className="text-gray-600 mb-4">{blog.Content}</p>
            <p className="text-gray-600 mb-4">{blog.Category}</p>
            {isloggedIn && <Link href={`/blog/${blog._id}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read More</Link>}
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Homelayout

