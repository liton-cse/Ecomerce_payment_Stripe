import Header from "./components/header/Header";
import "./App.css";
import Home from "./page/Home/Home";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import AddToCard from "./components/card/AddToCard";
import Success from "./page/sucess/Success";
import Cencel from "./page/sucess/Cencel";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppRoutes />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card-details" element={<AddToCard />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cencel" element={<Cencel />} />
      </Routes> */}
      <Toaster />
    </div>
  );
}

export default App;
