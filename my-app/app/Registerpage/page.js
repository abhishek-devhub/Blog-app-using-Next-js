"use client"
import React from 'react'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

const Registerpage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function authenticateUser() {
        signIn('github', { callbackUrl: "/" });
    }

const handleRegister = async (e) => {
  e.preventDefault();

  if (!username || !email || !password) {
    alert("Please fill all the fields");
    return;
  }

  try {
    const res = await fetch("/api/registeruser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message || "User registered successfully ✅");
      setUsername("");
      setEmail("");
      setPassword("");
    } else {
      alert(data.error || "Error registering user ❌");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error ❌");
  }
};

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
            <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>

                <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                         
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition duration-300"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account? <a href="/login" className="text-indigo-600 font-semibold hover:underline">Login</a>
                </p>
                <div className="provider">
                    <button onClick={()=> authenticateUser()} className="w-full py-2 mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2 cursor-pointer">
                        <i className="fa-brands fa-github"></i> Continue with GitHub
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Registerpage
