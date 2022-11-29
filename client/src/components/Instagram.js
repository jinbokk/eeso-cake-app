import React, { useEffect } from "react";
import Loading from "./Loading";
import CountUp from "react-countup";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Pagination } from "swiper";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useSelector, useDispatch } from "react-redux";

import { instagramActions } from "../redux/actions/instagramActions";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "./css/instagram.css";

const Instagram = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(instagramActions.getInstaData());
  }, []);

  const { width, height } = useWindowDimensions();

  const { instaLoading, userProfileData, userFeedsData } = useSelector(
    (state) => state.instagram
  );

  return (
    <>
      <Row>
        <Col className="my-3">
          <hr data-content="이소케이크 인스타그램" />
        </Col>
      </Row>

      <Row className="sub_banner_container w-75 m-auto d-flex justify-content-center align-items-center">
        <h2 style={{ textAlign: "center" }}>- 이소케이크 인스타그램 -</h2>

        {instaLoading ? (
          <Loading
            width={"100vw"}
            height={"100vh"}
            text={"인스타그램 피드 가져오는 중..."}
          />
        ) : (
          <>
            <Row className="instaFeed_counter w-auto">
              <Col sm={12} lg={"auto"} className="text-nowrap">
                지금까지{" "}
              </Col>
              <Col sm={12} lg={"auto"} className="text-nowrap">
                <CountUp
                  start={1}
                  end={userProfileData.media_count}
                  duration={3}
                  suffix=" 개"
                  useEasing={true}
                  className="instaFeed_counter_accent"
                />
              </Col>
              <Col sm={12} lg={"auto"} className="text-nowrap">
                게시글이 포스팅 되었어요
              </Col>
            </Row>

            {width < 992 ? (
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
                {userFeedsData.data.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    className="d-flex justify-content-center"
                  >
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
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="instaFeed_container_top">
                {userFeedsData.data.map((item, index) => {
                  if (item.children) {
                    return (
                      <a
                        className="instaFeed_container"
                        href={item.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                      >
                        <Swiper
                          className="instaFeed_multi_image_container"
                          speed={600}
                          autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                          }}
                          loop={true}
                          pagination={{ clickable: false }}
                          modules={[Pagination, Autoplay]}
                        >
                          {item.children.data.map((item, index) => (
                            <SwiperSlide key={index}>
                              <img
                                src={item.media_url}
                                alt=""
                                className="instaFeed_multi_image"
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        <div className="instaFeed_text_container">
                          <div className="instaFeed_timestamp">
                            {item.timestamp.slice(0, 10)} /{" "}
                            {item.timestamp.slice(11, 16)}
                          </div>
                          <div className="instaFeed_caption">
                            {item.caption}
                          </div>
                          <div className="instaFeed_read_more">READ MORE</div>
                        </div>
                      </a>
                    );
                  } else {
                    return (
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
                          <div className="instaFeed_caption">
                            {item.caption}
                          </div>
                          <div className="instaFeed_read_more">READ MORE</div>
                        </div>
                      </a>
                    );
                  }
                })}
              </div>
            )}
          </>
        )}
      </Row>
    </>
  );
};

export default Instagram;
