import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
    <div>
      <h2 className="text-xl font-bold text-white mb-4">About Us</h2>
      <p className="text-gray-400 text-sm leading-relaxed">
        We are a blogging platform where writers share knowledge, ideas, and creativity with the world. 
        Join us to explore trending topics and express your thoughts freely.
      </p>
    </div>
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
      <ul className="space-y-2 text-sm">
        <li><a href="/" className="hover:text-white transition"><i className="fa-solid fa-house mr-2"></i> Home</a></li>
        <li><a href="/blogs" className="hover:text-white transition"><i className="fa-solid fa-blog mr-2"></i> Blogs</a></li>
        <li><a href="/" className="hover:text-white transition"><i className="fa-solid fa-user mr-2"></i> About</a></li>
        <li><a href="/contact" className="hover:text-white transition"><i className="fa-solid fa-envelope mr-2"></i> Contact</a></li>
      </ul>
    </div>
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Contact</h2>
      <ul className="space-y-2 text-sm">
        <li><i className="fa-solid fa-location-dot mr-2"></i> Mumbai, India</li>
        <li><i className="fa-solid fa-phone mr-2"></i> +91 98765 43210</li>
        <li><i className="fa-solid fa-envelope mr-2"></i> support@blogapp.com</li>
      </ul>
    </div>
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
      <div className="flex space-x-4 text-lg">
        <a href="#" className="hover:text-white transition"><i className="fa-brands fa-facebook"></i></a>
        <a href="#" className="hover:text-white transition"><i className="fa-brands fa-twitter"></i></a>
        <a href="#" className="hover:text-white transition"><i className="fa-brands fa-instagram"></i></a>
        <a href="#" className="hover:text-white transition"><i className="fa-brands fa-linkedin"></i></a>
        <a href="#" className="hover:text-white transition"><i className="fa-brands fa-github"></i></a>
      </div>
    </div>
  </div>
  <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} BlogApp. All rights reserved.
  </div>
</footer>
    </div>
  )
}

export default Footer
