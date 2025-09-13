"use client"
import React from 'react'
import { useState, useEffect } from 'react'

const myblogs = () => {
    const [Blogs, setBlogs] = useState([]);
    const [Loading, setLoading] = useState('')

    async function fetchBlogs() {
        try {
            const myblog = await fetch('/api/blog', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const res = await myblog.json()
            setBlogs(res)
            console.log(res);
            if (myblog.ok) {
                setLoading('false')
            }
        } catch (err) {
            console.log(err, "error in fetching blogs");
        }
    }
    useEffect(() => {
        fetchBlogs()
    }, [])

    async function deleteblog(id) {
        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
            const response = await res.json()
            console.log(response);
            fetchBlogs()
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1 className='text-center text-3xl font-bold m-3'>Here are all the Blogs Posted by you !!</h1>
            <div className="allblog grid grid-cols-3 m-3 justify-center">
                {!Loading ? (<div className='text-center text-3xl m-40'>Loading...</div>) :
                    Blogs.length > 0 ? (Blogs.map((blog) => (
                        <div key={blog._id} className="fetchedblogs border-2 m-2 p-2 rounded-lg flex flex-col gap-2 backdrop-blur-lg hover:scale-105 duration-300 transition-transform">
                            <img src={blog.image} alt={blog.Title} width={100} height={100} className='' />
                            <div className="author font-bold">Author Name : {blog.Author}</div>
                            <div className="title ">Title : {blog.Title}</div>
                            <div className="content line-clamp-3">Content : {blog.Content}</div>
                            <div className="category">Category: {blog.Category}</div>
                            <button onClick={() => deleteblog(blog._id)} className='bg-red-500 text-white p-1 rounded-lg cursor-pointer'>Delete</button>
                        </div>
                    ))) : <div>No Blogs Posted yet</div>}

            </div>
        </div>
    )
}

export default myblogs
