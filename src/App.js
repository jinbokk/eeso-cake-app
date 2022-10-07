import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import About from "./pages/About";
import RiceCakes from "./pages/RiceCakes";
import BreadCakes from "./pages/BreadCakes";
import TartCakes from "./pages/TartCakes";

import Footer from "./components/Footer";

import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <NavBar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/rice" element={<RiceCakes />} />
        <Route path="/bread" element={<BreadCakes />} />
        <Route path="/tart" element={<TartCakes />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
