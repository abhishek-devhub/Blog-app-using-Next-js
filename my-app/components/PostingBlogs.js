"use client"
import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/app/Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const PostingBlogs = () => {
  const [Author, setAuthor] = useState('');
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [Category, setCategory] = useState('Technology');

  const isloggedIn = useAuth()

  async function handlesubmit(e) {
    e.preventDefault();
    if(!isloggedIn){
      toast.error("Please login to post a blog");
      return;
    }
    const blogData = { Author, Title, Content, Category };
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData)
      })
      const data = await res.json()
      console.log("Response: ", data);
      
      if (res.ok) {
        toast.success("Blog posted successfully!");
        setAuthor('');
        setTitle('');
        setContent('');
        setCategory('Technology');
      }
    } catch (err) {
      console.log(err, "error in posting blog");
    }
    if(!Author || !Title || !Content){
      toast.error("Please fill all the fields");
      return;
    }

    // console.log(blogData);
  }

  return (
    <div>
      <h1 className='posts text-center text-violet-950 text-5xl font-bold m-4'>Posts your own Blogs Now Free</h1>
      <div className="both flex justify-around items-center p-2 gap-3">
        <div className="left">
          <Image src="https://img.freepik.com/vector-premium/vector-concepto-blogs_269504-2043.jpg?w=2000" alt='blogingapp' className='rounded-lg hover:scale-101 transition-transform duration-300' height={500} width={570}></Image>
        </div>
        <div className='right rounded backdrop-blur-lg w-150 p-3 '>
          <form className='flex flex-col gap-3' onSubmit={handlesubmit}>
            {/* Author */}
            <label htmlFor="Name" className='author font-bold'>Author Name</label>
            <input type="text" value={Author} className='bg-white rounded-lg p-2 border-2 border-black' onChange={(e) => { setAuthor(e.target.value) }} />
            {/* Title */}
            <label htmlFor="Title" className='font-bold'>Blog Title</label>
            <input type="text" value={Title} className='bg-white rounded-lg p-2 border-2 border-black' onChange={(e) => { setTitle(e.target.value) }} />
            {/* Content */}
            <label htmlFor="Content" className='font-bold' >Blog Content</label>
            <textarea className='border-gray-400 border-2 bg-white' name="Content" id="" cols="30" rows="10" value={Content} onChange={(e) => { setContent(e.target.value) }}></textarea>
            {/* Category */}
            <label htmlFor="category" className='font-bold'>Category : <span>
              <select name="category" value={Category} onChange={(e) => { setCategory(e.target.value) }} id="">
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
            {/* Submit Button */}
            {<button type='submit' className='postbtn flex p-2 text-2xl font-bold text-green-950 border-2 w-[130px] bg-violet-300 rounded-lg hover:backdrop-blur-lg cursor-pointer transition-transform duration-300 hover:scale-105'>Post Now</button>}
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"/>
    </div>

  )
}

export default PostingBlogs
