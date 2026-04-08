"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/app/Context/AuthContext';
import { useSession } from 'next-auth/react';

const MyBlogs = () => {
    const [Blogs, setBlogs] = useState([]);
    const [Loading, setLoading] = useState(true);
    const Router = useRouter();
    const { isloggedIn, isAuthLoaded } = useAuth();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (isAuthLoaded && status !== 'loading') {
            if (!isloggedIn && status === 'unauthenticated') {
                Router.push('/login');
            }
        }
    }, [isloggedIn, status, Router, isAuthLoaded]);

    async function fetchBlogs() {
        try {
            const myblog = await fetch('/api/blog', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const contentType = myblog.headers.get("content-type");
            if (contentType && contentType.includes("text/html")) {
                Router.push('/login');
                return;
            }
            const res = await myblog.json();
            setBlogs(res);
            if (myblog.ok) {
                setLoading(false);
            }
        } catch (err) {
            console.error("Error in fetching blogs:", err);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    async function deleteblog(id) {
        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            await res.json();
            fetchBlogs();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-12">
                <div className="flex items-center gap-4 mb-12">
                    <button
                        onClick={() => Router.push('/')}
                        className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-colors border border-gray-100"
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Your Published Stories</h1>
                </div>

                {Loading ? (
                    <div className="flex justify-center items-center py-32">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : Blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-out">
                        {Blogs.map((blog, idx) => (
                            <div key={blog._id} style={{ animationDelay: `${idx * 100}ms` }} className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col relative">

                                <button
                                    onClick={() => deleteblog(blog._id)}
                                    className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-sm flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                                    title="Delete Blog"
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>

                                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                                    <img
                                        src={blog.image || 'https://via.placeholder.com/800x600'}
                                        alt={blog.Title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                    <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-bold text-gray-900 shadow-sm uppercase tracking-widest pointer-events-none">
                                        {blog.Category || 'General'}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 mb-4 mt-2">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">5 min read</p>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">{blog.Title}</h3>
                                    <p className="text-gray-500 mb-8 line-clamp-3 text-sm flex-grow leading-relaxed">{blog.Content?.replace(/<[^>]*>?/gm, '') || ''}</p>
                                    <div className="mt-auto pt-5 border-t border-gray-100/80 text-center">
                                        <Link href={`/blog/${blog._id}`} className="inline-flex items-center justify-center w-full py-3 bg-gray-50/80 text-gray-900 font-bold rounded-xl hover:bg-gray-900 hover:text-white transition-colors gap-2">
                                            Read Full Article <i className="fa-solid fa-arrow-right text-sm"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 max-w-2xl mx-auto mt-12">
                        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-300 mx-auto mb-6">
                            <i className="fa-regular fa-pen-to-square text-4xl"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Blogs Posted Yet</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven&apos;t published any stories yet. Share your knowledge and ideas with the world.</p>
                        <Link href="/" className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-full hover:bg-indigo-700 hover:shadow-lg transition-all">
                            Write a Post <i className="fa-solid fa-plus"></i>
                        </Link>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default MyBlogs;
