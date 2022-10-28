import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./css/Footer.css";

const Footer = () => {
  return (
    <>
      <Container className="footer_container_top">
        <Row>
          <Col md={12} lg={4} className="my-5">
            <div className="d-flex justify-content-center align-items-center">
              <div>
                <img
                  src="/icons/tasty.png"
                  alt=""
                  className="footer_banner_item_icon"
                />
              </div>
              <div>
                고급스러운 크림치즈의 맛
                <br />
                시럽 없이도 촉촉한 수제 빵시트
                <br />
                고소하고 담백한 우유 생크림
              </div>
            </div>
          </Col>

          <Col md={12} lg={4} className="my-5">
            <div className="d-flex justify-content-center align-items-center">
              <div>
                <img
                  src="/icons/calender.png"
                  alt=""
                  className="footer_banner_item_icon"
                />
              </div>
              <div>
                세상에 하나뿐인
                <br />
                고객님만의 케이크를
                <br />
                지금 바로 예약하세요
              </div>
            </div>
          </Col>

          <Col md={12} lg={4} className="my-5">
            <div className="d-flex justify-content-center align-items-center">
              <div>
                <img
                  src="/icons/cake.png"
                  alt=""
                  className="footer_banner_item_icon"
                />
              </div>
              <div>
                특별한 날,
                <br />
                고객님의 행복을 위해
                <br />
                최선을 다 하겠습니다
              </div>
            </div>
          </Col>
        </Row>

        {/* <Row>
          <Col className="flex-row">
            <div className="subNav">HOME</div>
            <div className="subNav">MAP</div>
            <div className="subNav">GUIDE</div>
          </Col>
        </Row> */}

        <Row className="info">
          <Col className="d-flex justify-content-center align-items-center">
            <div>
              <div style={{ color: "var(--bg-accent)" }}>상호명</div>
              <div>이소케이크</div>
            </div>
            <div>
              <div style={{ color: "var(--bg-accent)" }}>대표자명</div>
              <div>이소정</div>
            </div>
            <div>
              <div style={{ color: "var(--bg-accent)" }}>위치</div>
              <div>경기 의정부시 승지로30번길 20 1층</div>
            </div>
          </Col>

          <Col className="d-flex justify-content-center align-items-center">
            <div>
              <div style={{ color: "var(--bg-accent)" }}>전화번호</div>
              <div>0507 - 1424 - 1945</div>
            </div>
            <div>
              <div style={{ color: "var(--bg-accent)" }}>영업 시간</div>
              <div>11:00 ~ 18:00 / 매주 월요일 휴무</div>
            </div>
            <div>
              <div style={{ color: "var(--bg-accent)" }}>사업자번호</div>
              <div>430-39-00287</div>
            </div>
          </Col>
        </Row>
        <Row className="copyright justify-content-end">
          Copyright 2022. eesocake. All Right Reserved
        </Row>
      </Container>
    </>
  );
};

export default Footer;
