import mongoose from "mongoose";

export async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongo db connected !")
    }catch(err){
        console.err(err.message)
    }
}