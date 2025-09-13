import mongoose from "mongoose";        

const BlogPostSchema = new mongoose.Schema({
    Author: {type: String, required: true},   
    Title: {type: String, required: true},
    Content: {type: String, required: true},
    Category: {type: String, required: true},
    image: { type: String, required: true }
})

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);