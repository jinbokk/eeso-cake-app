import React, { useEffect, useRef } from "react";
import Loading from "./Loading";
import CountUp from "react-countup";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Pagination } from "swiper";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  const { loading, media_count, feedData } = useSelector(
    (state) => state.instagram
  );

  const ref = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const element = ref.current;
    gsap.fromTo(
      element.querySelector(".sub_banner_container"),
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element.querySelector(".sub_banner_container"),
          start: "top center",
          end: "bottom center",
        },
      }
    );
  }, []);

  return (
    <Row className="p-0 m-0" ref={ref}>
      <Row className="w-75 m-auto d-flex justify-content-center align-items-center">
        {loading ? (
          <Loading
            width={"100vw"}
            height={"100vh"}
            text={"인스타그램 피드 가져오는 중..."}
          />
        ) : (
          <>
            <Row className="instaFeed_counter justify-content-center align-items-center p-0 mb-5">
              <Row className="justify-content-center align-items-end mb-4">
                <Col sm={12} lg={"auto"}>
                  현재까지
                  <CountUp
                    start={1}
                    end={media_count}
                    duration={3}
                    // suffix={" 개"}
                    useEasing={true}
                    className="instaFeed_counter_accent"
                  />
                  개의 피드가 작성되었어요 !
                </Col>
              </Row>
              <Row className="justify-content-center align-items-end">
                <Col sm={12} lg={"auto"}>
                  주문해주시는 모든 분들께 감사드립니다 :)
                </Col>
              </Row>
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
                {feedData.map((item, index) => (
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
                {feedData.map((item, index) => {
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
    </Row>
  );
};

export default Instagram;
