
import BlogPost from "@/models/BlogPost";
import { connectDB } from "@/lib/database";



export async function DELETE(req, {params}) {
    await connectDB();
    const { id } = params
    const deletedBlogPost = await BlogPost.findByIdAndDelete(id);
    return Response.json({ message: 'Blog post deleted', deletedBlogPost });
}