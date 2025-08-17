
import User from '@/models/User';
import { connectDB } from '@/lib/database';

export async function GET() {
  await connectDB();
  const users = await User.find();
  return Response.json(users);
}   


export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { username, password } = body;
  const newUser = new User({ username, password });
  await newUser.save();
  return Response.json(newUser);
}