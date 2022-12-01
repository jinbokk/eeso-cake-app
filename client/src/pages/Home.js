import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWindowDimensions from "../hooks/useWindowDimensions";

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

  return (
    <>
      <Container fluid className="home_container_top">
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

        <Row className="logo_banner_container">
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

        <Row>
          <Col className="my-3">
            <hr data-content="고객님을 위한 다양한 케이크가 준비되어 있습니다" />
          </Col>

          {width < 992 ? (
            <>
              <Col>
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
                            src={item.image_url}
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
            <Container className="home_cakes_image_container">
              <Row>
                {productsData.slice(0, 19).map((item, index) => (
                  <Col
                    className="d-flex justify-content-center m-0"
                    key={index}
                  >
                    <img
                      src={item.image_url}
                      alt=""
                      className="home_cakes_image"
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          )}
        </Row>

        <Row>
          <Col className="my-3">
            <hr data-content="건강하게, 맛있게" />
          </Col>
        </Row>

        <Row className="sub_banner_container_top mx-0">
          <Col lg={7} className="p-0 mb-3">
            <img
              src="/images/home_sub_banner.jpg"
              alt=""
              className="sub_banner_image"
            />
          </Col>

          <Col lg={5} className="d-flex flex-column my-3">
            <Row className="d-flex flex-column">
              <Col className="justify-content-center">
                <div className="underline">케이크도 건강해야 합니다</div>
              </Col>

              <Col className="d-flex flex-row justify-content-around my-5">
                <div className="d-flex flex-column align-items-center">
                  <div className="sub_banner_text_lg">無</div>
                  <div className="sub_banner_text_sm">합성제</div>
                </div>

                <div className="d-flex flex-column align-items-center">
                  <div className="sub_banner_text_lg">無</div>
                  <div className="sub_banner_text_sm">보존제</div>
                </div>

                <div className="d-flex flex-column align-items-center">
                  <div className="sub_banner_text_lg">無</div>
                  <div className="sub_banner_text_sm">유화제</div>
                </div>
              </Col>

              <Col className="text-center">
                <div className="sub_banner_text_sm">
                  이소케이크에서는, 합성제 보존제 유화제 등을 사용하지 않고
                </div>
                <div className="sub_banner_text_sm">
                  수시로 갓 구워낸 시트와 유생크림만을 사용합니다
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Instagram />
    </>
  );
};

export default Home;
