import React from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { MdLooksOne } from "react-icons/md";
import { MdLooksTwo } from "react-icons/md";
import { MdLooks3 } from "react-icons/md";
import { MdLooks4 } from "react-icons/md";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./css/guidePage.css";

const GuideRicePage = () => {
  const { width } = useWindowDimensions();

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

        <Row className="guide_text_container">
          <Col md={6}>
            <div className="mb-3">
              <div>
                &#10004; 현재 모든 주문은 전화 또는 카카오톡을 통해서 접수 중
                입니다.
              </div>
              <div className="opacity-50">
                맞춤 수제작 특성상 하루 전 / 당일 취소는 불가함을 안내해
                드립니다.
              </div>
            </div>

            <div className="mb-3">
              <div>&#10004; 주문은 3~5일 전 상담 완료 부탁드립니다. </div>
              <div className="opacity-50">
                주말 주문은 조금 더 빠르게 마감이 되는 관계로 여유를 가지고
                예약을 부탁드립니다.
              </div>
            </div>

            <div className="mb-3">
              <div>
                &#10004; 케이크는 손상의 우려가 있어 직접 픽업을 원칙으로
                합니다.
              </div>
              <div className="opacity-50">
                부득이 배송을 원하시는 경우 퀵 배송으로만 받으실
                수 있습니다.
              </div>
              <div className="opacity-50">
                ( 배송비 별도 9,000원~2만원이상 )
              </div>
            </div>

            <div className="mb-3">
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
            </div>
          </Col>

          <Col md={6}>
            <div className="mb-3">
              <div>
                &#10004; 색상 참조 외에 타 업체 디자인 참조는 하지 않습니다.
              </div>
              <div className="opacity-50">
                이소케이크의 홈페이지 또는 인스타그램 / 블로그 캡쳐본만을 첨부
                부탁드립니다
              </div>
            </div>

            <div className="mb-3">
              <div>&#10004; 100% 똑같은 색감이 아닐 수 있습니다.</div>
              <div className="opacity-50">
                보내주시는 사진을 참고하여 최대한 동일한 색감으로 제작 해 드리지만
                디스플레이 기기에 따라 사진과 실제 케이크의 색상이
                다를 수 있다는 것을 양해 부탁드립니다.
              </div>
            </div>

            <div className="mb-3">
              <div>
                &#10004; 떡 케이크는 최대 하루 동안, 실온 보관이 가능합니다.
              </div>
              <div className="opacity-50">
                케이크 수령 후, 떡이 굳기 전 (6시간 내) 드시는 것이 가장 맛이
                좋습니다. 드시고 남은 케이크는 떡과 앙금을 분리하시어, "떡은
                냉동 / 앙금은 냉장" 보관해주시면 더욱 오랫동안 맛을 유지할 수
                있습니다. (떡은 냉장 보관 시 굳게 되오니 주의해 주세요)
              </div>
            </div>
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
            <div className="text-center cake_design_text">
              케이크 위에 둥글게 꽃이 올라가는 디자인<br></br>
              특유의 풍성한 볼륨감으로<br></br>
              미니 사이즈, 1호 사이즈에 추천드립니다
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
            <div className="m-3">초승달 디자인</div>
            <div className="text-center cake_design_text">
              여백의 미를 살린 세련된 초승달 디자인<br></br>
              심플하지만 밋밋하지 않은 <br></br>
              케이크를 찾으시는 분들께 추천 드립니다
              <br></br>
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
            <div className="text-center cake_design_text">
              화려한 화관 모양의 디자인<br></br>
              3호, 4호 대형 사이즈에 추천드리며,<br></br>
              여러 조각 나누어 드셔도 아름다운 디자인 입니다
            </div>
          </Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <hr data-content="설기 맛 선택" />
        </Row>

        <Row className="cake_design_text">
          <Col md={12}>
            <div className="d-flex flex-column align-items-center justify-content-center my-3">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <div className="mx-1">옵션</div> <MdLooksOne size="24" />
              </div>
              <div>백설기 (기본설기)</div>
            </div>
          </Col>

          <Col md={12}>
            <div className="d-flex flex-column align-items-center justify-content-center my-3">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <div className="mx-1 align-items-center">옵션</div>{" "}
                <MdLooksTwo size="24" />
              </div>
              <div>흑임자 설기 (흑임자 잼 / 쿠앤크 색감)</div>
            </div>
          </Col>

          <Col md={12}>
            <div className="d-flex flex-column align-items-center justify-content-center my-3">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <div className="mx-1">옵션</div> <MdLooks3 size="24" />
              </div>
              <div>단호박 설기 (단호박 필링 / 노란 설기 )</div>
            </div>
          </Col>

          <Col md={12}>
            <div className="d-flex flex-column align-items-center justify-content-center my-3">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <div className="mx-1">옵션</div> <MdLooks4 size="24" />
              </div>
              <div>초코 설기 ( 초코칩 필링 / 브라운 설기 )</div>
            </div>
          </Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <hr data-content="패키지" />
        </Row>

        <Row className="cake_design_text">
          <Col md={12}>
            <div className="d-flex flex-column align-items-center justify-content-center my-3">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <span className="mx-1">옵션</span> <MdLooksOne size="24" />
              </div>
              <div> 종이 상자 패키지 (기본 패키지)</div>
            </div>
          </Col>

          <Col md={12}>
            <div className="d-flex flex-column align-items-center justify-content-center my-3">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <span className="mx-1">옵션</span> <MdLooksTwo size="24" />
              </div>
              <div> 투명 아크릴 패키지</div>
            </div>
          </Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <hr />
        </Row>

        <Row className="cake_design_text">
          <Col className="px-5 d-flex justify-content-center align-items-center text-center">
            <div>위 내용을 확인하신 후,</div>
            <div>성함 / 연락처 / 픽업 날짜 및 시간과 함께</div>
            <div>편하신 곳으로 상담 요청 주시면</div>
            <div>확인 후 빠른 연락드리겠습니다 : )</div>

            <div
              className="py-5 d-flex flex-column justify-content-center align-items-center"
              style={{ color: "var(--bg-accent)" }}
            >
              <div>전화 예약 : 0507 - 1424 - 1945</div>
              <div>카카오톡 : leeso0904 @이소케이크</div>
            </div>

            <div className="opacity-50">
              디자인 선택이 어려우시다면, 기념 내용을 말씀해주세요
              <br></br>상담 및 디자인 추천 드리겠습니다 : )
            </div>
            <div className="opacity-50 mt-2">
              ( ex : 여자친구 생일 케이크, 아이 돌잔치 케이크, 부모님 생신
              케이크 등등 )
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default GuideRicePage;
