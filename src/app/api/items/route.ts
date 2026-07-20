import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Item from "@/models/Item"; 

export const dynamic = "force-dynamic"; // CRITICAL: STOPS VERCEL CACHING

export async function GET(req: Request) {
  try {
    const uri = (process.env.MONGO_URI || process.env.MONGODB_URI) as string;
    if (mongoose.connection.readyState === 0) await mongoose.connect(uri);
    const { searchParams } = new URL(req.url);
    const authorEmail = searchParams.get("authorEmail");
    const filter = authorEmail ? { authorEmail } : {};
    const items = await Item.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (e: any) { 
    return NextResponse.json({ error: e.message }, { status: 500 }); 
  }
}

export async function POST(req: Request) {
  try {
    const uri = (process.env.MONGO_URI || process.env.MONGODB_URI) as string;
    if (mongoose.connection.readyState === 0) await mongoose.connect(uri);
    const body = await req.json();
    const newItem = await Item.create(body);
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (e: any) { 
    return NextResponse.json({ error: e.message }, { status: 500 }); 
  }
}
