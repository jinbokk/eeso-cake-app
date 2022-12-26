import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./css/landing.css";

// https://greensock.com/react/
import { gsap } from "gsap";
import { Container, Row, Col } from "react-bootstrap";

const Landing = (props) => {
  // gsap
  const el = useRef();
  const q = gsap.utils.selector(el);
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container ref={el} className="landing_container">
        <Row className="justify-content-center align-items-center w-75 h-100 m-auto">
          <Col xs={12} lg={6} className="text-center">
            <div className="title_section text-start">
              <div>
                <h2 className="landing_h2 ease_in_left_1 mb-3">
                  Design Cake Shop
                </h2>
                <h1 className="landing_h1 ease_in_left_2 mb-5 ">EESO CAKE</h1>
              </div>

              <div className="ease_in_left_3 mb-5">
                <h3 className="landing_h3">안녕하세요, 이소케이크 입니다</h3>
                <h3 className="landing_h3">특별하고 소중한 날,</h3>
                <h3 className="landing_h3">
                  고객님의 행복을 위해 최선을 다하겠습니다
                </h3>
              </div>

              <button
                className="landing_button ease_in_bottom_2"
                onClick={() => props.setIsLandingPageView(true)}
              >
                SHOP NOW
              </button>
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

      {/* <Container ref={el}>
        <Row>
          <Col lg={6}>
            <Row>


              <Col className="landing_text_section2">
                <div className="ease_in_left_3">
                  <h3>안녕하세요, 이소케이크 입니다 : )</h3>
                  <h3>특별하고 소중한 날 ,</h3>
                  <h3>고객님의 행복을 위해 최선을 다하겠습니다</h3>
                </div>
              </Col>

              <Col className="landing_text_section3">

              </Col>
            </Row>
          </Col>

          <Col lg={6}>
            <div className="landing_image_container ease_in_right_1">

            </div>
          </Col>
        </Row>
      </Container> */}
    </motion.div>
  );
};

export default Landing;
