
import Image from "next/image";
import Homelayout from "@/components/Homelayout";
import PostingBlogs from "@/components/PostingBlogs";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="bg-green-200">
      <Homelayout/>
      <PostingBlogs/>
      <Footer/>
    </div>
  );
}