import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import DesignCakes from "./pages/DesignCakes";
import FigureCakes from "./pages/FigureCakes";
import PhotoCakes from "./pages/PhotoCakes";
import RiceCakes from "./pages/RiceCakes";
import LetteringCakes from "./pages/LetteringCakes";
import Tarts from "./pages/Tarts";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/design" element={<DesignCakes />} />
        <Route path="/figure" element={<FigureCakes />} />
        <Route path="/photo" element={<PhotoCakes />} />
        <Route path="/rice" element={<RiceCakes />} />
        <Route path="/letter" element={<LetteringCakes />} />
        <Route path="/tart" element={<Tarts />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
