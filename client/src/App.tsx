import "./App.css";
// import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes.js";
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppRoutes />
      <Toaster />
    </div>
  );
}

export default App;
