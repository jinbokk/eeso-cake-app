import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./css/footer.css";

const Footer = () => {
  return (
    <>
      <Container className="footer">
        <Container className="border_top py-4">
          <Row className="w-auto m-auto">
            <Col
              lg={4}
              xs={"auto"}
              className="d-flex align-items-center justify-content-start my-3"
            >
              <div>
                <img
                  src="/icons/tasty.png"
                  alt=""
                  className="banner_item_icon"
                />
              </div>
              <div className="banner_item_text">
                <div>WONDERFUL-TASTING CAKES</div>
                <div>
                  고급스러운 크림치즈의 맛과 촉촉한 수제 빵시트, 고소하고 담백한
                  우유 생크림
                </div>
              </div>
            </Col>

            <Col
              lg={4}
              xs={"auto"}
              className="d-flex align-items-center justify-content-start my-3"
            >
              <div>
                <img
                  src="/icons/calender.png"
                  alt=""
                  className="banner_item_icon"
                />
              </div>
              <div className="banner_item_text">
                <div>THE ONE AND ONLY CAKE FOR YOU</div>
                <div>
                  특별하고 소중한 날, 세상에 하나뿐인 고객님만의 케이크를 지금
                  바로 예약하세요
                </div>
              </div>
            </Col>

            <Col
              lg={4}
              xs={"auto"}
              className="d-flex align-items-center justify-content-start my-3"
            >
              <div>
                <img
                  src="/icons/cake.png"
                  alt=""
                  className="banner_item_icon"
                />
              </div>
              <div className="banner_item_text">
                <div>DO OUR BEST FOR YOU</div>
                <div>
                  이소케이크에서는 고객님의 행복을 위해 언제나 최선을 다
                  하겠습니다
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <Container className="border_top pb-5">
          <Row className="mb-2 pt-4 pb-5">
            <Col className="d-flex flex-row justify-content-between align-items-center">
              <div style={{ color: "gray" }}>
                <span style={{ fontSize: "0.7rem" }} className="px-3">
                  <NavLink to="/policy/terms">이용약관</NavLink>
                </span>
                <span style={{ fontSize: "0.7rem" }}>
                  <NavLink to="/policy/privacy-policy">
                    개인정보처리방침
                  </NavLink>
                </span>
              </div>

              <div className="link_container">
                <div>
                  <a
                    href="https://www.instagram.com/eeso_cake/?hl=ko"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/icons/instgram_mini.png"
                      alt=""
                      className="link_icon"
                    />
                  </a>
                </div>
                <div>
                  <a
                    href="https://blog.naver.com/eesocake"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/icons/naver_mini.png"
                      alt=""
                      className="link_icon"
                    />
                  </a>
                </div>
                <div>
                  <a
                    href="https://pf.kakao.com/_ZyKnd"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/icons/kakaotalk_mini.png"
                      alt=""
                      className="link_icon"
                    />
                  </a>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="w-auto m-auto info_container">
            <Col lg={3} xs={6} className="px-3">
              <div className="info_title mb-2">
                <img
                  src="/icons/footer/store.png"
                  alt=""
                  className="info_icon"
                />
                상호명
              </div>
              <div className="mb-5 info_text">이소케이크</div>

              <div className="info_title mb-2">
                <img
                  src="/icons/footer/license.png"
                  alt=""
                  className="info_icon"
                />
                사업자번호
              </div>
              <div className="mb-5 info_text">430 - 39 - 00287</div>
            </Col>

            <Col lg={3} xs={6} className="px-3">
              <div className="info_title mb-2">
                <img
                  src="/icons/footer/person.png"
                  alt=""
                  className="info_icon"
                />
                대표자명
              </div>
              <div className="mb-5 info_text">이소정</div>
              <div className="info_title mb-2">
                <img
                  src="/icons/footer/phone.png"
                  alt=""
                  className="info_icon"
                />
                전화번호
              </div>
              <div className="mb-5 info_text">0507 - 1424 - 1945</div>
            </Col>

            <Col lg={3} xs={6} className="px-3">
              <div className="info_title mb-2">
                <img
                  src="/icons/footer/time.png"
                  alt=""
                  className="info_icon"
                />
                영업 시간
              </div>
              <div className="mb-5 info_text">
                매주 월요일 휴무<br></br>화 ~ 금 : 11:00 ~ 19:30<br></br>토 :
                10:00 ~ 16:00<br></br>일 : 10:00 ~ 12:00
              </div>
            </Col>

            <Col lg={3} xs={6} className="px-3">
              <div className="info_title mb-2">
                <img
                  src="/icons/footer/location.png"
                  alt=""
                  className="info_icon"
                />
                위치
              </div>
              <div className="mb-5 info_text">
                경기도 의정부시 승지로30번길 20<br></br>
                <a
                  href="https://map.naver.com/v5/search/%EC%9D%B4%EC%86%8C%EC%BC%80%EC%9D%B4%ED%81%AC/place/661959504?c=14147586.5818935,4542283.8149681,16.63,0,0,0,dh&placePath=%3Fentry%253Dbmp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location_link"
                >
                  지도 보기
                </a>
              </div>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row className="copyright justify-content-end p-4">
            Copyright 2023. eesocake. All Right Reserved
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Footer;
