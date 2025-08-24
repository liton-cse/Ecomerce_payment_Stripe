// order.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { ISubscriptionProduct } from './sepacialProduct.interface';
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

const SubscriptionProductSchema = new Schema<ISubscriptionProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    billing_cycle: {
      type: String,
      enum: ['monthly', 'yearly', 'weekly'],
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    stripe_price_id: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const SubscriptionProductModel = mongoose.model<ISubscriptionProduct>(
  'SubscriptionProduct',
  SubscriptionProductSchema
);

export const SubscribeOrder = mongoose.model<IOrder>(
  'SubscribeOrder',
  SubscribeOrderSchema
);
