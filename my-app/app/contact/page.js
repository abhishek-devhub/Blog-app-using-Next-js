"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Message, setMessage] = useState("");
    const Router = useRouter();

    async function handleChange(e) {
        e.preventDefault();
        const contactData = { Name, Email, Message };
        if (!Name || !Email || !Message) {
            alert("Please fill all the fields");
            return;
        }
        try {
            const res = await fetch('/api/contact', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactData)
            });
            const data = await res.json();
            if (res.ok) {
                alert("Message sent successfully!");
                setName("");
                setEmail("");
                setMessage("");
            }
        } catch (err) {
            console.error("Error in submitting the form", err);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow flex flex-col items-center py-16 px-6 max-w-7xl mx-auto w-full">
                
                <div className="w-full flex items-center mb-8">
                    <button 
                        onClick={() => Router.push('/')}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors bg-indigo-50 px-4 py-2 rounded-full"
                    >
                        <i className="fa-solid fa-arrow-left"></i> Back to Home
                    </button>
                </div>

                <div className="w-full text-center max-w-3xl mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Get In Touch</h1>
                    <p className="text-lg text-gray-600 leading-relaxed font-medium">
                        We create small startups. Here you can join us and get to start earlier than others.
                        <br className="hidden md:block"/> Connect with us to collaborate, share your ideas, or ask any questions. We are always excited to hear from passionate individuals!
                    </p>
                </div>

                <div className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
                    
                    <div className="w-full lg:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 p-12 flex flex-col justify-between text-white relative overflow-hidden">
                        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-white/10 blur-3xl rounded-full"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                            <p className="text-indigo-100 mb-10 text-lg">Fill up the form and our team will get back to you within 24 hours.</p>
                            
                            <div className="space-y-6 text-lg">
                                <div className="flex items-center gap-4">
                                    <i className="fa-solid fa-phone text-indigo-200 text-xl"></i>
                                    <span>+91 8307302790</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <i className="fa-solid fa-envelope text-indigo-200 text-xl"></i>
                                    <span>webify.tars@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <i className="fa-solid fa-location-dot text-indigo-200 text-xl"></i>
                                    <span>Mumbai | India</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 flex gap-4 mt-12">
                            <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><i className="fa-brands fa-twitter text-xl"></i></a>
                            <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><i className="fa-brands fa-instagram text-xl"></i></a>
                            <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><i className="fa-brands fa-linkedin text-xl"></i></a>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 p-12 lg:p-16 bg-white">
                        <form className="flex flex-col gap-6" onSubmit={handleChange}>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="Name" className="font-bold text-sm text-gray-700 ml-1">Full Name</label>
                                <input 
                                    type="text" 
                                    id="Name"
                                    value={Name} 
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" 
                                    placeholder="Jane Doe"
                                    onChange={(e) => setName(e.target.value)} 
                                />
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="Email" className="font-bold text-sm text-gray-700 ml-1">Email Address</label>
                                <input 
                                    type="email" 
                                    id="Email"
                                    value={Email} 
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" 
                                    placeholder="jane@example.com"
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="Message" className="font-bold text-sm text-gray-700 ml-1">Your Message</label>
                                <textarea 
                                    name="Message" 
                                    id="Message"
                                    value={Message} 
                                    cols="25" 
                                    rows={5} 
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none font-medium" 
                                    placeholder="How can we help you?"
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="w-full mt-4 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
