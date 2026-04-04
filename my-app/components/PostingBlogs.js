"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const PostingBlogs = () => {
  const [Author, setAuthor] = useState('');
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [Category, setCategory] = useState('Technology');
  const [image, setImage] = useState(null);

  const { isloggedIn } = useAuth();

  async function handlesubmit(e) {
    e.preventDefault();

    if (!isloggedIn) {
      toast.error("Please login to post a blog");
      return;
    }

    if (!Author || !Title || !Content || !image) {
      toast.error("Please fill all the fields including image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "blog_preset");

      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/docjjea7i/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryData = await cloudinaryRes.json();

      if (!cloudinaryRes.ok) {
        toast.error("Image upload failed!");
        return;
      }
      const imageUrl = cloudinaryData.secure_url;
      const blogData = { Author, Title, Content, Category, image: imageUrl };
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textError = await res.text();
        console.error("Received HTML instead of JSON:", textError);
        toast.error("Server returned an invalid response.");
        return;
      }

      if (res.ok) {
        toast.success("Blog posted successfully!");
        setImage(null);
        setAuthor("");
        setTitle("");
        setContent("");
        setCategory("Technology");
      }
    } catch (err) {
      toast.error("Something went wrong while posting!");
    }
  }

  return (
    <div className="w-full bg-[#f8fafc] py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase mb-3 block">Share Your Voice</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Post Your Blog Now !!</h2>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">Publish your ideas globally. Our premium editor is designed to make your words shine without the friction.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 bg-white rounded-[2.5rem] p-6 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg aspect-square rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-700 ease-out group">
              <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <Image
                src="https://img.freepik.com/vector-premium/vector-concepto-blogs_269504-2043.jpg?w=2000"
                alt="blogging illustration"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-[0_0_40px_rgb(0,0,0,0.03)] border border-gray-50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

              <form className="flex flex-col gap-6" onSubmit={handlesubmit}>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Cover Image</label>
                  <div className="relative w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors group overflow-hidden"
                    onClick={() => document.getElementById("imageUpload").click()}>

                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400 group-hover:text-indigo-500 transition-colors">
                        <i className="fa-solid fa-cloud-arrow-up text-3xl mb-2"></i>
                        <span className="text-sm font-medium">Click to upload image</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="Name" className="text-sm font-bold text-gray-700 ml-1">Author Name</label>
                    <input
                      type="text"
                      id="Name"
                      value={Author}
                      placeholder="Jane Doe"
                      className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-gray-900 placeholder:text-gray-400"
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="category" className="text-sm font-bold text-gray-700 ml-1">Category</label>
                    <div className="relative">
                      <select
                        name="category"
                        id="category"
                        value={Category}
                        className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer appearance-none font-medium text-gray-900"
                        onChange={(e) => setCategory(e.target.value)}
                      >
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
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                        <i className="fa-solid fa-chevron-down text-sm"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="Title" className="text-sm font-bold text-gray-700 ml-1">Blog Title</label>
                  <input
                    type="text"
                    id="Title"
                    value={Title}
                    placeholder="Enter an engaging, click-worthy title..."
                    className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-gray-900 placeholder:text-gray-400"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="Content" className="text-sm font-bold text-gray-700 ml-1">Blog Content</label>
                  <textarea
                    id="Content"
                    className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-y min-h-[160px] font-medium text-gray-900 placeholder:text-gray-400 leading-relaxed"
                    name="Content"
                    placeholder="Write your amazing story here. Share your unique perspective."
                    value={Content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl cursor-pointer shadow-[0_4px_14px_0_rgb(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-0.5 hover:bg-gray-800 transition-all duration-300 mt-4 flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-paper-plane"></i> Publish Story
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
};

export default PostingBlogs;
