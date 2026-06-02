import mongoose, { Schema, Document } from 'mongoose';

export interface IMember extends Document {
  userId: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  membershipNumber: string;
  membershipStatus: 'active' | 'inactive' | 'suspended';
  joinDate: Date;
  department: string;
  designation: string;
  bio: string;
  profileImage: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const memberSchema = new Schema<IMember>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    membershipNumber: {
      type: String,
      unique: true,
      required: true,
    },
    membershipStatus: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    department: {
      type: String,
      default: '',
    },
    designation: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    profileImage: {
      type: String,
      default: '',
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Member = mongoose.model<IMember>('Member', memberSchema);
