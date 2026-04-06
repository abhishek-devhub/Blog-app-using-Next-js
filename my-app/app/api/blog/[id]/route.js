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
        return Response.json({error: "Server Error"}, {status: 500})
    }
}

export async function PATCH(req, {params}){
    try{
        await connectDB()
        const {id} = params
        const body = await req.json()
        
        if (body.action === 'like') {
            const updatedBlog = await BlogPost.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
            return Response.json(updatedBlog)
        } else if (body.action === 'unlike') {
            const updatedBlog = await BlogPost.findByIdAndUpdate(id, { $inc: { likes: -1 } }, { new: true })
            return Response.json(updatedBlog)
        } else if (body.action === 'comment') {
            const updatedBlog = await BlogPost.findByIdAndUpdate(id, { $push: { comments: body.comment } }, { new: true })
            return Response.json(updatedBlog)
        } else {
            return Response.json({error: "Invalid action"}, {status: 400})
        }
    }
    catch(error){
        console.log(error)
        return Response.json({error: "Server Error"}, {status: 500})
    }
}