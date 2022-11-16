import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import About from "./pages/About";
import Cakes from "./pages/Cakes";
import GuideRice from "./pages/GuideRice";
import GuideBread from "./pages/GuideBread";
import Contact from "./pages/Contact";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import UploadProduct from "./pages/UploadProduct";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";

function App() {
  const [browse, setBrowse] = useState(false);

  return (
    <>
      {!browse ? (
        <Landing setBrowse={setBrowse} />
      ) : (
        <>
          <Suspense fallback={<Loading />}>
            <Navbar />
            <Sidebar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/cakes/:ingredient" element={<Cakes />} />
              <Route exact path="/guide/rice" element={<GuideRice />} />
              <Route exact path="/guide/bread" element={<GuideBread />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/upload" element={<UploadProduct />} />
            </Routes>
            <Footer />
          </Suspense>
        </>
      )}
    </>
  );
}

export default App;

// State가 되려면 세 가지 조건을 만족해야 한다.

// Is it passed in from a parent via props? If so, it probably isn't state.
// 1. 부모 컴포넌트로부터 props의 형태로 전달되는가? 만약 그렇다면 state가 아니다.

// Does it remain unchanged over time? If so, it probably isn't state.
// 2. 계속해서 변하지 않는가? 그렇다면 이것도 state가 아니다.

// Can you compute it based on any other state or props in your component? If so, it isn't state.
// 3. 컴포넌트의 다른 state나 props를 통해 계산가능한가? 그렇다면 state가 아니다.
