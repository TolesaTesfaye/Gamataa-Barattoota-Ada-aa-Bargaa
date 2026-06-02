import mongoose, { Schema, Document } from 'mongoose';

export interface IOpportunity extends Document {
  title: string;
  description: string;
  type: 'internship' | 'scholarship' | 'job' | 'research' | 'other';
  organization: string;
  location: string;
  eligibility: string;
  applicationDeadline: Date;
  applicationLink: string;
  contactEmail: string;
  postedBy: mongoose.Types.ObjectId;
  status: 'active' | 'expired' | 'filled';
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const opportunitySchema = new Schema<IOpportunity>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['internship', 'scholarship', 'job', 'research', 'other'],
      default: 'other',
    },
    organization: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    eligibility: {
      type: String,
      default: '',
    },
    applicationDeadline: {
      type: Date,
      default: null,
    },
    applicationLink: {
      type: String,
      default: '',
    },
    contactEmail: {
      type: String,
      default: '',
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'filled'],
      default: 'active',
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Opportunity = mongoose.model<IOpportunity>('Opportunity', opportunitySchema);
