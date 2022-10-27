import React from "react";

import "swiper/css";
import "swiper/css/pagination";
import "./css/About.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Container>
        <Row>
          <div className="about_container_top">
            <Col>
              <div className="about_banner_container">
                {/* <div className="about_since">SINCE 2017</div> */}
                <img
                  className="about_banner_img"
                  src="/images/banner.jpg"
                  alt=""
                />

                <div className="banner_swiper_container">
                  <Swiper
                    spaceBetween={500}
                    autoplay={{
                      delay: 4500,
                      disableOnInteraction: false,
                    }}
                    speed={1100}
                    slidesPerView={1}
                    modules={[Autoplay]}
                    loop={true}
                  >
                    <SwiperSlide>
                      <img
                        src="/images/landing_test_3.png"
                        alt=""
                        className="banner_swiper_image"
                      ></img>
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        src="/images/landing_test.png"
                        alt=""
                        className="banner_swiper_image"
                      ></img>
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        src="/images/landing_test_2.png"
                        alt=""
                        className="banner_swiper_image"
                      ></img>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </Col>
            <Col>
              <div className="about_text_container_top">
                <div className="about_text_container">
                  <h2>안녕하세요 이소케이크입니다 : )</h2>
                  <br />
                  이소케이크를 찾아주셔서 감사합니다
                  <br />
                  이소케이크는 주문제작 수제 디자인 케이크 전문점으로
                  <br />
                  <span className="text_accent">
                    합성제,보존제,유화제 등을 사용하지않고
                  </span>
                  <br />
                  수시로 갓구워낸 시트와 유생크림만을 사용합니다.
                  <br />
                  언제나 좋은 재료로 정성껏 제작해드리고있습니다.
                  <br />
                </div>

                <div className="about_text_container">
                  어린이집,유치원케이크 피규어케이크,장난감케이크
                  <br />
                  포토케이크,숫자타르트,앙금플라워떡케이크,생화&웨딩케이크 등
                  <br />
                  남녀노소 구분없이 좋아 할 수있는{" "}
                  <span className="text_accent">여러가지 디자인</span>
                  의
                  <br />
                  케이크 포트폴리오를 보유하고 있습니다
                  <br />
                  홈페이지에서 편하게 둘러 보신 뒤,
                  <br />
                  <span className="text_accent">카카오톡 이소케이크 채널</span>
                  에서 상담 및 구매 가능하십니다 : )
                </div>

                <div className="about_text_container">
                  특별하고 소중한 기념일
                  <br />
                  예쁘고 맛까지 놓치지 않는 단 하나뿐인 케이크로
                  보답드리겠습니다.
                  <br />
                  <span className="text_accent">
                    이소케이크와 함께 해 주세요 : )
                  </span>
                </div>
              </div>
            </Col>
          </div>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default About;
