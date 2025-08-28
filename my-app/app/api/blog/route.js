import BlogPost from '@/models/BlogPost';  
import { connectDB } from '@/lib/database';

export async function POST(req) {
    await connectDB();
    const body = await req.json();
    const { Author, Title, Content, Category } = body;
    const newBlogPost = new BlogPost({ Author, Title, Content, Category });
    await newBlogPost.save();
    return Response.json(newBlogPost);
}   

export async function GET() {
    await connectDB();
    const blogposts = await BlogPost.find();
    return Response.json(blogposts);
}