'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'next/navigation'

const Blog = () => {
  
  const {id} = useParams();
  const [blog, setBlog] = useState('');
  const [comment, setcomment] = useState('')
  const [comments, setcomments] = useState([])

    // function deletecomment(index){
    //   const newcomment = comments.filter((cmt , i)=> i!== index);
    //   setcomments(newcomment);
    // }

  function CommentSection(comment){
    if(comment.trim() === ''){
      alert("Comment cannot be empty");
      return;
    }
    setcomments([...comments, comment]);
    setcomment('');
  }

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
      <div className="comments">
        <h2 className="text-2xl font-semibold mt-6 mb-3">Comments</h2>
        <div className="comment border-t pt-4">
          <input type="text" placeholder='Add a comment' value={comment} className='comment p-2 m-2' onChange={(e)=> setcomment(e.target.value)}  />
          <button onClick={()=> CommentSection(comment)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Post Comment</button>
          {comments.map((cmt , index)=>(
            <div key={index} className="border-2 p-2 m-2 rounded">
              <div className="comm flex justify-between">
              <p className='text-2xl capitalize p-2'>{cmt}</p>
              {/* <div className="delete" onClick={()=>{deletecomment(index)}} ><i className="fa-solid fa-trash border-4 rounded-full p-2 cursor-pointer text-red-500 text-2xl" ></i></div>  */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
