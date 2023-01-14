import React from "react";

import "./css/about.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "20px" }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
    >
      <Container className="about_container_top">
        <Row>
          <Col>
            <h2 style={{ textAlign: "center", margin: "50px 0" }}>
              안녕하세요, 이소케이크 입니다
            </h2>
          </Col>
        </Row>

        <Row className="mb-5 justify-content-center">
          <img className="about_banner_img" src="/images/banner.jpg" alt="" />
        </Row>

        <Row style={{ width: "35%", minWidth: "350px", margin: "0 auto" }}>
          <Col lg={12}>
            <div className="about_text_container">
              이소케이크를 찾아주셔서 감사합니다
              <br />
              이소케이크는 주문제작 수제 디자인 케이크 전문점으로
              <br />
              <span className="text_accent">
                합성제, 보존제, 유화제 등을 사용하지 않고
              </span>
              수시로 갓구워낸 시트와 유생크림만을 사용합니다. 언제나 좋은 재료로
              정성껏 제작해 드리고 있습니다.
            </div>
          </Col>

          <Col lg={12}>
            <div className="about_text_container">
              어린이집 / 유치원 케이크, 피규어 케이크, 포토 케이크, 숫자 타르트,
              앙금 플라워 떡케이크, 생화 및 웨딩 케이크 등 남녀노소 구분없이
              모두가 만족하는
              <span className="text_accent">여러가지 디자인</span>의 케이크
              포트폴리오를 보유하고 있습니다
            </div>
          </Col>

          <Col lg={12}>
            <div className="about_text_container">
              특별하고 소중한 기념일
              <br />
              예쁘고 맛있는, 단 하나뿐인 케이크로 보답 드리겠습니다.
              <span className="text_accent">
                이소케이크와 함께 해 주세요 : )
              </span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div style={{ textAlign: "end", padding: "50px" }}>
              대표 이소정 올림
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default About;
