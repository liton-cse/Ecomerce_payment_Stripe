// counter.model.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ISpacilaCounter extends Document {
  name: string;
  seq: number;
}

const counterSchema = new Schema<ISpacilaCounter>({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

export const SpacialCounter = mongoose.model<ISpacilaCounter>(
  'SpacialCounter',
  counterSchema
);

// helper to get next sequence
export async function getNextSequenceSpacialProduct(
  name: string
): Promise<number> {
  const counter = await SpacialCounter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}
