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
        <Row className="main_banner_container m-0">
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
              특별한 날을 더욱 특별하게,
            </div>
            <div className="logo_banner_catchphrase">
              당신의 소중한 날을 빛내줄 이소케이크
            </div>
          </Col>
        </Row>

        <Row className="sub_banner_container mx-0 px-0 gsap_second">
          {/* <Row>
            <Col className="my-3">
              <hr data-content="건강하게, 맛있게" />
            </Col>
          </Row> */}

          <Row className="d-flex flex-column sub_banner_text_container">
            <Col className="justify-content-center align-items-center">
              <div className="underline">케이크도 건강해야 합니다</div>
            </Col>

            <Col className="d-flex flex-row justify-content-center sub_banner_text_container_1">
              <div className="d-flex flex-column align-items-center mx-4">
                <div className="sub_banner_text_lg">無</div>
                <div className="sub_banner_text_sm">합성제</div>
              </div>

              <div className="d-flex flex-column align-items-center mx-4">
                <div className="sub_banner_text_lg">無</div>
                <div className="sub_banner_text_sm">보존제</div>
              </div>

              <div className="d-flex flex-column align-items-center mx-4">
                <div className="sub_banner_text_lg">無</div>
                <div className="sub_banner_text_sm">유화제</div>
              </div>
            </Col>

            <Col className="sub_banner_text_container_2">
              <div className="sub_banner_text_sm">
                이소케이크에서는 합성제, 보존제, 유화제 등을 사용하지 않고
              </div>
              <div className="sub_banner_text_sm">
                수시로 갓 구워낸 시트와 유생크림만을 사용합니다
              </div>
            </Col>
          </Row>
        </Row>

        <Row className="gsap_first mx-0">
          <Col className="my-3">
            <hr data-content="고객님을 위한 다양한 케이크가 준비되어 있습니다" />
          </Col>

          {width < 992 ? (
            <>
              <Col className="p-0">
                {loading ? (
                  <Loading
                    width={"100vw"}
                    height={"100vh"}
                    text={"케이크 이미지 가져오는 중..."}
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
        </Row>

        <Row className="mt-5">
          {/* <hr data-content="다양한 소품들로 더욱 즐겁게" /> */}
          <Col className="p-0 party_banner_container">
            <div className="party_text">
              {/* <div className="underline mb-5">순간을 더욱 빛내줄 소품들</div> */}
              <div>매장에 구비된 다양한 디자인 소품들과</div>
              <div>세상에 단 하나뿐인 주문 제작 토퍼까지</div>
              <div>
                더욱 특별한 순간을 만들어 보세요
                <BsStars
                  style={{ position: "relative", bottom: "8px" }}
                  className="mx-2"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Row className="gsap_third mx-0">
        <hr data-content="이소케이크 인스타그램" />
        <Instagram />
      </Row>
    </motion.div>
  );
};

export default Home;
