"use client";
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from "@/app/Context/AuthContext";
import SplitText from './textanimation';
import TextType from './typinganimation';
import Iridescence from './background';



const Homelayout = () => {
  const [Blogs, setBlogs] = useState([])
  const { isloggedIn } = useAuth();

  useEffect(() => {
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
  }, [])
  return (

    <div className=" min-h-screen w-full p-3">
      <div className="header flex items-center justify-between">
        <div className='flex items-center gap-3'>
          <span className='log text-blue-600 text-3xl'><i className="fa-solid fa-blog"></i></span>
          <SplitText text="Bluzzer"
            className="text-3xl font-bold font-serif "
            delay={100}
            duration={1.5}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center">
          </SplitText>
        </div>
        <nav>
          <ul className="flex space-x-3.5 font-bold text-[22px]">
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              {!isloggedIn && <a href="/login">🔒Login</a>}
            </li>
          </ul>
        </nav>
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
      <div className={`blogs mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ${!isloggedIn ? 'blur-sm' : ''}`}>
        {Blogs.map((blog) => (
          <div key={blog.id} className="blog-card bg-white p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-gray-700">
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-600 mb-4">{blog.description}</p>
            {isloggedIn && <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read More</a>}
          </div>
        ))}
      </div>
      {!isloggedIn && (
        <div className="relative flex justify-center bottom-50 ">
          <p className="bg-black/70 text-white px-6 py-3 rounded-lg text-3xl font-semibold shadow-lg ">
            🔒 Please login to see the blogs!
          </p>
        </div>
      )}
    </div>
  )
}

export default Homelayout

