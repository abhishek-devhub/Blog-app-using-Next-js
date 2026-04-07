"use client";
import React from 'react'
import { useSession, signOut } from 'next-auth/react';
import SplitText from './textanimation';
import Link from 'next/link';
import { useAuth } from '@/app/Context/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session, status } = useSession();
  const { isloggedIn, setIsloggedIn, setUserEmail } = useAuth();
  const router = useRouter();

  const userloggedIn = status === "authenticated" || isloggedIn;

  const handleLogout = async () => {
    try {
      if (isloggedIn) {
        setIsloggedIn(false);
        if (setUserEmail) setUserEmail("");
      }
      if (status === "authenticated") {
        await signOut({ callbackUrl: '/' });
      } else {
        router.push('/');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className=" top-0 inset-x-0 z-50 flex justify-center w-full px-6 py-4 pointer-events-none">
      <nav className="flex justify-between items-center w-full max-w-5xl px-6 py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl bg-white/70 border border-white/40 pointer-events-auto transition-all duration-300">
        <div className="flex items-center gap-3">
          <span className="text-indigo-600 text-3xl shrink-0"><i className="fa-solid fa-blog"></i></span>
          <SplitText text="BlogVerse"
            className="text-2xl font-black tracking-tight text-gray-900 hidden sm:block"
            delay={100}
            duration={1.5}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 10 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center">
          </SplitText>
        </div>
        <ul className="flex items-center gap-6 font-semibold text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-indigo-600 transition-colors duration-200">Home</Link>
          </li>
          <li>
            <Link href="/myblogs" className="hover:text-indigo-600 transition-colors duration-200">MyBlogs</Link>
          </li>
          {userloggedIn && (
            <li>
              <Link href="/favorites" className="hover:text-indigo-600 transition-colors duration-200">Favorites</Link>
            </li>
          )}
          <li>
            <Link href="/contact" className="hover:text-indigo-600 transition-colors duration-200">Contact</Link>
          </li>
          <li className="pl-4 border-l border-gray-200">
            {!userloggedIn ? (
              <Link href="/login" className="px-5 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-indigo-600 hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-indigo-500/20">Login</Link>
            ) : (
              <button onClick={handleLogout} className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 cursor-pointer font-medium border border-transparent hover:border-rose-100">Logout</button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
