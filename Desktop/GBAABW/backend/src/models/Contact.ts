import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'general' | 'feedback' | 'suggestion' | 'support' | 'other';
  status: 'new' | 'read' | 'replied' | 'closed';
  repliedBy: mongoose.Types.ObjectId;
  reply: string;
  repliedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    subject: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['general', 'feedback', 'suggestion', 'support', 'other'],
      default: 'general',
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'closed'],
      default: 'new',
    },
    repliedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    reply: {
      type: String,
      default: '',
    },
    repliedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model<IContact>('Contact', contactSchema);
