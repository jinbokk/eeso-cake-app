import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/effect-cards";
import "./css/home.css";

import Loading from "../components/Loading";

import { productActions } from "../redux/actions/productActions";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, EffectCards } from "swiper";
import Instagram from "../components/Instagram";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let option = {
      ingredient: "all",
    };
    dispatch(productActions.getProducts(option));
  }, []);

  const { loading, productsData } = useSelector((state) => state.product);

  const { width } = useWindowDimensions();

  const decoImages = [
    "/images/deco/deco_(7).png",
    "/images/deco/deco_(10).png",
    "/images/deco/deco_(9).png",
    "/images/deco/deco_(6).png",
    "/images/deco/deco_(5).png",
    "/images/deco/deco_(1).png",
    "/images/deco/deco_(3).png",
    "/images/deco/deco_(8).png",
    "/images/deco/deco_(11).png",
  ];

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
          start: "top 80%",
        },
      }
    );

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
          start: "top 80%",
        },
      }
    );

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
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      element.querySelector(".gsap_fourth"),
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element.querySelector(".gsap_fourth"),
          start: "top 80%",
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
          <Col className="m-0 p-0">
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

        <Row className="sub_banner_container mx-0 px-0 gsap_first">
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

        <Row className="w-100 m-0">
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
                      className="custom_swiper_container gsap_second"
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
                            className="deco_image"
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
              <Row className="gsap_second">
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

        <Row className="w-100  m-0">
          <Col className="my-3">
            <hr data-content="다양한 소품들로 더욱 즐겁게" />
          </Col>

          <Row className="party_banner_container mx-0 p-0 gsap_third">
            <Col lg={6} xs={12} className="deco_image_container">
              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                cardsEffect={{ perSlideOffset: 10 }}
                className="swiper_card"
              >
                {decoImages.map((item, index) => {
                  return (
                    <SwiperSlide key={index} className="deco_image_slide">
                      <img src={item} alt="" className="deco_image" />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Col>

            <Col lg={6} xs={12}>
              <iframe
                title="party_animation"
                src="https://embed.lottiefiles.com/animation/78667"
                className="party_animation"
              ></iframe>
              <div className="party_text">
                <div className="underline mb-4">다양한 소품들이 있습니다</div>
                <div>매장에 구비된 다양한 디자인 소품들과</div>
                <div>세상에 단 하나뿐인 주문 제작 토퍼까지</div>
                <div>
                  특별한 날, 더욱 특별한 순간을 만들어 보세요 !
                  {/* <BsStars
                    style={{ position: "relative", bottom: "3px" }}
                    className="mx-2"
                  /> */}
                </div>
              </div>
            </Col>
          </Row>
        </Row>
      </Container>

      <Row className=" mx-0">
        <hr data-content="이소케이크 인스타그램" />
        <Instagram className="gsap_fourth" />
      </Row>
    </motion.div>
  );
};

export default Home;
