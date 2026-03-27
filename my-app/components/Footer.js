import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mx-auto w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-indigo-600 text-2xl"><i className="fa-solid fa-blog"></i></span>
            <h2 className="text-xl font-black tracking-tight text-gray-900">BlogVerse</h2>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            A premium blogging platform where modern creators share knowledge, ideas, and creativity with the world. Join our community today.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><a href="/" className="hover:text-indigo-600 transition-colors"><i className="fa-solid fa-house w-5"></i> Home</a></li>
            <li><a href="/myblogs" className="hover:text-indigo-600 transition-colors"><i className="fa-solid fa-blog w-5"></i> Blogs</a></li>
            <li><a href="/contact" className="hover:text-indigo-600 transition-colors"><i className="fa-solid fa-envelope w-5"></i> Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><i className="fa-solid fa-location-dot w-5"></i> Mumbai | India</li>
            <li><i className="fa-solid fa-phone w-5"></i>+91 8307302790</li>
            <li><i className="fa-solid fa-envelope w-5"></i>webify.tars@gmail.com</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/in/abhishek-s79/" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all"><i className="fa-brands fa-linkedin text-lg"></i></a>
            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all"><i className="fa-brands fa-twitter text-lg"></i></a>
            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all"><i className="fa-brands fa-instagram text-lg"></i></a>
            <a href="https://github.com/abhishek-devhub" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all"><i className="fa-brands fa-github text-lg"></i></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} BlogVerse Inc. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
