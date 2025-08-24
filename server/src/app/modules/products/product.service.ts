import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { logger } from '../../../shared/logger';
import { ProductModel } from './product.order.model';
import { IProduct } from './product.interface';
dotenv.config();
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

interface PushPayload {
  title: string;
  body: string;
  recipientToken: string;
}

export const sendPushNotification = async ({
  title,
  body,
  recipientToken,
}: PushPayload) => {
  try {
    const message = {
      notification: { title, body },
      token: recipientToken,
    };
    logger.info(message);
    const response = await admin.messaging().send(message);
    console.log('Push notification sent:', response);
  } catch (err) {
    console.error('Error sending push notification:', err);
  }
};

// craete a product list
export interface CreateProductPayload
  extends Omit<Partial<IProduct>, 'images'> {
  images?: string[];
}

export const createProduct = async (payload: CreateProductPayload) => {
  const { dish, price, qnty, rating, somedata, address, images = [] } = payload;
  return await ProductModel.create({
    dish,
    price: Number(price),
    qnty: Number(qnty),
    address,
    rating: Number(rating),
    somedata,
    imgdata: images[0] || '',
    delimg: images[1] || '',
    arrimg: images[2] || '',
  });
};
// get all product list....
export const getAllProducts = async () => {
  return await ProductModel.find();
};
//  get product by id
export const getProductById = async (id: string) => {
  return await ProductModel.findById(id);
};

//update the producrt list of a product
export const updateProduct = async (
  id: string,
  payload: CreateProductPayload
) => {
  return await ProductModel.findByIdAndUpdate(id, payload, { new: true });
};
//delete a product fro database..
export const deleteProduct = async (id: string) => {
  return await ProductModel.findByIdAndDelete(id);
};
