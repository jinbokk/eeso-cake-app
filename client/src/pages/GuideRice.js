import React from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./css/guide.css";

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
    <motion.div
      initial={{ opacity: 0, y: "20px" }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
    >
      <Container className="guide_container w-60 p-5">
        <Row>
          <Col className="text-center">
            <h1 className="mb-5 guide_title">떡 케이크 가이드</h1>
            <h3 className="guide_sub_title">
              설기떡 위에 앙금으로 만든 꽃을 올린 아름다운 케이크
            </h3>
          </Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <hr data-content="주문 전 안내사항" />
        </Row>

        <Row>
          <Col md={6}>
            <p>
              <div>
                &#10004; 현재 모든 주문은 전화 또는 카카오톡을 통해서 접수 중
                입니다.
              </div>
              <div className="opacity-50">
                맞춤 수제작 특성상 하루 전 / 당일 취소는 불가함을 안내해
                드립니다.
              </div>
            </p>
            <p>
              <div>&#10004; 주문은 3~5일 전 상담 완료 부탁드립니다. </div>
              <div className="opacity-50">
                주말 주문은 조금 더 빠르게 마감이 되는 관계로 여유를 가지고
                예약을 부탁드립니다.
              </div>
            </p>
            <p>
              <div>
                &#10004; 케이크는 손상의 우려가 있어 직접 픽업을 원칙으로
                합니다.
              </div>

              <div className="opacity-50">
                부득이 배송을 원하시는 경우 지하철 택배 / 차량 배송으로만 받으실
                수 있습니다.
              </div>
              <div className="opacity-50">
                ( 배송비용 별도 9,000원~2만원이상 )
              </div>
            </p>
            <p>
              <div>
                &#10004; 원하시는 디자인 설명 없이 가격만 문의하시면 안내를
                해드릴 수 없습니다.
              </div>
              <div className="opacity-50">
                모든 케이크는 디자인에 따라 가격이 다르기 때문에,
              </div>
              <div className="opacity-50">
                원하시는 디자인을 필히 사진 또는 손그림 첨부해주세요!
              </div>
            </p>
          </Col>

          <Col md={6}>
            <p>
              <div>
                &#10004; 색상 참조 외에 타 업체 디자인 참조는 하지 않습니다.
              </div>

              <div className="opacity-50">
                이소케이크의 홈페이지 또는 인스타그램 / 블로그 캡쳐본만을 첨부
                부탁드립니다 : )
              </div>
            </p>

            <p>
              <div>&#10004; 100% 똑같은 색감이 아닐 수 있습니다.</div>

              <div className="opacity-50">
                보내주시는 사진을 참고하여 최대한 같게 색감을 제작해드리지만
                디스플레이 장치에 따라 보신 색감과 받아보시는 케이크의 색상이
                100% 똑같을 수는 없는 점 참고 부탁드립니다.
              </div>
            </p>
            <p>
              <div>
                &#10004; 떡 케이크는 최대 하루 동안, 실온 보관이 가능합니다.
              </div>
              <div className="opacity-50">
                케이크 수령 후, 떡이 굳기 전 (6시간 내) 드시는 것이 가장 맛이
                좋습니다. 드시고 남은 케이크는 떡과 앙금을 분리하시어, "떡은
                냉동 / 앙금은 냉장" 보관해주시면 더욱 오랫동안 맛을 유지할 수
                있습니다. (떡은 냉장 보관 시 굳게 되오니 주의해 주세요)
              </div>
            </p>
          </Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <hr data-content="사이즈" />
        </Row>

        <Row>
          <Col>
            {width > 992 ? (
              <img
                src="/images/rice_cake_size/rice_cake_size_all.png"
                className="cakes_size_image"
                alt=""
              />
            ) : (
              <div>
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
              </div>
            )}
          </Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <hr data-content="디자인" />
        </Row>

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
            <div className="text-center">
              케이크 윗면에 전체적으로 꽃이 올라가는 디자인! 미니, 1호 사이즈에
              추천드리는 디자인입니다 풍성해 보이는 디자인.
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
            <div className="m-3">초승달트 디자인</div>
            <div className="text-center">
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
            <div className="text-center">
              3,4호 대형 사이즈에 추천드리는 디자인입니다 화려한 화관 스타일의
              케이크! 여러 조각 나누어 드셔도 예쁨을 최대한 남길 수 있는 디자인.
            </div>
          </Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <hr data-content="설기 맛 선택" />
        </Row>

        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-center my-3">
              백설기 (기본설기)
            </div>
          </Col>

          <Col md={12}>
            <div className="d-flex justify-content-center my-3">
              *BEST 흑임자 설기 (흑임자 잼 / 쿠앤크 색감)
            </div>
          </Col>

          <Col md={12}>
            <div className="d-flex justify-content-center my-3">
              단호박 설기 (단호박 필링 / 노란 설기 )
            </div>
          </Col>

          <Col md={12}>
            <div className="d-flex justify-content-center my-3">
              초코 설기 ( 초코칩 필링 / 브라운 설기 )
            </div>
          </Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <hr data-content="패키지" />
        </Row>

        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-center my-3">
              종이 상자 패키지 (기본 패키지)
            </div>
          </Col>

          <Col md={12}>
            <div className="d-flex justify-content-center my-3">
              투명 상자 패키지
            </div>
          </Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <hr />
        </Row>

        <Row>
          <Col className="px-5 d-flex justify-content-center align-items-center text-center">
            <p>위의 내용을 확인하신 후,</p>
            <p>
              성함 / 연락처 / 픽업 날짜 및 시간과 함께 편하신 곳으로 상담 요청
              주시면
            </p>
            <p>확인 후 빠른 연락드리겠습니다 : )</p>

            <div
              className="py-5 d-flex flex-column justify-content-center align-items-center"
              style={{ color: "var(--bg-accent)" }}
            >
              <p>전화 예약 : 0507 - 1424 - 1945</p>
              <p>카카오톡 : leeso0904 @이소케이크</p>
            </div>

            <div className="opacity-50">
              디자인 선택이 어려우시다면, 기념 내용을 말씀해주세요~ 제가 몇 가지
              추천도 해드릴게요 : )
            </div>
            <div className="opacity-50">
              ( ex : 여자친구 생일 케이크, 아이 돌잔치 케이크, 부모님 생신
              케이크 등등 )
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default GuideRice;
