import React from "react";
import { Container, Row, Col } from "react-bootstrap";
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

        {/* <Row>
          <Col className="flex-row">
            <div className="subNav">HOME</div>
            <div className="subNav">MAP</div>
            <div className="subNav">GUIDE</div>
          </Col>
        </Row> */}

        <Container className="border_top py-5">
          <Row>
            <Col>
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
            <Col lg={4} xs={6} className="px-3">
              <div className="info_title mb-2">
                <img
                  src="/icons/footer/store.png"
                  alt=""
                  className="info_icon"
                />
                상호명
              </div>
              <div className="mb-4 info_text">이소케이크</div>

              <div className="info_title mb-2">
                <img
                  src="/icons/footer/license.png"
                  alt=""
                  className="info_icon"
                />
                사업자번호
              </div>
              <div className="mb-4 info_text">430 - 39 - 00287</div>
            </Col>

            <Col lg={4} xs={6} className="px-3">
              <div className="info_title mb-2">
                <img
                  src="/icons/footer/person.png"
                  alt=""
                  className="info_icon"
                />
                대표자명
              </div>
              <div className="mb-4 info_text">이소정</div>
              <div className="info_title mb-2">
                <img
                  src="/icons/footer/phone.png"
                  alt=""
                  className="info_icon"
                />
                전화번호
              </div>
              <div className="mb-4 info_text">0507 - 1424 - 1945</div>
            </Col>

            <Col lg={4} xs={12} className="px-3">
              <div className="info_title mb-2">
                <img
                  src="/icons/footer/time.png"
                  alt=""
                  className="info_icon"
                />
                영업 시간
              </div>
              <div className="mb-4 info_text">
                11:00 ~ 18:00 / 매주 월요일 휴무
              </div>
              <div className="info_title mb-2">
                <img
                  src="/icons/footer/location.png"
                  alt=""
                  className="info_icon"
                />
                위치
              </div>
              <div className="mb-4 info_text">
                경기 의정부시 승지로30번길 20 1층
              </div>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row className="copyright justify-content-end p-4">
            Copyright 2022. eesocake. All Right Reserved
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Footer;
