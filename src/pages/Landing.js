import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "./css/Landing.css";

import { instagramActions } from "../redux/actions/instagramActions";

// gsap test -----------------------------------------
// https://greensock.com/react/
import { gsap } from "gsap";
import { productActions } from "../redux/actions/productActions";
// gsap test -----------------------------------------

const Landing = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.getProducts());
    dispatch(instagramActions.getInstaData());
  }, []);

  // gsap test -----------------------------------------
  const el = useRef();
  const q = gsap.utils.selector(el);

  useEffect(() => {
    // if (loading === true) return;

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

  // gsap test -----------------------------------------

  return (
    <>
      {/* {!loading ? ( */}
      <div className="landing_container_top" ref={el}>
        <div className="landing_text">
          <div className="landing_text_section1">
            <h2 className="ease_in_left_1">Design Cake Shop</h2>
            <h1 className="ease_in_left_2">EESO CAKE</h1>
          </div>

          <div className="landing_text_section2">
            <div className="ease_in_left_3">
              <h3>안녕하세요, 이소케이크 입니다 :)</h3>
              <h3>無 합성제 無 보존제 無 유화제</h3>
              <h3>갓 구워낸 시트와 신선한 생크림만을 사용합니다</h3>
            </div>
          </div>

          <div className="landing_text_section3">
            <button
              className="landing_button ease_in_bottom_2"
              onClick={() => props.setBrowse(true)}
            >
              SHOP NOW
            </button>
          </div>
        </div>

        <div className="landing_image_container ease_in_right_1">
          <Swiper
            spaceBetween={500}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            speed={1100}
            modules={[Autoplay]}
            loop={true}
          >
            <SwiperSlide>
              <img
                src="/images/landing_test_3.png"
                className="landing_image_background_removed ease_in_right_2"
                alt=""
              ></img>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/images/landing_test.png"
                className="landing_image_background_removed ease_in_right_2"
                alt=""
              ></img>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/images/landing_test_2.png"
                className="landing_image_background_removed ease_in_right_2"
                alt=""
              ></img>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* <div>
                <img
                  src="/images/deco_cake.png"
                  alt=""
                  className="deco_cake_image_left ease_in_bottom_1"
                />
              </div>
              <div>
                <img
                  src="/images/deco_cake.png"
                  alt=""
                  className="deco_cake_image_right ease_in_bottom_1"
                />
              </div> */}

        {/* <div>
            <img
              src="/images/deco_flower.png"
              alt=""
              className="deco_flower_img_left ease_in_bottom_1"
            />
          </div>
          <div>
            <img
              src="/images/deco_flower.png"
              alt=""
              className="deco_flower_img_right ease_in_bottom_1"
            />
          </div> */}
      </div>
      {/* ) : null} */}
    </>
  );
};

export default Landing;
