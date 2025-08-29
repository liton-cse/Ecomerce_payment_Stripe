import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDBDDlzRP-NP9P7CqDOMCokXrWpka_geu4",
  authDomain: "fine-acronym-458318-m3.firebaseapp.com",
  projectId: "fine-acronym-458318-m3",
  storageBucket: "fine-acronym-458318-m3.firebasestorage.app",
  messagingSenderId: "74494387766",
  appId: "1:74494387766:web:bbcae46b2cfd1299ae9a97",
  measurementId: "G-ED2FPTZDQC",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

const vapidKey = import.meta.env.VITE_VAPIDKEY;

export const requestPermission = async (): Promise<string | null> => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey });
      return token ?? null;
    } else if (permission === "denied") {
      alert("Notification denied");
      return null;
    }
    return null; // handle default case
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Notification permission error: ${error.message}`);
    } else {
      throw new Error("Notification permission error: unknown error");
    }
  }
};
