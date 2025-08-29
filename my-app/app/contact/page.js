"use client"
import React from 'react'
import Image from 'next/image'

const Contact = () => {
  return (
    <div>
     <h1>Get In Touch</h1> 
     <small>we create small startups here you can join us and get to start early than others</small>
        <div className="contact flex justify-around items-center p-2 border-2">
            <div className="left border-red-400">
                <form className='flex flex-col gap-2 w-96 rounded backdrop-blur-lg' action="">
                    <label htmlFor="Name" className='author font-bold'>Name</label>
                    <input type="text" className='bg-white rounded-lg p-2 border-2 border-black' />
                    <label htmlFor="Email" className='author font-bold'>Email</label>
                    <input type="email" className='bg-white rounded-lg p-2 border-2 border-black' />
                    <label htmlFor="Message" className='author font-bold'>Message</label>
                    <textarea name="Message" id="" cols="25" rows="10" className='bg-white rounded-lg p-2 border-2 border-black'></textarea>
                    <button type="submit" className='bg-blue-600 text-white font-bold p-2 rounded-lg hover:bg-blue-700 transition-colors duration-300'>Submit</button>
                </form>
            </div>
            <div className="right">
                <Image src="https://marketplace.canva.com/EAFZ6Dti68w/1/0/800w/canva-blue-modern-contact-us-instagram-post-nV3YWl4UCIM.jpg" alt='conatct' height={400} width={500}className='rounded-lg'></Image>
            </div>
        </div>
    </div>
  )
}

export default Contact
