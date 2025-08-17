// order.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IOrder, orderSchema } from '../products/product.order.model';

export const SubscribeOrder = mongoose.model<IOrder>(
  'SubscribeOrder',
  orderSchema
);
