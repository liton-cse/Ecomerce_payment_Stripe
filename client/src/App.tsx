import "./App.css";
// import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes.js";
// import { getMessaging, onMessage } from "firebase/messaging";
// import { messaging } from "./services/firebase/firebase.js";
function App() {
  // useEffect(() => {
  //   const unsubscribe = onMessage(getMessaging(), (payload) => {
  //     console.log("📩 Foreground message:", payload);

  //     const { title, body, icon } = payload.notification ?? {};

  //     // Show native browser notification if permission is granted
  //     if (Notification.permission === "granted" && title) {
  //       new Notification(title, {
  //         body: body || "",
  //         icon: icon || "/default-icon.png",
  //       });
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <AppRoutes />
      <Toaster />
    </div>
  );
}

export default App;
