import ContactUsers from "@/models/ContactUsers";
import { connectDB } from "@/lib/database";

export async function POST(req) {
    await connectDB();
    const body = await req.json()
    const { Name, Email, Message } = body;
    const newContactUser = new ContactUsers({ Name, Email, Message });
    await newContactUser.save();
    return Response.json(newContactUser);
}

export async function GET() {
    await connectDB();
    const contactusers = await ContactUsers.find();
    return Response.json(contactusers);
}