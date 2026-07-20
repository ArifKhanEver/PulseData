import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Item from "@/models/Item";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const authorEmail = searchParams.get("authorEmail");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const skip = (page - 1) * limit;
    
    let query = {};
    if (authorEmail) {
      query = { authorEmail };
    }
    
    const [items, total] = await Promise.all([
      Item.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Item.countDocuments(query)
    ]);
    
    return NextResponse.json({
      status: "success",
      data: items,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    }, { status: 200 });
  } catch (error) {
    console.error("GET Items Error:", error);
    return NextResponse.json({ status: "error", message: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await req.json();
    
    const newItem = new Item({
      ...data,
      authorId: session.user.id || "anonymous",
      authorEmail: session.user.email || "",
    });
    
    await newItem.save();
    
    return NextResponse.json({ status: "success", data: newItem }, { status: 201 });
  } catch (error) {
    console.error("POST Item Error:", error);
    return NextResponse.json({ status: "error", message: "Failed to create item" }, { status: 500 });
  }
}
