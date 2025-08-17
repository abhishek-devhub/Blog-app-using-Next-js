import mongoose from 'mongoose';

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        // Optionally, you can set mongoose options here
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
}
export { connectDB };