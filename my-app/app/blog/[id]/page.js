'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'next/navigation'

const Blog = () => {

  const { id } = useParams();
  const [blog, setBlog] = useState('');
  const [comment, setcomment] = useState('')
  const [comments, setcomments] = useState([])

  // function deletecomment(index){
  //   const newcomment = comments.filter((cmt , i)=> i!== index);
  //   setcomments(newcomment);
  // }

  function CommentSection(comment) {
    if (comment.trim() === '') {
      alert("Comment cannot be empty");
      return;
    }
    setcomments([...comments, comment]);
    setcomment('');
  }

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`)
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchBlog();
  }, [id])

  if (!blog) {
    return <div className='text-center text-3xl m-40'>Loading...</div>
  }

  return (
    <div className="w-200 mx-auto bg-white shadow-lg rounded-2xl p-4 mt-8">
      {/* Blog Image */}
      <img src={blog.image} alt={blog.Title} className="h-70 w-70 rounded-xl shadow-md mb-6"/>
      {/* Title & Author */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{blog.Title}</h1>
      <p className="text-gray-500 mb-6">✍️ <span className="font-medium">{blog.Author}</span></p>
      {/* Content */}
      <p className="text-lg leading-relaxed text-gray-700 mb-6">{blog.Content}</p>
      {/* Category */}
      <span className="inline-block px-4 py-1 text-sm font-semibold text-violet-700 bg-violet-100 rounded-full mb-8"> {blog.Category}</span>
      {/* Comments Section */}
      <div className="comments mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">💬 Comments</h2>
        {/* Comment Input */}
        <div className="flex items-center gap-3 mb-6">
          <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setcomment(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-400 outline-none" />
          <button onClick={() => CommentSection(comment)} className="px-5 py-2 bg-violet-600 text-white font-medium rounded-lg shadow hover:bg-violet-700 transition" > Post </button>
        </div>
        {/* Comment List */}
        <div className="space-y-4">
          {comments.map((cmt, index) => (
            <div key={index} className="border border-gray-200 bg-gray-50 rounded-lg p-2 shadow-sm">
              <div className="flex justify-between items-center">
                <p className="text-xl capitalize text-gray-800">{cmt}</p>
                {/* Future Delete Button */}
                {/* <button
              onClick={() => deletecomment(index)} className="text-red-500 hover:text-red-700" > <i className="fa-solid fa-trash"></i></button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default Blog
