import React from 'react'
import { useSession } from 'next-auth/react';
import SplitText from './textanimation';
import Link from 'next/link';
import { useAuth } from '@/app/Context/AuthContext';

const Navbar = () => {
  const {data: session , status} = useSession();
  const { isloggedIn } = useAuth();

  const userloggedIn = status === "authenticated" || isloggedIn;

  return (
    <div className='flex justify-between items-center w-full p-2 shadow-md bg-gray-900 text-white'>
       <div className='flex items-center gap-3'>
          <span className='log text-green-300 text-3xl m-1'><i className="fa-solid fa-blog"></i></span>
          <SplitText text="BlogVerse"
            className="text-3xl font-bold font-mono "
            delay={100}
            duration={1.5}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center">
          </SplitText>
        </div>
        <nav className='navbar'>
          <ul className="flex gap-2 font-bold text-lg ">
            <li>
              <Link href="/" className='font-mono hover:underline hover:bg-yellow-100 rounded-2xl p-2 hover:text-black '>Home</Link >
            </li>
             <li>
              <Link href="/myblogs" className='font-mono hover:underline  hover:bg-yellow-100 rounded-2xl p-2 hover:text-black '>MyBlogs</Link >
            </li>
            <li>
              <Link  href="/contact" className='font-mono hover:underline  hover:bg-yellow-100 rounded-2xl p-2 hover:text-black '>ContactUs</Link >
            </li>
            <li>
              {!userloggedIn && <Link  href="/login" className='font-mono hover:underline  hover:bg-yellow-100 rounded-2xl p-2 hover:text-black '>Login</Link >}
            </li>
            <li>
              {userloggedIn && <Link  href="/api/auth/signout" className='font-mono hover:underline  hover:bg-yellow-100 rounded-2xl p-2 hover:text-black '>Logout</Link >}
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Navbar
