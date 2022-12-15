import React from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { Container, Row, Col } from "react-bootstrap";
import { MdLooksOne } from "react-icons/md";
import { MdLooksTwo } from "react-icons/md";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./css/guide.css";

const GuideBread = () => {
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
            <h1 className="mb-5 guide_title">빵 케이크 가이드</h1>
            <h3 className="mb-4 guide_sub_title">
              심플한 레터링 케이크부터 귀여운 피규어 케이크, 먹을 수 있는 포토
              케이크까지
            </h3>
            <h3 className="guide_sub_title">
              모든 순간, 모든 공간에 어울리는 이소케이크의 시그니처 케이크
            </h3>
          </Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <hr data-content="주문 전 안내사항" />
        </Row>

        <Row>
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
                부득이 배송을 원하시는 경우 지하철 택배 / 차량 배송으로만 받으실
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
                부탁드립니다 : )
              </div>
            </div>

            <div className="mb-3">
              <div>
                &#10004; 인물 사진, 디테일이 많이 필요한 그림 주문은 포토
                케이크를 추천드립니다.
              </div>
              <div className="opacity-50">
                핸드 페인팅 가능 여부는 원하시는 이미지 첨부해 주시면 안내를
                도와드리겠습니다
              </div>
            </div>

            <div className="mb-3">
              <div>&#10004; 100% 똑같은 색감이 아닐 수 있습니다.</div>
              <div className="opacity-50">
                보내주시는 사진을 참고하여 최대한 같게 색감을 제작해드리지만
                디스플레이 장치에 따라 보신 색감과 받아보시는 케이크의 색상이
                100% 똑같을 수는 없는 점 참고 부탁드립니다.
              </div>
            </div>

            <div className="mb-3">
              <div>
                &#10004; 레터링 빵 케이크는 픽업해 가신 후 빠른 시간 내에 냉장
                보관해 주셔야 합니다.
              </div>
              <div className="opacity-50">
                30분 이상 상온 노출 시 크림 갈라짐, 색 번짐이 발생할 수 있으며,
                이에 대한 책임은 지지 않습니다. <br />* 여름철 이동 시 아이스팩
                구매 추천드립니다. ( 개당 1,000원)
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
                src="/images/bread_cake_size/bread_cake_size_all.png"
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
                        src="/images/bread_cake_size/bread_cake_size_no1.png"
                        className="swiper_cakes_size_image"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="swiper_cakes_size_image_container">
                      <img
                        src="/images/bread_cake_size/bread_cake_size_no2.png"
                        className="swiper_cakes_size_image"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="swiper_cakes_size_image_container">
                      <img
                        src="/images/bread_cake_size/bread_cake_size_no3.png"
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
          <hr data-content="크림" />
        </Row>

        <Row>
          <Col
            md={12}
            className="d-flex flex-column justify-content-center align-items-center text-center"
          >
            <div className="mb-3">
              <div>겉 크림 : 크림치즈 크림</div>
              <div>속 크림 (샌드 크림) : 생크림</div>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="opacity-50 align-self-center">
                이소케이크에서는 동물성 생크림과 직접 굽는 빵시트,
              </div>
              <div className="opacity-50">
                필라델피아 크림치즈 등 좋은재료들로만 정성껏 제작해드립니다.
              </div>
            </div>
          </Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <hr data-content="시트" />
        </Row>

        <Row>
          <Col
            md={12}
            className="d-flex flex-column justify-content-center align-items-center text-center"
          >
            <div className="mb-3">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <span className="mx-1">옵션</span> <MdLooksOne size="24" />
              </div>
              <div className="mb-5">바닐라 빵시트 / 생크림 샌드 ( 기본형 )</div>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <span className="mx-1">옵션</span> <MdLooksTwo size="24" />
              </div>
              <div className="mb-3">
                초코 빵시트 / 초코 생크림 샌드 ( +3,000원 )
              </div>
            </div>
            <div className="accent">
              * 프랑스산 발로나 초코 파우더를 사용합니다 :)
            </div>
          </Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <hr />
        </Row>

        <Row>
          <Col className="px-5 d-flex justify-content-center align-items-center text-center">
            <div>위의 내용을 확인하신 후,</div>
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

export default GuideBread;
