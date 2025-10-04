import { connectDB } from "@/lib/database";
import bcrypt from "bcrypt";
import RegisterUser from "@/models/registeruser";

export async function GET(){
    try {
        await connectDB()
        const users = await RegisterUser.find({})
        return Response.json({users})
    } catch (error) {
        console.log(error)
    }
}

export async function POST(request) {
    try {
        await connectDB()
        const { email, password } = await request.json()

        const user = await RegisterUser.findOne({ email })
        if (!user) {
            return Response.json('User Invalid')
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return Response.json('Password Incorrect')
        } else {
            return Response.json('Login Successful')
        }

    } catch (error) {
        console.log(error)
    }
}