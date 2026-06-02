import mongoose, { Schema, Document } from 'mongoose';

export interface IAlumni extends Document {
  user: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  graduationYear: number;
  department: string;
  currentPosition: string;
  company: string;
  location: string;
  bio: string;
  profileImage: string;
  linkedin: string;
  isMentor: boolean;
  mentorshipAreas: string[];
  isSuccessStory: boolean;
  successStory: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const alumniSchema = new Schema<IAlumni>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
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
      default: '',
    },
    graduationYear: {
      type: Number,
      default: null,
    },
    department: {
      type: String,
      default: '',
    },
    currentPosition: {
      type: String,
      default: '',
    },
    company: {
      type: String,
      default: '',
    },
    location: {
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
    linkedin: {
      type: String,
      default: '',
    },
    isMentor: {
      type: Boolean,
      default: false,
    },
    mentorshipAreas: {
      type: [String],
      default: [],
    },
    isSuccessStory: {
      type: Boolean,
      default: false,
    },
    successStory: {
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

export const Alumni = mongoose.model<IAlumni>('Alumni', alumniSchema);
