import { connectDB } from "@/lib/database";
import BlogPost from "@/models/BlogPost";

export default async function BlogDetail({ params }) {
  await connectDB();
  const blog = await BlogPost.findById(params.id);

  if (!blog) {
    return <div className="p-6 text-red-500">Blog not found</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{blog.Title}</h1>
      <p className="text-gray-600 mb-2">By {blog.Author}</p>
      <p className="text-sm text-gray-500 mb-6">Category: {blog.Category}</p>
      <div className="text-lg leading-relaxed">{blog.Content}</div>
    </div>
  );
}
