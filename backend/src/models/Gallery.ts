import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  description: string;
  type: 'photo' | 'video';
  images: { url: string; caption: string; uploadedBy: mongoose.Types.ObjectId }[];
  videos: { url: string; title: string; uploadedBy: mongoose.Types.ObjectId }[];
  coverImage: string;
  category: 'event' | 'general' | 'achievement' | 'other';
  uploadedBy: mongoose.Types.ObjectId;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const gallerySchema = new Schema<IGallery>(
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
    type: {
      type: String,
      enum: ['photo', 'video'],
      default: 'photo',
    },
    images: [
      {
        url: { type: String, required: true },
        caption: { type: String, default: '' },
        uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    videos: [
      {
        url: { type: String, required: true },
        title: { type: String, default: '' },
        uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    coverImage: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['event', 'general', 'achievement', 'other'],
      default: 'general',
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Gallery = mongoose.model<IGallery>('Gallery', gallerySchema);
