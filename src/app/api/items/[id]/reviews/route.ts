import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Item from "@/models/Item";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    const { text, rating, userName, userId } = data;
    
    if (!text || !rating) {
      return NextResponse.json({ status: "error", message: "Review text and rating are required." }, { status: 400 });
    }

    const newReview = {
      userId: userId || "anonymous",
      userName: userName || "Anonymous",
      text,
      rating: Number(rating),
      createdAt: new Date(),
    };
    
    const updatedItem = await Item.findByIdAndUpdate(
      params.id,
      { $push: { reviews: newReview } },
      { new: true }
    );
    
    if (!updatedItem) {
      return NextResponse.json({ status: "error", message: "Item not found" }, { status: 404 });
    }
    
    return NextResponse.json({ status: "success", data: updatedItem }, { status: 201 });
  } catch (error) {
    console.error("POST Review Error:", error);
    return NextResponse.json({ status: "error", message: "Failed to add review" }, { status: 500 });
  }
}
