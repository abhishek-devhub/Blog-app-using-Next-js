"use client"
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Contact = () => {
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Message, setMessage] = useState("")
    const Router = useRouter()

    async function handleChange(e) {
        e.preventDefault();
        const contactData = { Name, Email, Message };
        if (!Name || !Email || !Message) {
            alert("Please fill all the fields");
        }
        try {
            const res = await fetch('/api/contact', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactData)
            })
            const data = await res.json();
            console.log("Response: ", data);
            if (res.ok) {
                alert("Message sent successfully!");
                setName("");
                setEmail("");
                setMessage("");
            }
        } catch (err) {
            console.log(err, "Error in submitting the form");
            console.error(err)
        }
    }
    return (
        <div>
            <i className="fa-solid fa-arrow-left m-3 text-2xl cursor-pointer" onClick={()=> Router.push('/')}></i>
            <div className="cont text-center">  <h1 className='text-2xl'>Get In Touch</h1>
                <small>
                    We create small startups. Here you can join us and get to start early than others.
                    <br />
                    Connect with us to collaborate, share your ideas, or ask any questions. We're always excited to hear from passionate individuals!
                </small></div>
            <div className="contact flex justify-around items-center m-2 p-3 flex-col md:flex-row gap-3">
                <div className="left">
                    <Image src="/contact.jpg" height={100} width={500} alt='conatct' className='m-2 rounded-md'></Image>
                </div>
                <div className="right">
                    <form className='flex flex-col gap-3 md:w-105  backdrop-blur-lg' onSubmit={handleChange}>
                        <label htmlFor="Name" className='author font-bold'>Name</label>
                        <input type="text" value={Name} className='bg-white rounded-lg p-1 border-2 border-black' onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="Email" className='author font-bold'>Email</label>
                        <input type="email" value={Email} className='bg-white rounded-lg p-1 border-2 border-black' onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="Message" className='author font-bold'>Message</label>
                        <textarea name="Message" value={Message} id="" cols="25" rows={5} className='bg-white rounded-lg p-1 border-2 border-black' onChange={(e) => setMessage(e.target.value)}></textarea>
                        {<button type="submit" className='bg-blue-600 text-white font-bold p-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer '>Submit</button>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact
