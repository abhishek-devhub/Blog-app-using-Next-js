
import Image from "next/image";
import Homelayout from "@/components/Homelayout";
import PostingBlogs from "@/components/PostingBlogs";
import Iridescence from "@/components/background";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Iridescence
        color={[0.9, 0.94, 0.98]}
        mouseReact={true}
        amplitude={0.1}
        speed={1.0}
        className="absolute inset-0 -z-10"
      />
      <Homelayout/>
      <PostingBlogs/>
    </div>
  );
}