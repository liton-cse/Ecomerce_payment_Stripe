// order.model.ts
import mongoose, { model, Schema, Document } from 'mongoose';
import { IProduct } from './product.interface';

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

const productSchema = new Schema<IProduct>(
  {
    dish: { type: String, required: true },
    imgdata: { type: String },
    address: { type: String },
    delimg: { type: String },
    somedata: { type: String },
    price: { type: Number, required: true },
    rating: { type: Number },
    arrimg: { type: String },
    qnty: { type: Number },
  },
  { timestamps: true }
);

export const ProductModel = model<IProduct>('Product', productSchema);
export const Order = mongoose.model<IOrder>('Order', orderSchema);
