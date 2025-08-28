"use client"
import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
const PostingBlogs = () => {
  const [Author, setAuthor] = useState('');
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [Category, setCategory] = useState('Technology');
  
  return (
    <div>
      <h1 className='posts text-center text-violet-900 text-3xl font-bold m-2'>Posts your own Blogs Now Free</h1>
      <div className="both flex justify-around items-center p-2 gap-3">
        <div className="left">
          <Image src="https://img.freepik.com/vector-premium/vector-concepto-blogs_269504-2043.jpg?w=2000" alt='blogingapp' className='rounded-lg hover:scale-101 transition-transform duration-300' height={500} width={550}></Image>
        </div>
        <div className='right rounded backdrop-blur-lg w-150 p-3 '>
          <form className='flex flex-col gap-3'>
            <label htmlFor="Name" className='author font-bold'>Author Name</label>
            <input type="text" className='bg-white rounded-lg p-2 border-2 border-black' />
            <label htmlFor="Title" className='font-bold'>Blog Title</label>
            <input type="text" className='bg-white rounded-lg p-2 border-2 border-black' />
            <label htmlFor="Content" className='font-bold' >Blog Content</label>
            <textarea className='border-gray-400 border-2' name="Content" id="" cols="30" rows="10"></textarea>
            <label htmlFor="category" className='font-bold'>Category : <span>
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
            </span></label>
            <button type='submit' className='postbtn flex p-2 text-2xl font-bold text-green-950 border-2 w-[130px] bg-violet-300 rounded-lg hover:backdrop-blur-lg cursor-pointer transition-transform duration-300 hover:scale-105'>Post Now</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default PostingBlogs
