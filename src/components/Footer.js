import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./css/Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <Container className="border_top py-4">
          <Row style={{ width: "90%", margin: "auto" }}>
            <Col
              lg={4}
              className="d-flex align-items-center justify-content-start my-3"
            >
              <div>
                <img
                  src="/icons/tasty.png"
                  alt=""
                  className="footer_banner_item_icon"
                />
              </div>
              <div className="footer_banner_item_text">
                <div>WONDERFUL-TASTING CAKES</div>
                <div>
                  고급스러운 크림치즈의 맛과 촉촉한 수제 빵시트, 고소하고 담백한
                  우유 생크림
                </div>
              </div>
            </Col>

            <Col
              lg={4}
              className="d-flex align-items-center justify-content-start my-3"
            >
              <div>
                <img
                  src="/icons/calender.png"
                  alt=""
                  className="footer_banner_item_icon"
                />
              </div>
              <div className="footer_banner_item_text">
                <div>THE ONE AND ONLY CAKE FOR YOU</div>
                <div>
                  특별하고 소중한 날, 세상에 하나뿐인 고객님만의 케이크를 지금
                  바로 예약하세요
                </div>
              </div>
            </Col>

            <Col
              lg={4}
              className="d-flex align-items-center justify-content-start my-3"
            >
              <div>
                <img
                  src="/icons/cake.png"
                  alt=""
                  className="footer_banner_item_icon"
                />
              </div>
              <div className="footer_banner_item_text">
                <div>DO OUR BEST FOR YOU</div>
                <div>
                  이소케이크에서는 고객님의 행복을 위해 언제나 최선을 다
                  하겠습니다
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* <Row>
          <Col className="flex-row">
            <div className="subNav">HOME</div>
            <div className="subNav">MAP</div>
            <div className="subNav">GUIDE</div>
          </Col>
        </Row> */}

        <Container className="border_top">
          <Row>
            <Col lg={6} className="p-5">
              <p>
                <div style={{ color: "var(--bg-accent)" }}>상호명</div>
                <div>이소케이크</div>
              </p>
              <p>
                <div style={{ color: "var(--bg-accent)" }}>대표자명</div>
                <div>이소정</div>
              </p>
              <p>
                <div style={{ color: "var(--bg-accent)" }}>위치</div>
                <div>경기 의정부시 승지로30번길 20 1층</div>
              </p>
            </Col>

            <Col lg={6} className="p-5">
              <p>
                <div style={{ color: "var(--bg-accent)" }}>전화번호</div>
                <div>0507 - 1424 - 1945</div>
              </p>
              <p>
                <div style={{ color: "var(--bg-accent)" }}>영업 시간</div>
                <div>11:00 ~ 18:00 / 매주 월요일 휴무</div>
              </p>
              <p>
                <div style={{ color: "var(--bg-accent)" }}>사업자번호</div>
                <div>430 - 39 - 00287</div>
              </p>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row className="copyright justify-content-end p-5">
            Copyright 2022. eesocake. All Right Reserved
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Footer;
