import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  userId?: mongoose.Types.ObjectId;
  name: string;
  field: string;
  year: string;
  village: string;
  school: string;
  phone: string;
  email?: string;
  telegram?: string;
  entry: string;
  role: string;
  message: string;
  bio: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudent>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    field: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    village: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    telegram: {
      type: String,
    },
    entry: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Student = mongoose.model<IStudent>("Student", studentSchema);
