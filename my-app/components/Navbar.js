import React from 'react'
import { useAuth } from "@/app/Context/AuthContext";
import SplitText from './textanimation';
import Link from 'next/link';

const Navbar = () => {
    const { isloggedIn } = useAuth();
  return (
    <div className='flex justify-between items-center w-full p-2'>
       <div className='flex items-center gap-3'>
          <span className='log text-blue-600 text-4xl'><i className="fa-solid fa-blog"></i></span>
          <SplitText text="BlogVerse"
            className="text-3xl font-bold font-serif "
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
        <nav>
          <ul className="flex space-x-3.5 font-bold text-[22px]">
             <li>
              <Link href="/myblogs" className='font-serif'>MyBlogs</Link >
            </li>
            <li>
              <Link  href="/contact" className='font-serif'>Contact Us</Link >
            </li>
            <li>
              {!isloggedIn && <Link  href="/login" className='font-serif'>🔒Login</Link >}
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Navbar
