"use client";
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from "@/app/Context/AuthContext";

const Homelayout = () => {
    const [Blogs, setBlogs] = useState([])
    const {isloggedIn} = useAuth();

    useEffect(()=>{
        const fetchData = async () => {
            try {
        const data = await fetch("https://dev.to/api/articles?per_page=5")
        const res = await data.json()
        setBlogs(res)
        console.log(res)
            } catch (error) {
                console.error("Error fetching data:", error);   
            }
        }
        fetchData()
    } , [])
  return (
    <div className=" bg-violet-100 min-h-screen w-full p-3">
      <div className="header flex items-center justify-between">
        <h1 className="text-3xl font-bold font-mono"><span className='log text-blue-600 p-2'><i className="fa-solid fa-blog"></i></span>Blogs </h1>
        <nav>
          <ul className="flex space-x-3.5 font-bold text-[22px]">
            <li>
              <a href='/Categories' className='sub'>Category</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              {!isloggedIn && <a href="/login">🔒Login</a>}
            </li>
          </ul>
        </nav>
      </div>
       <div className="main-content text-center mt-15">
          <h1 className="text-4xl font-bold m-1">Welcome to the Blog App</h1>
          <h2 className="text-3xl text-gray-300 font-bold">Unleash Your Thoughts</h2>
          <p className="text-lg mt-2">Explore the latest blogs and articles.</p>
        </div>
        <div className={`blogs mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${!isloggedIn ? 'blur-sm' : ''}`}>
            { Blogs.map((blog) => (
                <div key={blog.id} className="blog-card bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                    <p className="text-gray-600 mb-4">{blog.description}</p>
                    {isloggedIn && <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read More</a>}
                </div>
            ))}
        </div>
        {!isloggedIn && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className="bg-black/70 text-white px-6 py-3 rounded-lg text-3xl font-semibold shadow-lg mt-20">
              🔒 Please login to see the blogs!
            </p>
          </div>
        )}
    </div>
  )
}

export default Homelayout

