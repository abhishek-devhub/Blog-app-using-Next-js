'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'next/navigation'

const Blog = () => {
  
  const {id} = useParams();
  const [blog, setBlog] = useState('');

  useEffect(()=>{
    const fetchBlog = async()=>{
      try{
        const res = await fetch(`/api/blog/${id}`)
        const data = await res.json();
        setBlog(data);
      }catch(err){
        console.log(err);
      }
    }
    fetchBlog();
  },[id])

  if(!blog){
    return <div className='text-center text-3xl m-40'>Loading...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3">{blog.Title}</h1>
      <p className="text-gray-600 mb-2">✍️ {blog.Author}</p>
      <p className="mb-4">{blog.Content}</p>
      <span className="px-3 py-1 bg-gray-200 rounded">{blog.Category}</span>
    </div>
  )
}

export default Blog
