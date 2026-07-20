import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Item from "@/models/Item";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const authorEmail = req.nextUrl.searchParams.get("authorEmail");
    const filter = authorEmail ? { authorEmail } : {};
    
    const items = await Item.find(filter).sort({ createdAt: -1 });
    const safeItems = items.map(item => ({ ...item.toObject(), reviews: item.reviews || [] }));
    
    return NextResponse.json({
      success: true,
      data: safeItems
    }, { status: 200 });
  } catch (error) {
    console.error("GET Items Error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    
    const newItem = await Item.create({
      title: body.title,
      description: body.description,
      category: body.category,
      aiResponse: body.aiResponse,
      authorId: session.user.id || "anonymous",
      authorEmail: body.authorEmail || session.user.email || "",
    });
    
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    console.error("POST Item Error:", error);
    return NextResponse.json({ success: false, message: "Failed to create item" }, { status: 500 });
  }
}
