import { connectDB } from "@/lib/database";
import bcrypt from "bcrypt";
import RegisterUser from "@/models/registeruser";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await connectDB()
        const users = await RegisterUser.find({})
        return NextResponse.json({users})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        await connectDB()
        const { email, password } = await request.json()

        const user = await RegisterUser.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: 'User Invalid' }, { status: 401 })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Password Incorrect' }, { status: 401 })
        } else {
            return NextResponse.json({ message: 'Login Successful', user: { email: user.email, username: user.username } }, { status: 200 });
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}