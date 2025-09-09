
import Image from "next/image";
import Homelayout from "@/components/Homelayout";
import PostingBlogs from "@/components/PostingBlogs";


export default function Home() {
  return (
    <div className="bg-green-200">
      <Homelayout/>
      <PostingBlogs/>
    </div>
  );
}