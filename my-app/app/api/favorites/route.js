import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Favorite from "@/models/Favorite";

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
        if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
        
        const fav = await Favorite.findOne({ email });
        return NextResponse.json({ blogIds: fav ? fav.blogIds : [] });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const { email, blogId, action } = await req.json();
        if (!email || !blogId) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        
        let fav = await Favorite.findOne({ email });
        if (!fav) {
            fav = new Favorite({ email, blogIds: [] });
        }
        
        if (action === 'like') {
            if (!fav.blogIds.includes(blogId)) fav.blogIds.push(blogId);
        } else if (action === 'unlike') {
            fav.blogIds = fav.blogIds.filter(id => id !== blogId);
        }
        
        await fav.save();
        return NextResponse.json({ blogIds: fav.blogIds });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
