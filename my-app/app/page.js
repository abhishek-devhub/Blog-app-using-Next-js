
import Image from "next/image";
import Homelayout from "@/components/Homelayout";
import PostingBlogs from "@/components/PostingBlogs";
import Footer from "@/app/blog/[id]/Footer";


export default function Home() {
  return (
    <div className="bg-blue-50">
      <Homelayout/>
      <PostingBlogs/>
      <Footer/>
    </div>
  );
}