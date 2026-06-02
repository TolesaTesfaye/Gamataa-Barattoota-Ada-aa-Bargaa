import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  member: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  paymentType: 'membership_fee' | 'donation' | 'event_fee' | 'other';
  paymentMethod: 'cash' | 'bank_transfer' | 'mobile_money' | 'credit_card' | 'other';
  transactionId: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  receiptUrl: string;
  notes: string;
  paymentDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    member: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    paymentType: {
      type: String,
      enum: ['membership_fee', 'donation', 'event_fee', 'other'],
      default: 'other',
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'bank_transfer', 'mobile_money', 'credit_card', 'other'],
      default: 'other',
    },
    transactionId: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    receiptUrl: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
