"use client"
import React from 'react'
import { useState, useEffect } from 'react'

const myblogs = () => {
    const [Blogs, setBlogs] = useState([{Author:"", Title:"", Content:"", Category:""}]);
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
            if(myblog.ok){
                setLoading('false')
            }
        } catch (err) {
            console.log(err, "error in fetching blogs");
        }
    }
    useEffect(() => {
        fetchBlogs()
    },[])

    return (
        <div>
            <h1 className='text-center text-3xl font-bold m-3'>Here are all the Blogs Posted by you !!</h1>
            <div className="allblog flex flex-wrap m-3 justify-center">
                {Blogs.length > 0 ? Blogs.map((blog) => (
                    <div key={blog._id?.toString()} className="fetchedblogs border-2 w-140  m-2 p-2 rounded-lg flex flex-col gap-2 backdrop-blur-lg">
                        <div className="author">Author Name : {blog.Author}</div>
                        <div className="title">Title : {blog.Title}</div>
                        <div className="content">Content : {blog.Content}</div>
                        <div className="category">Category: {blog.Category}</div>
                    </div>
                )): <div>No Blogs Posted yet</div>}
                {Loading === 'true' && <div>Loading...</div>}
            </div>
        </div>
    )
}

export default myblogs
