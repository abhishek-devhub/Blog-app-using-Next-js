import { connectDB } from "@/lib/database";
import Registeruser from "@/models/registeruser";

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const { username, email, password } = body;
        
        if (!username || !email || !password) {
            return Response.json({ error: "All fields are required" }, { status: 400 });
        }

        const newUser = new Registeruser({ username, email, password });
        await newUser.save();
        return Response.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (err) {
        console.log("Register Error: ", err);
        if (err.code === 11000) {
            return Response.json({ error: 'Username or Email already exists' }, { status: 400 });
        }
        return Response.json({ error: 'Error registering user', details: err.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await connectDB();
        const users = await Registeruser.find({});
        return Response.json(users, { status: 200 });
    } catch (err) {
        console.log(err);
        return Response.json({ error: 'Error fetching users' }, { status: 500 });
    }   
}