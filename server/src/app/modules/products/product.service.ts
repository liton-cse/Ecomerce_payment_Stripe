import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { logger } from '../../../shared/logger';
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
