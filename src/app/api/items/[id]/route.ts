import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Item from "@/models/Item";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const item = await Item.findById(params.id);
    
    if (!item) {
      return NextResponse.json({ status: "error", message: "Item not found" }, { status: 404 });
    }
    
    return NextResponse.json({ status: "success", data: item }, { status: 200 });
  } catch (error) {
    console.error("GET Item Error:", error);
    return NextResponse.json({ status: "error", message: "Failed to fetch item" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const item = await Item.findById(params.id);
    
    if (!item) {
      return NextResponse.json({ status: "error", message: "Item not found" }, { status: 404 });
    }
    
    if (item.authorId !== session.user.id && item.authorEmail !== session.user.email) {
      return NextResponse.json({ status: "error", message: "Forbidden" }, { status: 403 });
    }
    
    const data = await req.json();
    const updated = await Item.findByIdAndUpdate(params.id, data, { new: true });
    
    return NextResponse.json({ status: "success", data: updated }, { status: 200 });
  } catch (error) {
    console.error("PUT Item Error:", error);
    return NextResponse.json({ status: "error", message: "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const item = await Item.findById(params.id);
    
    if (!item) {
      return NextResponse.json({ status: "error", message: "Item not found" }, { status: 404 });
    }
    
    if (item.authorId !== session.user.id && item.authorEmail !== session.user.email) {
      return NextResponse.json({ status: "error", message: "Forbidden" }, { status: 403 });
    }
    
    await Item.findByIdAndDelete(params.id);
    
    return NextResponse.json({ status: "success", message: "Item deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Item Error:", error);
    return NextResponse.json({ status: "error", message: "Failed to delete item" }, { status: 500 });
  }
}
