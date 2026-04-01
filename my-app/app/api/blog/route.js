import BlogPost from '@/models/BlogPost';
import { connectDB } from '@/lib/database';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { Author, Title, Content, Category, image } = body;

    if (!Author || !Title || !Content || !Category || !image) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newBlogPost = new BlogPost({
      Author,
      Title,
      Content,
      Category,
      image,
    });

    await newBlogPost.save();

    return Response.json(newBlogPost, { status: 201 });
  } catch (error) {
    console.error("Error saving blog:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const blogposts = await BlogPost.find();
    return Response.json(blogposts, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return Response.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
