'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setcomment] = useState('');
  const [comments, setcomments] = useState([]);

  async function CommentSection(commentValue) {
    if (commentValue.trim() === '') {
      alert("Comment cannot be empty");
      return;
    }
    setcomments([...comments, commentValue]);
    setcomment('');

    try {
      await fetch(`/api/blog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'comment', comment: commentValue })
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`);
        const data = await res.json();
        setBlog(data);
        if (data.comments) {
          setcomments(data.comments);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
          <div className="w-full h-64 md:h-96 relative bg-gray-100">
            <img
              src={blog.image || 'https://via.placeholder.com/1200x600'}
              alt={blog.Title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-indigo-600 uppercase tracking-wider shadow-sm">
              {blog.Category}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {blog.Title}
            </h1>

            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-gray-100">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                {blog.Author ? blog.Author.charAt(0).toUpperCase() : 'A'}
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{blog.Author || 'Anonymous'}</p>
                <p className="text-sm text-gray-500 font-medium">Author</p>
              </div>
            </div>

            <div className="prose prose-lg prose-indigo max-w-none text-gray-700 leading-loose whitespace-pre-wrap">
              {blog.Content}
            </div>
          </div>
        </article>

        <section className="mt-12 bg-white shadow-lg rounded-3xl p-8 md:p-12 border border-gray-100 mb-12">
          <div className="flex items-center gap-3 mb-8">
            <i className="fa-regular fa-comments text-2xl text-indigo-600"></i>
            <h2 className="text-2xl font-bold text-gray-900">Discussion ({comments.length})</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0 hidden md:flex">
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="relative flex-grow w-full">
              <input
                type="text"
                placeholder="Share your thoughts..."
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              />
            </div>
            <button
              onClick={() => CommentSection(comment)}
              className="w-full md:w-auto cursor-pointer px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 hover:-translate-y-0.5 transition-all outline-none whitespace-nowrap"
            >
              Post Comment
            </button>
          </div>

          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-6 italic">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              comments.map((cmt, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold flex-shrink-0 mt-1">
                    {cmt.charAt(0).toUpperCase()}
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5 flex-grow border border-gray-100">
                    <p className="text-sm font-bold text-gray-900 mb-1">Anonymous User</p>
                    <p className="text-gray-700 leading-relaxed">{cmt}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
