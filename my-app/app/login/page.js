"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import Link from 'next/link';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setopeneye] = useState(false);
  const router = useRouter();
  const { setIsloggedIn } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password })
      });
      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const textError = await res.text();
        console.error("Received HTML instead of JSON:", textError);
        alert("Server returned an invalid response. Please try again.");
        return;
      }

      if (res.status === 200) {
        setIsloggedIn(true);
        router.push('/');
      } else {
        alert(data.error || "Invalid Credentials");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-6 relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="absolute top-8 left-8 z-20">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-semibold transition-colors bg-white/50 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </Link>
      </div>

      <div className="w-full max-w-[420px] bg-white p-10 sm:p-12 rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-100 relative z-10 flex flex-col pt-14">
        <div className="absolute -top-12 inset-x-0 flex justify-center">
          <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-50">
            <div className="w-full h-full bg-indigo-50 rounded-[1.2rem] flex items-center justify-center">
              <i className="fa-solid fa-blog text-3xl text-indigo-600"></i>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-10 w-full flex flex-col items-center">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 mt-2 font-medium text-sm">Log in to BlogVerse to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div className="space-y-2">
            <label htmlFor="username" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fa-solid fa-envelope text-gray-400"></i>
              </div>
              <input 
                type="email" 
                id="username" 
                name="username" 
                placeholder="you@example.com" 
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-gray-900 shadow-sm placeholder:text-gray-400" 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fa-solid fa-lock text-gray-400"></i>
              </div>
              <input 
                type={eye ? "text" : "password"} 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                className="w-full pl-12 pr-12 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-gray-900 shadow-sm placeholder:text-gray-400" 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button 
                type="button" 
                onClick={() => setopeneye(!eye)} 
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-600 transition-colors focus:outline-none"
              >
                <i className={`fa-solid ${eye ? "fa-eye" : "fa-eye-slash"}`}></i>
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-[0_4px_14px_0_rgb(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-0.5 hover:bg-gray-800 transition-all duration-300 mt-2"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-gray-500 w-full pt-6 border-t border-gray-100">
          Don&apos;t have an account? 
          <Link href="/Registerpage" className="text-indigo-600 hover:text-indigo-800 font-bold ml-1 transition-colors">
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
