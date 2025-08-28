
import Image from "next/image";
import Homelayout from "@/components/Homelayout";
import PostingBlogs from "@/components/PostingBlogs";

export default function Home() {
  return (
    <div>
      <Homelayout/>
      <PostingBlogs/>
    </div>
  );
}