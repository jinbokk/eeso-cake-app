import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/free-mode";
// import "./css/about.css";
import "./css/home.css";

import Loading from "../components/Loading";

import { productActions } from "../redux/actions/productActions";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper";
import Instagram from "../components/Instagram";
import { BsStars } from "react-icons/bs";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let option = {
      ingredient: "all",
    };
    dispatch(productActions.getProducts(option));
  }, []);

  const { loading, productsData } = useSelector((state) => state.product);

  const { width, height } = useWindowDimensions();

  const ref = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const element = ref.current;
    gsap.fromTo(
      element.querySelector(".gsap_first"),
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element.querySelector(".gsap_first"),
          start: "top center",
          // markers: true,
          // end: "bottom center",
          // scrub: false,
        },
      }
    );
  }, []);

  useEffect(() => {
    const element = ref.current;
    gsap.fromTo(
      element.querySelector(".gsap_second"),
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element.querySelector(".gsap_second"),
          // markers: true,
          start: "top center",
          end: "bottom center",
          // scrub: false,
        },
      }
    );
  }, []);

  useEffect(() => {
    const element = ref.current;
    gsap.fromTo(
      element.querySelector(".gsap_third"),
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element.querySelector(".gsap_third"),
          // markers: true,
          start: "top center",
          end: "bottom center",
          // scrub: false,
        },
      }
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      exit={{ opacity: 0, y: "-20px" }}
    >
      <Container fluid className="home_container_top" ref={ref}>
        <Row className="main_banner_container m-0 p-0">
          <Col>
            <div className="main_banner_text">
              <div className="glow">
                <span>
                  <span className="main_banner_text_accent">M</span>
                  aking
                </span>
                <span> your day</span>
                <span> even more special</span>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="logo_banner_container mx-0">
          <Col lg={12} className="d-flex justify-content-center">
            <img
              src="/images/banner_transparent.png"
              alt=""
              className="logo_banner_img"
            />
          </Col>
          <Col
            lg={12}
            className="d-flex flex-column justify-content-center align-items-center p-4"
          >
            <div className="logo_banner_catchphrase">
              ????????? ?????? ?????? ????????????,
            </div>
            <div className="logo_banner_catchphrase">
              ????????? ????????? ?????? ????????? ???????????????
            </div>
          </Col>
        </Row>

        <Row className="sub_banner_container mx-0 px-0 gsap_first">
          {/* <Row>
            <Col className="my-3">
              <hr data-content="????????????, ?????????" />
            </Col>
          </Row> */}

          <Row className="d-flex flex-column sub_banner_text_container">
            <Col className="justify-content-center align-items-center">
              <div className="underline">???????????? ???????????? ?????????</div>
            </Col>

            <Col className="d-flex flex-row justify-content-center sub_banner_text_container_1">
              <div className="d-flex flex-column align-items-center mx-4">
                <div className="sub_banner_text_lg">???</div>
                <div className="sub_banner_text_sm">?????????</div>
              </div>

              <div className="d-flex flex-column align-items-center mx-4">
                <div className="sub_banner_text_lg">???</div>
                <div className="sub_banner_text_sm">?????????</div>
              </div>

              <div className="d-flex flex-column align-items-center mx-4">
                <div className="sub_banner_text_lg">???</div>
                <div className="sub_banner_text_sm">?????????</div>
              </div>
            </Col>

            <Col className="sub_banner_text_container_2">
              <div className="sub_banner_text_sm">
                ???????????????????????? ?????????, ?????????, ????????? ?????? ???????????? ??????
              </div>
              <div className="sub_banner_text_sm">
                ????????? ??? ????????? ????????? ?????????????????? ???????????????
              </div>
            </Col>
          </Row>
        </Row>

        <Row className="gsap_second w-100">
          <Col className="my-3">
            <hr data-content="???????????? ?????? ????????? ???????????? ???????????? ????????????" />
          </Col>

          {width < 992 ? (
            <>
              <Col className="p-0">
                {loading ? (
                  <Loading
                    width={"100vw"}
                    height={"100vh"}
                    text={"????????? ????????? ???????????? ???..."}
                  />
                ) : (
                  <>
                    <Swiper
                      slidesPerView={2}
                      spaceBetween={10}
                      speed={5000}
                      autoplay={{
                        delay: 1,
                        disableOnInteraction: false,
                      }}
                      freeMode={true}
                      modules={[FreeMode, Autoplay]}
                      loop={true}
                      className="custom_swiper_container"
                    >
                      {productsData.map((item, index) => (
                        <SwiperSlide
                          key={index}
                          className="d-flex justify-content-center"
                        >
                          <img
                            src={item.image_url.replace(
                              "upload/",
                              "upload/q_50/"
                            )}
                            alt=""
                            className="home_swiper_image"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </>
                )}
              </Col>
            </>
          ) : (
            <Container>
              <Row>
                {productsData.slice(0, 18).map((item, index) => (
                  <Col
                    md={3}
                    lg={2}
                    className="home_cakes_image_container p-2"
                    key={index}
                  >
                    <img
                      src={item.image_url.replace("upload/", "upload/q_50/")}
                      alt=""
                      className="home_cakes_image"
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          )}
          <Row className="mt-5 mx-0">
            {/* <hr data-content="????????? ???????????? ?????? ?????????" /> */}
            <Col className="party_banner_container">
              <div className="deco_image_container">
                {width < 992 ? (
                  <div>
                    {/* <Swiper
                      slidesPerView={1}
                      spaceBetween={5}
                      speed={2000}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      freeMode={true}
                      modules={[FreeMode, Autoplay]}
                      loop={true}
                      className="custom_swiper_container"
                    >
                      <SwiperSlide className="d-flex justify-content-center">
                        <img
                          src="/images/deco/deco_1.png"
                          alt=""
                          className="deco_image"
                        />
                      </SwiperSlide>
                      <SwiperSlide className="d-flex justify-content-center">
                        <img
                          src="/images/deco/deco_2.png"
                          alt=""
                          className="deco_image"
                        />
                      </SwiperSlide>
                      <SwiperSlide className="d-flex justify-content-center">
                        <img
                          src="/images/deco/deco_3.png"
                          alt=""
                          className="deco_image"
                        />
                      </SwiperSlide>
                      <SwiperSlide className="d-flex justify-content-center">
                        <img
                          src="/images/deco/deco_4.png"
                          alt=""
                          className="deco_image"
                        />
                      </SwiperSlide>
                      <SwiperSlide className="d-flex justify-content-center">
                        <img
                          src="/images/deco/deco_5.png"
                          alt=""
                          className="deco_image"
                        />
                      </SwiperSlide>
                      <SwiperSlide className="d-flex justify-content-center">
                        <img
                          src="/images/deco/deco_6.png"
                          alt=""
                          className="deco_image"
                        />
                      </SwiperSlide>
                    </Swiper> */}
                  </div>
                ) : (
                  <>
                    <div>
                      <img
                        src="/images/deco/deco_1.png"
                        alt=""
                        className="deco_image"
                      />
                      <img
                        src="/images/deco/deco_2.png"
                        alt=""
                        className="deco_image"
                      />
                      <img
                        src="/images/deco/deco_3.png"
                        alt=""
                        className="deco_image"
                      />
                    </div>
                    <div style={{ marginLeft: "5%"}}>
                      <img
                        src="/images/deco/deco_4.png"
                        alt=""
                        className="deco_image"
                      />
                      <img
                        src="/images/deco/deco_5.png"
                        alt=""
                        className="deco_image"
                      />
                      <img
                        src="/images/deco/deco_6.png"
                        alt=""
                        className="deco_image"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="party_text">
                {/* <div className="underline mb-5">????????? ?????? ????????? ?????????</div> */}
                <div>
                  ????????? ????????? ????????? ????????? ????????????, ????????? ??? ???????????? ??????
                  ?????? ????????????
                </div>
                <div>
                  ????????? ???, ?????? ????????? ????????? ????????? ?????????
                  <BsStars
                    style={{ position: "relative", bottom: "8px" }}
                    className="mx-2"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Row>
      </Container>

      <Row className="gsap_third mx-0">
        <hr data-content="??????????????? ???????????????" />
        <Instagram />
      </Row>
    </motion.div>
  );
};

export default Home;
