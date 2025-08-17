import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-violet-100 min-h-screen w-full p-3">
      <div className="header flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <nav>
          <ul className="flex space-x-3.5 font-serif text-[20px]">
            <li>
              <a href="/" className="home font-serif">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
        </nav>
      </div>
       <div className="main-content text-center mt-15">
          <h1 className="text-4xl font-bold m-1">Welcome to the Blog App</h1>
          <h2 className="text-3xl text-gray-300 font-bold">Unleash Your Thoughts</h2>
          <p className="text-lg mt-2">Explore the latest blogs and articles.</p>
        </div>
        <div className="blogs">
          <h2 className="text-2xl font-bold mt-5">Latest Blogs</h2>
          <div className="blog-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {/* Example blog items */}
            <div className="blog-item p-4 bg-white rounded shadow">
              <h3 className="text-xl font-semibold">Blog Title 1</h3>
              <p className="text-gray-600">This is a brief description of the blog.</p>
            </div>
            <div className="blog-item p-4 bg-white rounded shadow">
              <h3 className="text-xl font-semibold">Blog Title 2</h3>
              <p className="text-gray-600">This is a brief description of the blog.</p>
            </div>
            <div className="blog-item p-4 bg-white rounded shadow">
              <h3 className="text-xl font-semibold">Blog Title 3</h3>
              <p className="text-gray-600">This is a brief description of the blog.</p>
            </div>
          </div>
        </div>
    </div>
  );
}
