import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  title: string;
  description: string;
  fileUrl: string;
  type: 'study_material' | 'exam' | 'guide' | 'link' | 'other';
  subject: string;
  uploadedBy: mongoose.Types.ObjectId;
  downloads: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const resourceSchema = new Schema<IResource>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    fileUrl: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['study_material', 'exam', 'guide', 'link', 'other'],
      default: 'other',
    },
    subject: {
      type: String,
      default: '',
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Resource = mongoose.model<IResource>('Resource', resourceSchema);
