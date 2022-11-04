import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "swiper/css";
import "swiper/css/free-mode";
import "./css/About.css";
import "./css/Home.css";

import CountUp from "react-countup";
import Loading from "../components/Loading";

import { instagramActions } from "../redux/actions/instagramActions";
import { productActions } from "../redux/actions/productActions";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper";
import Footer from "../components/Footer";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.getAllProducts());
    dispatch(instagramActions.getInstaData());
  }, []);

  const { loading, allProductsData } = useSelector((state) => state.product);

  const instagramData = useSelector((state) => state.instagram);

  return (
    <>
      <Container fluid className="home_container_top">
        <Row
          className="main_banner_container m-0"
          style={{ backgroundImage: "url(/images/home_main_banner.png)" }}
        >
          <Col>
            <div className="main_banner_text">
              <div className="glow">
                <span>
                  <span
                    style={{
                      fontSize: "12rem",
                      color: "var(--bg)",
                    }}
                  >
                    M
                  </span>
                  aking
                </span>
                <span> your day</span>
                <span> even more special</span>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="my-3">
            <hr data-content="고객님을 위한 다양한 케이크가 준비되어 있습니다" />
          </Col>

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
                  breakpoints={{
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                    960: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                    1600: {
                      slidesPerView: 5,
                      spaceBetween: 10,
                    },
                  }}
                  slidesPerView={1}
                  spaceBetween={0}
                  speed={3400}
                  autoplay={{
                    delay: 1000,
                    disableOnInteraction: true,
                  }}
                  freeMode={true}
                  modules={[FreeMode, Autoplay]}
                  loop={true}
                  className="home_swiper_container"
                >
                  {allProductsData.slice(0, 19).map((item, index) => (
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

                <Swiper
                  breakpoints={{
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                    960: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                    1600: {
                      slidesPerView: 5,
                      spaceBetween: 10,
                    },
                  }}
                  slidesPerView={1}
                  spaceBetween={40}
                  speed={3500}
                  autoplay={{
                    delay: 1000,
                    disableOnInteraction: true,
                  }}
                  freeMode={true}
                  modules={[FreeMode, Autoplay]}
                  loop={true}
                  className="home_swiper_container"
                >
                  {allProductsData.slice(20, 38).map((item, index) => (
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

                <Swiper
                  breakpoints={{
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                    960: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                    1600: {
                      slidesPerView: 5,
                      spaceBetween: 10,
                    },
                  }}
                  slidesPerView={1}
                  spaceBetween={40}
                  speed={3600}
                  autoplay={{
                    delay: 1000,
                    disableOnInteraction: true,
                  }}
                  freeMode={true}
                  modules={[FreeMode, Autoplay]}
                  loop={true}
                  className="home_swiper_container"
                >
                  {allProductsData.slice(39, 57).map((item, index) => (
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
        </Row>

        <Row className="sub_banner_container_top mx-0 my-5 ">
          <Col lg={7} className="p-0">
            <img
              src="/images/home_sub_banner.jpg"
              alt=""
              className="sub_banner_image"
            />
          </Col>

          <Col lg={5} className="d-flex flex-column">
            <div className="d-flex justify-content-around my-5">
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
            </div>

            <div className="text-center my-5">
              <div className="underline">케이크도 건강해야 합니다</div>
              <div>
                이소케이크에서는, 합성제 보존제 유화제 등을 사용하지 않고
              </div>
              <div>수시로 갓 구워낸 시트와 유생크림만을 사용합니다</div>
            </div>
          </Col>
        </Row>

        <Row className="sub_banner_container w-75 m-auto d-flex justify-content-center align-items-center">
          <h2 style={{ textAlign: "center" }}>
            - 이소케이크 인스타그램 둘러보기 -
          </h2>

          {instagramData.loading ? (
            <Loading
              width={"100vw"}
              height={"100vh"}
              text={"인스타그램 피드 가져오는 중..."}
            />
          ) : (
            <>
              <div className="instaFeed_counter">
                지금까지{" "}
                <CountUp
                  start={1}
                  end={instagramData.userProfileData.media_count}
                  duration={3}
                  suffix=" 개"
                  useEasing={true}
                  className="instaFeed_counter_accent"
                />
                의 게시글이 포스팅 되었어요 !
              </div>
              <div className="instaFeed_container_top">
                {instagramData.userFeedsData.data.map((item, index) => (
                  <a
                    className="instaFeed_container"
                    href={item.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    <img
                      src={item.media_url}
                      className="instaFeed_image"
                      alt=""
                    />
                    <div className="instaFeed_text_container">
                      <div className="instaFeed_timestamp">
                        {item.timestamp.slice(0, 10)} /{" "}
                        {item.timestamp.slice(11, 16)}
                      </div>
                      <div className="instaFeed_caption">{item.caption}</div>
                      <div className="instaFeed_read_more">READ MORE</div>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
