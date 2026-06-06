import mongoose, { Schema, Document } from "mongoose";

export interface IMember {
  name: string;
  field: string;
  year: string;
  phone: string;
  campus: string;
  village: string;
  entry: string;
  school: string;
}

export interface ICommittee extends Document {
  name: string;
  head: string;
  description: string;
  color: string;
  members: IMember[];
  academicYear: string;
  createdAt: Date;
  updatedAt: Date;
}

const memberSchema = new Schema<IMember>(
  {
    name: { type: String, required: true },
    field: { type: String, default: "" },
    year: { type: String, default: "" },
    phone: { type: String, default: "" },
    campus: { type: String, default: "" },
    village: { type: String, default: "" },
    entry: { type: String, default: "" },
    school: { type: String, default: "" },
  },
  { _id: false },
);

const committeeSchema = new Schema<ICommittee>(
  {
    name: { type: String, required: true },
    head: { type: String, default: "" },
    description: { type: String, default: "" },
    color: { type: String, default: "blue" },
    members: [memberSchema],
    academicYear: { type: String, default: "2017" },
  },
  { timestamps: true },
);

export const Committee = mongoose.model<ICommittee>(
  "Committee",
  committeeSchema,
);
