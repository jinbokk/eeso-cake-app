import React from "react";
import Map from "../components/Map";

import "./css/contact.css";
import { Container, Row, Col } from "react-bootstrap";

const Contact = () => {
  return (
    <>
      <div className="contact_container">
        <Row style={{ width: "100%" }}></Row>

        <Row className="align-items-center">
          <Col lg={5} className="d-flex justify-content-center">
            <img
              src="/images/contact/avatar.png"
              alt=""
              className="dummy_image"
            />
          </Col>

          <Col lg={7}>
            <div className="fw-bold">LOCATION / HOURS</div>
            <div>
              <a
                href="https://map.naver.com/v5/search/%EC%9D%B4%EC%86%8C%EC%BC%80%EC%9D%B4%ED%81%AC/place/661959504?c=14147586.5818935,4542283.8149681,16.63,0,0,0,dh&placePath=%3Fentry%253Dbmp"
                target="_blank"
                rel="noopener noreferrer"
                className="location_link fw-bold"
              >
                경기도 의정부시 민락동 754-7 (승지로30번길 20)
              </a>
            </div>

            <Map />

            <Row className="contact_text_container">
              <Col lg={6} className="mb-3">
                <div className="fw-bold">가게 앞 정차 가능, 주차 불가</div>
                <div>대중교통 이용시</div>
                <div>
                  의정부 <span className="by_subway">경전철 탑석역</span> 하차
                  후, 7분 내 도보 이동
                </div>
                <div>
                  의정부 <span className="by_bus">청구아파트 버스정류소</span>{" "}
                  하차 후, 7분 내 도보 이동
                </div>
              </Col>
              <Col lg={6}>
                <div className="fw-bold">매주 월요일 휴무</div>
                <div>화요일 ~ 금요일 : 11:00 ~ 19:30</div>
                <div>토요일 : 10:00 ~ 16:00</div>
                <div>일요일 : 10:00 ~ 12:00</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Contact;
