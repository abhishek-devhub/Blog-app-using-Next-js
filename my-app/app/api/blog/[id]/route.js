
import BlogPost from "@/models/BlogPost";
import { connectDB } from "@/lib/database";

export async function GET(req,{params}){
    await connectDB();
    const {id} = await params;
    const blog = await BlogPost.findById(id);
    return Response.json(blog);
}

export async function DELETE(req , {params}){
    try{
        await connectDB()
        const {id} = params
        const deleteblog = await BlogPost.findByIdAndDelete(id)
        return Response.json(deleteblog)
    }
    catch(error){
        console.log(error)
    }
    
}