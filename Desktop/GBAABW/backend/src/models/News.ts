import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  image: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  isPublic: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new Schema<INews>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['announcement', 'article', 'blog', 'update', 'other'],
      default: 'article',
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const News = mongoose.model<INews>('News', newsSchema);
