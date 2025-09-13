import BlogPost from '@/models/BlogPost';
import { connectDB } from '@/lib/database';
import Cloudinary from '@/lib/Cloudinary'

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { Author, Title, Content, Category, image } = body;

        let imageUrl = "";
        if (image) {
            const uploadRes = await cloudinary.uploader.upload(image, {
                folder: "blogs",
            });
            imageUrl = uploadRes.secure_url;
        }
        const newBlogPost = new BlogPost({
            Author,
            Title,
            Content,
            Category,
            image: imageUrl, // ✅ only URL saved
        });

        await newBlogPost.save();
        return Response.json(newBlogPost);
    } catch (error) {
         console.error(err);
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function GET() {
    await connectDB();
    const blogposts = await BlogPost.find();
    return Response.json(blogposts);
}