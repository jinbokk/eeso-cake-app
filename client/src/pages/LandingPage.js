import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./css/landingPage.css";

// https://greensock.com/react/
import { gsap } from "gsap";
import { Container, Row, Col } from "react-bootstrap";

const LandingPage = (props) => {
  // gsap
  const el = useRef();
  const q = gsap.utils.selector(el);

  // const onMouseEnterHandler = (e) => {
  //   e.target.style.transition = "0.5s";
  //   e.target.style.transform = "scale(1.1)";
  // };
  // const onMouseLeaveHandler = (e) => {
  //   e.target.style.transition = "0.5s";
  //   e.target.style.transform = "scale(1)";
  // };

  useEffect(() => {
    gsap.fromTo(
      q(".ease_in_right_1"),
      { opacity: 0, x: 200 },
      {
        opacity: 1,
        duration: 1.3,
        ease: "power2.out",
        x: 0,
      }
    );
    gsap.fromTo(
      q(".ease_in_right_2"),
      { opacity: 0, x: 200 },
      {
        delay: 0.4,
        opacity: 1,
        duration: 1.3,
        ease: "power2.out",
        x: 0,
      }
    );
    gsap.fromTo(
      q(".ease_in_left_1"),
      { opacity: 0, x: -200 },
      { delay: 1.2, opacity: 1, duration: 1.3, ease: "power2.out", x: 0 }
    );
    gsap.fromTo(
      q(".ease_in_left_2"),
      { opacity: 0, x: -200 },
      { delay: 1.2, opacity: 1, duration: 1.3, ease: "power2.out", x: 0 }
    );
    gsap.fromTo(
      q(".ease_in_left_3"),
      { opacity: 0, x: -200 },
      { delay: 1.2, opacity: 1, duration: 1.3, ease: "power2.out", x: 0 }
    );
    gsap.fromTo(
      q(".ease_in_bottom_1"),
      { opacity: 0, y: 100 },
      { opacity: 1, duration: 1.3, ease: "power2.out", y: 0 }
    );
    gsap.fromTo(
      q(".ease_in_bottom_2"),
      { opacity: 0, y: 100 },
      { delay: 2, opacity: 1, duration: 1.3, ease: "power2.out", y: 0 }
    );
  }, []);

  return (
    <>
      {/* <div className="ribbon_v"></div>
      <div className="ribbon_h"></div> */}
      {/* <div className="ribbon_tie"></div> */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* <img
          // src="/images/ribbon.png"
          src="/images/ribbon2.png"
          alt=""
          className="ribbon"
        /> */}

        {/* <video
          className="ribbon_video"
          src="/videos/ribbon.mov"
        /> */}

        <Container ref={el} className="landing_container">
          <Row className="justify-content-center align-items-center w-75 h-100 m-auto">
            <Col xs={12} lg={6} className="text-center">
              <div className="title_section text-start">
                <div>
                  <h2 className="landing_h2 ease_in_left_1 mb-3">
                    Design Cake Shop
                  </h2>
                  <img
                    // src="/logo512.png"
                    src="/images/nav_logo.png"
                    // src="/images/deco_cake.png"
                    alt=""
                    className="landing_logo ease_in_left_1"
                  />
                  {/* <h1 className="landing_h1 ease_in_left_2 mb-5 ">EESO CAKE</h1> */}
                </div>

                <div className="ease_in_left_3 mb-4">
                  <h4>특별하고 소중한 날,</h4>
                  <h4>고객님의 행복을 위해 최선을 다하겠습니다</h4>
                </div>

                {/* <NavLink
                  to="/order/all"
                  className="landing_button ease_in_bottom_2"
                  onClick={() => props.setIsLandingPageView(true)}
                >
                  구매하기
                </NavLink> */}

                <NavLink
                  to="/"
                  className="landing_button ease_in_bottom_2 my-3"
                  onClick={() => props.setIsLandingPageView(true)}
                >
                  SHOP NOW
                </NavLink>
              </div>
            </Col>

            <Col xs={12} lg={6} className="image_section ease_in_right_1">
              <Swiper
                effect={"fade"}
                fadeEffect={{ crossFade: true }}
                spaceBetween={500}
                // autoHeight={true}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                }}
                speed={500}
                modules={[Autoplay, EffectFade]}
                loop={true}
              >
                <SwiperSlide>
                  <img
                    src="/images/landing_3.png"
                    className="landing_product_img ease_in_right_2"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/images/landing_1.png"
                    className="landing_product_img ease_in_right_2"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/images/landing_2.png"
                    className="landing_product_img ease_in_right_2"
                    alt=""
                  />
                </SwiperSlide>
              </Swiper>
            </Col>
          </Row>
        </Container>
      </motion.div>
    </>
  );
};

export default LandingPage;
