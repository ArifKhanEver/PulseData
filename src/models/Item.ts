import mongoose, { Schema, Document } from "mongoose";

export interface IReview {
  userId: string;
  userName: string;
  text: string;
  rating: number;
  createdAt: Date;
}

export interface IItem extends Document {
  title: string;
  description: string;
  fileUrl?: string;
  category: string;
  authorId?: string;
  authorEmail?: string;
  aiResponse?: string;
  reviews: IReview[];
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema({
  userId: { type: String, required: false },
  userName: { type: String, required: false },
  text: { type: String, required: false },
  rating: { type: Number, required: false, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

const ItemSchema: Schema = new Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  fileUrl: { type: String, required: false },
  category: { type: String, default: "General" },
  authorId: { type: String, required: false, default: "anonymous" },
  authorEmail: { type: String, required: false, default: "" },
  aiResponse: { type: String, required: false, default: "" },
  reviews: { type: [ReviewSchema], required: false, default: [] },
}, { timestamps: true, strict: false });

export default mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);
