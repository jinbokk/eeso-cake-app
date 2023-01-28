import React from "react";
import Map from "../components/Map";

import "./css/contact.css";
import { Container, Row, Col } from "react-bootstrap";
import { GrNavigate } from "react-icons/gr";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "20px" }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
    >
      <Container className="contact_container">
        <Row className="align-items-center">
          <Col lg={7}>
            <Row className="mb-4">
              <div className="fw-bold mt-4">LOCATION / HOURS</div>
              <div>
                <a
                  href="https://map.naver.com/v5/search/%EC%9D%B4%EC%86%8C%EC%BC%80%EC%9D%B4%ED%81%AC/place/661959504?c=14147586.5818935,4542283.8149681,16.63,0,0,0,dh&placePath=%3Fentry%253Dbmp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location_link fw-bold"
                >
                  <GrNavigate style={{ marginRight: "10px" }} />
                  경기도 의정부시 민락동 754-7 (승지로30번길 20)
                </a>
              </div>
            </Row>

            <Row className="mb-4">
              <Map />
            </Row>

            <Row className="contact_text_container">
              <Col lg={6} className="mb-3">
                <div className="fw-bold text-danger">
                  가게 앞 정차 가능, 주차 불가
                </div>
                <div>대중교통 이용시</div>
                <div>
                  <span className="by_subway me-2">경전철 탑석역</span>
                  하차 후, 7분 내 도보 이동
                </div>
                <div>
                  <span className="by_bus me-2">청구아파트 버스정류소</span>
                  하차 후, 7분 내 도보 이동
                </div>
              </Col>
              <Col lg={6}>
                <div className="fw-bold text-danger">매주 월요일 휴무</div>
                <div>화요일 ~ 금요일 : 11:00 ~ 19:30</div>
                <div>토요일 : 10:00 ~ 16:00</div>
                <div>일요일 : 10:00 ~ 12:00</div>
              </Col>
            </Row>
          </Col>

          <Col
            lg={5}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <img
              src="/images/contact/contact.png"
              alt=""
              className="contact_image"
            />
            <div>홈페이지 주문 외, 모든 예약 문의 및 디자인 상담은 </div>
            <div>
              카카오톡 채널
              <a
                href="https://pf.kakao.com/_ZyKnd"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-2 link"
              >
                @이소케이크
              </a>
              로 진행 중 입니다
            </div>
            <div>이소케이크는 언제나 고객님의 연락을 기다리고 있습니다</div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default Contact;
