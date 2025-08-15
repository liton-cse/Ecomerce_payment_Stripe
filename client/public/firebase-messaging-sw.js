/* eslint-disable no-undef */

// Import Firebase scripts (compat needed for SW)
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"
);

// Your Firebase config (same as in firebase.js)
firebase.initializeApp({
  apiKey: "AIzaSyDBDDlzRP-NP9P7CqDOMCokXrWpka_geu4",
  authDomain: "fine-acronym-458318-m3.firebaseapp.com",
  projectId: "fine-acronym-458318-m3",
  storageBucket: "fine-acronym-458318-m3.firebasestorage.app",
  messagingSenderId: "74494387766",
  appId: "1:74494387766:web:bbcae46b2cfd1299ae9a97",
  measurementId: "G-ED2FPTZDQC",
});

const messaging = firebase.messaging();

// Background push handler
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new message.",
    icon: "/vite.svg", // Your app's icon path
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
