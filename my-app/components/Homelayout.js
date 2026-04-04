"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from "@/app/Context/AuthContext";
import TextType from './typinganimation';
import Navbar from './Navbar';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Homelayout = () => {
  const [Blogs, setBlogs] = useState([]);
  const { data: session, status } = useSession();
  const { isloggedIn } = useAuth();
  const [liked, setliked] = useState({});
  const [input, setinput] = useState('');

  async function likeCount(blogId) {
    if (liked[blogId]) return;
    setliked(prev => ({
      ...prev,
      [blogId]: true
    }));
    try {
      await fetch(`/api/blog/${blogId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'like' })
      });
      setBlogs(prev => prev.map(b => b._id === blogId ? { ...b, likes: (b.likes || 0) + 1 } : b));
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  }

  const userloggedIn = status === "authenticated" || isloggedIn;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('/api/blog', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const res = await data.json();
        setBlogs(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center justify-center min-h-[70vh]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px]"></div>
          <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px]"></div>
          <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[80px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-gray-200 shadow-sm backdrop-blur-md mb-8 text-sm font-semibold text-gray-700">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Discover the New BlogVerse 2.0
          </div>

          <div className="h-24 md:h-32 mb-6">
            <TextType
              className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight lg:leading-[1.1]"
              text={["Read & write", "deep dive in thoughts", "Welcome to BlogVerse"]}
              typingSpeed={70}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
            />
          </div>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 leading-relaxed font-medium mb-10">
            A premium space where curious minds share knowledge, experiences, and extraordinary stories. Join our global community today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#explore" className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">
              Explore Articles
            </Link>
            {!userloggedIn && (
              <Link href="/Registerpage" className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl shadow-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 w-full sm:w-auto">
                Start Writing <i className="fa-solid fa-arrow-right ml-2 opacity-70"></i>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div id="explore" className="max-w-7xl mx-auto px-6 py-16">
        {!userloggedIn && (
          <div className="flex justify-center mb-16">
            <div className="bg-white/80 backdrop-blur-xl border border-indigo-100/50 p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-4xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-2xl group-hover:scale-110 transition-transform duration-500">
                    <i className="fa-solid fa-lock text-xl transition-all duration-300 group-hover:-translate-y-1"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Premium Articles Locked</h3>
                    <p className="text-gray-500 text-sm font-medium">Log in to discover and read our exclusive content.</p>
                  </div>
                </div>
                <Link href="/login" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-md hover:shadow-indigo-500/30 transition-all duration-300 whitespace-nowrap">
                  Log In Now
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-3xl font-black tracking-tight text-gray-900">Latest Stories</h2>
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-indigo-500 text-gray-400">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <input
              type="text"
              placeholder="Search by category..."
              value={input}
              onChange={(e) => setinput(e.target.value)}
              className="w-full pl-12 pr-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all text-sm font-medium placeholder-gray-400"
            />
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-out ${!userloggedIn ? 'opacity-30 grayscale-[0.8] blur-sm pointer-events-none select-none' : 'opacity-100'}`}>
          {Blogs.filter((blog) => blog?.Category?.toLowerCase().includes(input.toLowerCase())).map((blog, idx) => (
            <div key={blog._id} style={{ animationDelay: `${idx * 100}ms` }} className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                <img src={blog.image || 'https://via.placeholder.com/800x600'} alt={blog.Title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" loading="lazy" />
                <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-bold text-gray-900 shadow-sm uppercase tracking-widest pointer-events-none">
                  {blog.Category || 'General'}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow relative">
                <div className="absolute -top-6 right-6 w-12 h-12 rounded-full bg-white p-1 shadow-md">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {blog.Author ? blog.Author.charAt(0).toUpperCase() : 'B'}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 mt-2">
                  <p className="text-sm font-bold text-indigo-600">{blog.Author || 'Anonymous'}</p>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">5 min read</p>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">{blog.Title}</h3>
                <p className="text-gray-500 mb-8 line-clamp-3 text-sm flex-grow leading-relaxed">{blog.Content?.substring(0, 150)?.replace(/<[^>]*>?/gm, '') || ''}...</p>

                <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100/80">
                  {userloggedIn && (
                    <Link href={`/blog/${blog._id}`} className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      Read Full <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </Link>
                  )}
                  <button onClick={(e) => { e.preventDefault(); likeCount(blog._id); }} className="w-auto px-4 py-2 rounded-full flex items-center justify-center gap-2 cursor-pointer hover:bg-rose-50 transition-colors group/btn">
                    <span className="text-sm font-bold text-gray-400 group-hover/btn:text-rose-500 transition-colors">{blog.likes || 0}</span>
                    <i className={`fa-solid fa-heart transition-all duration-300 ${liked[blog._id] ? "text-rose-500 scale-110" : "text-gray-200 group-hover/btn:text-rose-300"}`}></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {userloggedIn && Blogs.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 text-gray-400 text-3xl mb-4">
                <i className="fa-regular fa-newspaper"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Stories found</h3>
              <p className="text-gray-500">Be the first one to publish a brilliant story!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homelayout;

