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
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans mt-20">
            <Navbar />
            <main className="flex-grow flex flex-col items-center py-16 px-6 max-w-7xl mx-auto w-full relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

                <div className="w-full text-center max-w-3xl mb-16 relative z-10">
                    <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase mb-3 block">Let's Connect</span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Get In Touch</h1>
                    <p className="text-lg text-gray-500 leading-relaxed font-medium">
                        We create small startups. Here you can join us and get to start earlier than others.
                        <br className="hidden md:block"/> Connect with us to collaborate, share your ideas, or ask any questions. We are always excited to hear from passionate individuals!
                    </p>
                </div>

                <div className="w-full bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col lg:flex-row relative z-10">
                    
                    <div className="w-full lg:w-2/5 bg-gray-900 p-12 lg:p-14 flex flex-col justify-between text-white relative overflow-hidden">
                        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full"></div>
                        <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black mb-6 tracking-tight">Contact Information</h2>
                            <p className="text-gray-400 mb-12 text-lg">Fill up the form and our team will get back to you within 24 hours.</p>
                            
                            <div className="space-y-6 text-base font-medium">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <i className="fa-solid fa-phone text-indigo-400"></i>
                                    </div>
                                    <span>+91 8307302790</span>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <i className="fa-solid fa-envelope text-indigo-400"></i>
                                    </div>
                                    <span>webify.tars@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <i className="fa-solid fa-location-dot text-indigo-400"></i>
                                    </div>
                                    <span>Mumbai | India</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 flex gap-4 mt-16">
                            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-indigo-400 transition-colors"><i className="fa-brands fa-twitter text-xl"></i></a>
                            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-indigo-400 transition-colors"><i className="fa-brands fa-instagram text-xl"></i></a>
                            <a href="https://www.linkedin.com/in/abhishek-s79/" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-indigo-400 transition-colors"><i className="fa-brands fa-linkedin text-xl"></i></a>
                        </div>
                    </div>

                    <div className="w-full lg:w-3/5 p-10 lg:p-16 bg-white">
                        <form className="flex flex-col gap-6" onSubmit={handleChange}>
                            <h2 className="text-2xl font-black text-gray-900 mb-2">Send us a message</h2>
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="Name" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                                <input 
                                    type="text" 
                                    id="Name"
                                    value={Name} 
                                    className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-gray-900 shadow-sm placeholder:text-gray-400" 
                                    placeholder="Jane Doe"
                                    onChange={(e) => setName(e.target.value)} 
                                />
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="Email" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
                                <input 
                                    type="email" 
                                    id="Email"
                                    value={Email} 
                                    className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-gray-900 shadow-sm placeholder:text-gray-400" 
                                    placeholder="jane@example.com"
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="Message" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Your Message</label>
                                <textarea 
                                    name="Message" 
                                    id="Message"
                                    value={Message} 
                                    cols="25" 
                                    rows={5} 
                                    className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-y min-h-[120px] font-medium text-gray-900 shadow-sm placeholder:text-gray-400" 
                                    placeholder="How can we help you?"
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="w-full mt-4 bg-gray-900 text-white font-bold py-4 rounded-xl shadow-[0_4px_14px_0_rgb(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-0.5 hover:bg-gray-800 transition-all duration-300"
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
