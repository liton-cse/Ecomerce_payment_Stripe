// order.model.ts
import mongoose, { Schema, Document } from 'mongoose';
export interface IOrder extends Document {
  orderId: number; // sequential number
  token: string;
  status: 'active' | 'Deactive' | 'cancelled';
}

export const SubscribeOrderSchema = new Schema<IOrder>({
  orderId: { type: Number, required: true, unique: true },
  token: { type: String, required: true },
  status: {
    type: String,
    enum: ['active', 'Deactive', 'cancelled'],
    default: 'Deactive',
  },
});

export const SubscribeOrder = mongoose.model<IOrder>(
  'SubscribeOrder',
  SubscribeOrderSchema
);
