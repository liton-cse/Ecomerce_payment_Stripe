// order.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  orderId: number; // sequential number
  token: string;
  status: 'pending' | 'paid' | 'failed';
}

export const orderSchema = new Schema<IOrder>({
  orderId: { type: Number, required: true, unique: true },
  token: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
});

export const Order = mongoose.model<IOrder>('Order', orderSchema);
