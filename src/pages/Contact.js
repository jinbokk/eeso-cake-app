import React from "react";
import Map from "../components/Map";

import "./css/Contact.css";
import Footer from "../components/Footer";
import { Container, Row, Col } from "react-bootstrap";

const Contact = () => {
  return (
    <>
      <Container className="contact_container">
        <Row style={{ width: "100%" }}>
          <hr data-content="오시는 길 안내" />
        </Row>

        <Row>
          <Col>
            <h2>경기도 의정부시 민락동 754-7 (승지로30번길 20) </h2>
            <div>
              자차 이용시 가게 앞 정차 가능하오나, 공간이 협소하여 불가할 수
              있습니다
            </div>
            <Map />
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <div>대중교통 이용시</div>
            <div>
              의정부 <span className="by_subway">경전철 탑석역</span> 하차 후,
              7분 내 도보 이동
            </div>
            <div>
              의정부 <span className="by_bus">청구아파트 버스정류소</span> 하차
              후, 7분 내 도보 이동
            </div>
            {/* <div>대중교통 이용시 </div>
            <div>
              <div>지하철 이용시</div>
              <img
                src="/images/contact/subway.png"
                alt=""
                style={{ width: "300px" }}
              />
              <div>의정부 경전철 탑석역 하차 후, </div>
              <div>부용초등학교 후문쪽 상가 1층</div>
            </div>
            <div>
              <div>버스 이용시</div>
              <div></div>
            </div> */}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
