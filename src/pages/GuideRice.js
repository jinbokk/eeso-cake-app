import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./css/Guide.css";

import useWindowDimensions from "../hooks/useWindowDimensions";

import Footer from "../components/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { Container, Row, Col } from "react-bootstrap";

const GuideRice = () => {
  const { width, height } = useWindowDimensions();

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `
      <div class="${className}">
        <div>
          ${index + 1}호
        </div>
      </div>
    `;
    },
  };

  return (
    <>
      <div className="guide_container">
        <div className="guide_subtitle">케이크 사이즈 안내</div>
        {width > 992 ? (
          <img
            src="/images/rice_cake_size/rice_cake_size_all.png"
            className="cakes_size_image"
            alt=""
          />
        ) : (
          <Swiper
            spaceBetween={200}
            speed={700}
            navigation={true}
            pagination={pagination}
            modules={[Pagination, Navigation]}
            className="guide_swiper_container"
          >
            <SwiperSlide>
              <div className="swiper_cakes_size_image_container">
                <img
                  src="/images/rice_cake_size/rice_cake_size_no1.png"
                  className="swiper_cakes_size_image"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper_cakes_size_image_container">
                <img
                  src="/images/rice_cake_size/rice_cake_size_no2.png"
                  className="swiper_cakes_size_image"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper_cakes_size_image_container">
                <img
                  src="/images/rice_cake_size/rice_cake_size_no3.png"
                  className="swiper_cakes_size_image"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper_cakes_size_image_container">
                <img
                  src="/images/rice_cake_size/rice_cake_size_no4.png"
                  className="swiper_cakes_size_image"
                  alt=""
                />
              </div>
            </SwiperSlide>
          </Swiper>
        )}

        <div className="guide_subtitle">떡케이크 디자인 안내</div>
        <Container className="w-70">
          <Row className="justify-content-center">
            <Col
              md={4}
              sm={12}
              className="d-flex flex-column justify-content-start align-items-center p-3"
            >
              <img
                className="cakes_design_image"
                src="/images/rice_cake_design/rice_cake_dome.png"
                alt=""
              />
              <div className="m-3">돔 디자인</div>
              <div>
                케이크 윗면에 전체적으로 꽃이 올라가는 디자인! 미니, 1호
                사이즈에 추천드리는 디자인입니다 풍성해 보이는 디자인.
              </div>
            </Col>

            <Col
              md={4}
              sm={12}
              className="d-flex flex-column justify-content-start align-items-center p-3"
            >
              <img
                className="cakes_design_image"
                src="/images/rice_cake_design/rice_cake_crescent.png"
                alt=""
              />
              <div className="m-3">크레센트트 디자인</div>
              <div>
                여백의 미를 살린 세련된 케이크를 찾으시는 분들께 추천드려요!
              </div>
            </Col>

            <Col
              md={4}
              sm={12}
              className="d-flex flex-column justify-content-start align-items-center p-3"
            >
              <img
                className="cakes_design_image"
                src="/images/rice_cake_design/rice_cake_wreath.png"
                alt=""
              />
              <div className="m-3">리스 디자인</div>
              <div>
                3,4호 대형 사이즈에 추천드리는 디자인입니다 화려한 화관 스타일의
                케이크! 여러 조각 나누어 드셔도 예쁨을 최대한 남길 수 있는
                디자인.
              </div>
            </Col>
          </Row>
        </Container>

        <div className="guide_subtitle">설기 맛 선택</div>
        <Container>
          <Row>
            <Col md={12}>
              <div className="d-flex justify-content-center mb-5">백설기 (기본설기)</div>
            </Col>

            <Col md={12}>
              <div className="d-flex justify-content-center mb-5"> *BEST 흑임자 설기 (흑임자 잼 / 쿠앤크 색감)</div>
            </Col>

            <Col md={12}>
              <div className="d-flex justify-content-center mb-5">단호박 설기 (단호박 필링 / 노란 설기 )</div>
            </Col>

            <Col md={12}>
              <div className="d-flex justify-content-center mb-5">초코 설기 ( 초코칩 필링 / 브라운 설기 )</div>
            </Col>
          </Row>
        </Container>

        <div className="taste_info_container"></div>

        <div className="guide_subtitle">케이크 상자 선택</div>
        <div className="package_info_container">
          <div>종이 상자 패키지 (기본 패키지)</div>
          <div>투명 상자 패키지</div>
        </div>

        <Container>
          <div>
            위의 4가지를 결정하신 후, 성함 / 연락처 / 픽업 날짜,시간과 함께
            편하신 곳으로 상담 요청 주시면 확인하는 대로 빠른 연락드리겠습니다 :
            )
          </div>

          <div>
            * 전화 예약 : 0507 - 1424 - 1945 / 카카오톡 : leeso0904 @이소케이크
          </div>

          <div>
            * 주문은 3~5일 전 상담 완료 부탁드리며, 주말 주문은 조금 더 빠르게
            마감이 되는 관계로 여유를 가지고 예약을 부탁드립니다.
          </div>

          <div>
            * 상담 완료 후 계좌 안내해드리며, 맞춤 수제 케이크는 선결제 후 제작
            진행되시는 점 참고 부탁드립니다.
          </div>

          <div>
            * 맞춤 수제작 특성상 하루 전 / 당일 취소는 불가함을 안내해 드립니다.
          </div>

          <div>
            * 케이크는 손상의 우려가 있어 직접 픽업을 원칙으로 합니다. 부득이
            배송을 원하시는 경우 지하철 택배 / 차량 배송으로만 받으실 수
            있습니다. ( 배송비용 별도 9,000원~2만원이상 )
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default GuideRice;
