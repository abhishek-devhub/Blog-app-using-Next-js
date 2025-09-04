import { connectDB } from "@/lib/database";
import registeruser from "@/models/registeruser";

export async function POST(request) {
    try{
        await connectDB();
        const body = await request.json();
        const { username, email, password } = body;
        const newUser = new registeruser({ username, email, password });
        await newUser.save();
        return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 201 });
    }catch(err){
        console.log(err);
        return new Response(JSON.stringify({ error: 'Error registering user' }), { status: 500 });
    }
}

export async function GET(request) {
    try{
        await connectDB();
        const users = await registeruser.find({});
        return new Response(JSON.stringify(users), { status: 200 });
    }catch(err){
        console.log(err);
        return new Response(JSON.stringify({ error: 'Error fetching users' }), { status: 500 });
    }   
}