import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import About from "./pages/About";
import Cakes from "./pages/Cakes";
import Contact from "./pages/Contact";

import "./App.css";
import { useState } from "react";

function App() {
  // Throttling scroll events for infinite scroll
  // let scrollPool = 500;

  // function resetScrollPool() {
  //   scrollPool = 500;
  // }

  // function scrollThrottle(event) {
  //   window.requestAnimationFrame(resetScrollPool);
  //   if (scrollPool < 0) {
  //     return false;
  //   }
  //   const scrollDistance = event.deltaY * 10;
  //   scrollPool = scrollPool - Math.abs(scrollDistance);
  //   document.querySelector("#root").scrollTop += scrollDistance;
  // }

  // window.addEventListener("wheel", scrollThrottle);
  // -------------------------------------------------

  const [browse, setBrowse] = useState(false);

  return (
    <>
      {!browse ? (
        <Landing setBrowse={setBrowse} />
      ) : (
        <>
          <Navbar />
          <Sidebar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cakes/:ingredient" element={<Cakes />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
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
