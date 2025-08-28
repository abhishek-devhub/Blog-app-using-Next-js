"use client"
import React from 'react'

const PostingBlogs = () => {
  return (
    <div>
      <div className="blogscont">
        <h1 className='posts'>Posts your own Blogs Now Free</h1>
        <div className='Postblogs border-2 m-5 p-5 rounded-lg  backdrop-blur-lg'>
            <form className='flex flex-col gap-3'>
                <label htmlFor="Name" className='author'>Author Name</label>
                <input type="text" className='bg-white rounded-lg p-2 border-2 border-black' />
                <label htmlFor="Title" >Blog Title</label>
                <input type="text" className='bg-white rounded-lg p-2 border-2 border-black' />
                <label htmlFor="Content">Blog Content</label>
                <textarea name="Content" id="" cols="30" rows="10"></textarea>
                <label htmlFor="category">Category</label>
                <select name="category" id="">
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Education">Education</option>
                    <option value="Finance">Finance</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Sports">Sports</option>
                    <option value="Other">Other</option>
                </select>
                <button type='submit' className='postbtn'>Post Now</button> 
            </form>
        </div>
      </div>
    </div>
  )
}

export default PostingBlogs
