import mongoose, { Schema, Document as MongoDoc } from 'mongoose';

export interface IDocument extends MongoDoc {
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'pdf' | 'doc' | 'image' | 'spreadsheet' | 'other';
  category: 'constitution' | 'minutes' | 'report' | 'form' | 'academic' | 'other';
  uploadedBy: mongoose.Types.ObjectId;
  accessLevel: 'public' | 'members' | 'admin';
  downloads: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const documentSchema = new Schema<IDocument>(
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
    fileType: {
      type: String,
      enum: ['pdf', 'doc', 'image', 'spreadsheet', 'other'],
      default: 'other',
    },
    category: {
      type: String,
      enum: ['constitution', 'minutes', 'report', 'form', 'academic', 'other'],
      default: 'other',
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accessLevel: {
      type: String,
      enum: ['public', 'members', 'admin'],
      default: 'members',
    },
    downloads: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const DocModel = mongoose.model<IDocument>('Document', documentSchema);
