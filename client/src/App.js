import React, { Suspense, useState, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import About from "./pages/About";
import Cakes from "./pages/Cakes";
import Order from "./pages/Order";
import OrderDetail from "./pages/OrderDetail";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import GuideRice from "./pages/GuideRice";
import GuideBread from "./pages/GuideBread";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import UploadProduct from "./pages/UploadProduct";
import Auth from "./hoc/Auth";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  // Hoc Auth
  //  --- Auth option ---
  //   1. null : 아무나 출입 가능
  //   2. true : 로그인 한 유저만 출입 가능
  //   3. false : 로그인 한 유저는 출입 불가
  const AuthLogin = Auth(Login, false);
  const AuthRegister = Auth(Register, false);
  const AuthHome = Auth(Home, null);
  const AuthAbout = Auth(About, null);
  const AuthCakes = Auth(Cakes, null);
  const AuthOrder = Auth(Order, null);
  const AuthOrderDetail = Auth(OrderDetail, null);
  const AuthCart = Auth(Cart, true);
  const AuthPayment = Auth(Payment, true);
  const AuthGuideRice = Auth(GuideRice, null);
  const AuthGuideBread = Auth(GuideBread, null);
  const AuthFAQ = Auth(FAQ, null);
  const AuthContact = Auth(Contact, null);
  const AuthUploadProduct = Auth(UploadProduct, true, true);

  // sessionStorage (플리커링을 없애기 위해 useLayoutEffect 사용)
  const [isLandingPageView, setIsLandingPageView] = useState(false);

  useLayoutEffect(() => {
    let landingPageView = sessionStorage.getItem("isLandingPageView");

    if (landingPageView === null) {
      landingPageView = false;
      sessionStorage.setItem("isLandingPageView", landingPageView);
    } else {
      landingPageView = true;
      sessionStorage.setItem("isLandingPageView", landingPageView);
      setIsLandingPageView(landingPageView);
    }
  }, [isLandingPageView]);

  const location = useLocation();

  return (
    <>
      {!isLandingPageView ? (
        <Landing setIsLandingPageView={setIsLandingPageView} />
      ) : (
        <>
          <Suspense fallback={<Loading />}>
            <Navbar />
            <Sidebar />
            {/* <AnimatePresence> */}
            <Routes location={location} key={location.pathname}>
              <Route exact path="/" element={<AuthHome />} />
              <Route exact path="/login" element={<AuthLogin />} />
              <Route exact path="/register" element={<AuthRegister />} />
              <Route exact path="/about" element={<AuthAbout />} />
              <Route exact path="/cakes/:ingredient" element={<AuthCakes />} />
              <Route exact path="/order/list" element={<AuthOrder />} />
              <Route
                exact
                path="/order/list/detail/:productId"
                element={<AuthOrderDetail />}
              />
              <Route exact path="/user/cart" element={<AuthCart />} />
              <Route exact path="/user/payment" element={<AuthPayment />} />
              <Route exact path="/guide/rice" element={<AuthGuideRice />} />
              <Route exact path="/guide/bread" element={<AuthGuideBread />} />
              <Route exact path="/customer/faq" element={<AuthFAQ />} />
              <Route exact path="/contact" element={<AuthContact />} />
              <Route exact path="/upload" element={<AuthUploadProduct />} />
            </Routes>
            {/* </AnimatePresence> */}
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
