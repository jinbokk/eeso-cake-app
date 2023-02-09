import React, { Suspense, useState, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";

import Auth from "./hoc/Auth";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CakesPage from "./pages/CakesPage";
import OrderPage from "./pages/OrderPage";
// import OrderDetailPage from "./pages/OrderDetail_deprecated";
import OrderDetailPage from "./pages/OrderDetailPage";
import MyPage from "./pages/MyPage";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import GuideRicePage from "./pages/GuideRicePage";
import GuideBreadPage from "./pages/GuideBreadPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import UploadProductPage from "./pages/UploadProductPage";
import OrderHistoryPage from "./pages/mypage/OrderHistoryPage";
import OrderCancellationHistoryPage from "./pages/mypage/OrderCancellationHistoryPage";
import CouponPage from "./pages/mypage/CouponPage";
import MileagePage from "./pages/mypage/MileagePage";
import EditProfilePage from "./pages/mypage/EditProfilePage";
import UnregisterPage from "./pages/mypage/UnregisterPage";
import TermsPage from "./pages/policy/TermsPage";
import PrivacyPolicyPage from "./pages/policy/PrivacyPolicyPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  // Hoc Auth
  //  --- Auth option ---
  //   1. null : 아무나 출입 가능
  //   2. true : 로그인 한 유저만 출입 가능
  //   3. false : 로그인 한 유저는 출입 불가
  const AuthLogin = Auth(LoginPage, false);
  const AuthRegister = Auth(RegisterPage, false);
  const AuthHome = Auth(HomePage, null);
  const AuthAboutPage = Auth(AboutPage, null);
  const AuthCakes = Auth(CakesPage, null);
  const AuthOrder = Auth(OrderPage, null);
  const AuthOrderDetail = Auth(OrderDetailPage, null);
  const AuthMypage = Auth(MyPage, true);
  const AuthCart = Auth(CartPage, true);
  const AuthPayment = Auth(PaymentPage, true);
  const AuthGuideRice = Auth(GuideRicePage, null);
  const AuthGuideBread = Auth(GuideBreadPage, null);
  const AuthFAQ = Auth(FAQPage, null);
  const AuthContact = Auth(ContactPage, null);
  const AuthUploadProduct = Auth(UploadProductPage, true, true);
  const AuthTerms = Auth(TermsPage, null);
  const AuthPrivacyPolicy = Auth(PrivacyPolicyPage, null);

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

  return (
    <>
      {!isLandingPageView ? (
        <LandingPage setIsLandingPageView={setIsLandingPageView} />
      ) : (
        <>
          <Suspense fallback={<Loading />}>
            <Navbar />
            <Sidebar />
            {/* <AnimatePresence> */}
            <Routes>
              <Route path="/" element={<AuthHome />} />
              <Route path="/login" element={<AuthLogin />} />
              <Route path="/register" element={<AuthRegister />} />
              <Route path="/about" element={<AuthAboutPage />} />
              <Route path="/cakes/:ingredient" element={<AuthCakes />} />
              <Route path="/order" element={<AuthOrder />} />
              <Route
                path="/order/detail/:productId"
                element={<AuthOrderDetail />}
              />
              {/* <Route path="/user/mypage/:menu" element={<AuthMypage />} /> */}
              <Route path="/user/mypage" element={<AuthMypage />}>
                <Route path="order-history" element={<OrderHistoryPage />} />
                <Route
                  path="order-cancellation-history"
                  element={<OrderCancellationHistoryPage />}
                />
                <Route path="coupon" element={<CouponPage />} />
                <Route path="mileage" element={<MileagePage />} />
                <Route path="edit-profile" element={<EditProfilePage />} />
                <Route path="unregister" element={<UnregisterPage />} />
              </Route>
              <Route path="/user/cart" element={<AuthCart />} />
              <Route path="/payment" element={<AuthPayment />} />
              <Route path="/guide/rice" element={<AuthGuideRice />} />
              <Route path="/guide/bread" element={<AuthGuideBread />} />
              <Route path="/faq" element={<AuthFAQ />} />
              <Route path="/contact" element={<AuthContact />} />
              <Route path="/upload" element={<AuthUploadProduct />} />
              <Route
                path="/policy/privacy-policy"
                element={<AuthPrivacyPolicy />}
              />
              <Route path="/policy/terms" element={<AuthTerms />} />
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
