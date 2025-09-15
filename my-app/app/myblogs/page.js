"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const myblogs = () => {
    const [Blogs, setBlogs] = useState([]);
    const [Loading, setLoading] = useState('')
    const Router = useRouter()

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
            <i className="fa-solid fa-arrow-left m-3 text-2xl cursor-pointer" onClick={() => Router.push('/')}></i>
            <h1 className='text-center text-3xl font-bold m-3'>Here are all the Blogs Posted by you !!</h1>
            <div className="allblog grid grid-cols-1 m-3 sm:grid-cols-2 lg:grid-cols-3">
                {!Loading ? (<div className='text-center text-3xl w-full m-50 ml-100'>Loading...</div>) :
                    Blogs.length > 0 ? (Blogs.map((blog) => (
                        <div key={blog._id} className="fetchedblogs shadow-lg m-2 p-4 rounded-lg flex flex-col gap-2 backdrop-blur-lg hover:scale-105 duration-300 transition-transform">
                            <img src={blog.image} alt={blog.Title} width={100} height={100} className='h-48 object-cover w-full' />
                            <div className="author font-bold">Author Name : {blog.Author}</div>
                            <div className="title ">Title : {blog.Title}</div>
                            <div className="content line-clamp-3">Content : {blog.Content}</div>
                            <div className="category">Category: {blog.Category}</div>
                            <button onClick={() => deleteblog(blog._id)} className='bg-red-500 text-white p-1 rounded-lg cursor-pointer'>Delete</button>
                            <Link href={`blog/${blog._id}`} className='blog text-blue-500 hover:underline '>View Blog</Link>
                        </div>
                    ))) : <div>No Blogs Posted yet</div>}

            </div>
        </div>
    )
}

export default myblogs
