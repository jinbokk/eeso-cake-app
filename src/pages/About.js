import React from "react";

import "./css/About.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Container className="about_container_top mt-5">
        <Row>
          <img className="about_banner_img" src="/images/banner.jpg" alt="" />
        </Row>

        <Row>
          <Col>
            <h2 style={{ textAlign: "center", margin: "50px 0" }}>
              안녕하세요, 이소케이크 입니다 :)
            </h2>
          </Col>
        </Row>

        <Row className="align-items-start">
          <Col lg={4}>
            <div className="about_text_container">
              이소케이크를 찾아주셔서 감사합니다
              <br />
              이소케이크는 주문제작 수제 디자인 케이크 전문점으로
              <br />
              <span className="text_accent">
                합성제,보존제,유화제 등을 사용하지 않고
              </span>
              <br />
              수시로 갓구워낸 시트와 유생크림만을 사용합니다.
              <br />
              언제나 좋은 재료로 정성껏 제작해드리고있습니다.
              <br />
            </div>
          </Col>

          <Col lg={4}>
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
            </div>
          </Col>

          <Col lg={4}>
            <div className="about_text_container">
              특별하고 소중한 기념일
              <br />
              예쁘고 맛까지 놓치지 않는 단 하나뿐인 케이크로 보답드리겠습니다.
              <br />
              <span className="text_accent">
                이소케이크와 함께 해 주세요 : )
              </span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <p style={{ textAlign: "end", marginTop: "50px" }}>
              대표 이소정 올림
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default About;
