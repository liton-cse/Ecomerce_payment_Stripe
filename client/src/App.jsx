import "./App.css";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppRoutes />
      <Toaster />
    </div>
  );
}

export default App;
