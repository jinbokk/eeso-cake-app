import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router";
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Accordion from "react-bootstrap/Accordion";
import format from "date-fns/format";

import "../css/orderHistoryPage.css";
import { ko } from "date-fns/locale";

const OrderHistoryPage = () => {
  const [title, setTitle] = useOutletContext();
  const { authUserData } = useSelector((status) => status.user);

  useEffect(() => {
    setTitle("쇼핑 정보");
  }, []);

  return (
    // authUserData.isAuth 가 있으면 렌더하는 방식은
    // 유저가 뒤로가기를 눌렀을때 잠시 페이지가 보이는 현상이 발생한다.
    // 로드하지 않아도 되는 페이지를 로드하는 낭비가 발생하는 것이다.
    // 애초에 랜더 전에 auth로 인증을 하도록 구현해야 한다...
    <Container>
      <Row className="order_history_lookup justify-content-around">
        <Col xs={1} className="order_history_lookup_item">
          <div className="order_history_lookup_text">결제 완료</div>
          <div className="display-5">
            {authUserData.history &&
              authUserData.history.filter(
                (item) => item.status === "order_paid"
              ).length}
          </div>
        </Col>

        <Col
          xs={2}
          className="d-flex align-items-center justify-content-center"
        >
          <IoIosArrowForward className="order_history_lookup_arrow" />
        </Col>

        <Col xs={1} className="order_history_lookup_item">
          <div className="order_history_lookup_text">제작중</div>
          <div className="display-5">
            {authUserData.history &&
              authUserData.history.filter(
                (item) => item.status === "order_making"
              ).length}
          </div>
        </Col>

        <Col
          xs={2}
          className="d-flex align-items-center justify-content-center"
        >
          <IoIosArrowForward className="order_history_lookup_arrow" />
        </Col>

        <Col xs={1} className="order_history_lookup_item">
          <div className="order_history_lookup_text">픽업/배송대기</div>
          <div className="display-5">
            {authUserData.history &&
              authUserData.history.filter(
                (item) => item.status === "order_waiting_for_pickup"
              ).length}
          </div>
        </Col>

        <Col
          xs={2}
          className="d-flex align-items-center justify-content-center"
        >
          <IoIosArrowForward className="order_history_lookup_arrow" />
        </Col>

        <Col xs={1} className="order_history_lookup_item">
          <div className="order_history_lookup_text">픽업/배송완료</div>
          <div className="display-5">
            {authUserData.history &&
              authUserData.history.filter(
                (item) => item.status === "order_complete"
              ).length}
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="my-5">
          <div className="mb-4">
            * 주문하신 제품은 픽업 4일전까지 레터링 문구만 수정 가능합니다
          </div>
          <div>* 레터링 외 수정사항은 취소 후 재주문 부탁드립니다.</div>
        </Col>
      </Row>

      {/* 이하 결제 내역 */}

      <Row>
        {authUserData.history &&
          authUserData.history
            .slice(0)
            .reverse()
            .map((historyItems, index) => (
              <div key={index} className="order_card">
                <Row className="order_card_status text-start d-flex justify-content-between align-items-center mb-4">
                  <Col xs={12} lg={"auto"}>
                    <span className="me-2">
                      {historyItems.status === "order_paid"
                        ? "결제 완료"
                        : null}
                      {historyItems.status === "order_making" ? "제작중" : null}
                      {historyItems.status === "order_waiting_for_pickup"
                        ? "픽업 대기"
                        : null}
                      {historyItems.status === "order_complete"
                        ? "픽업 완료"
                        : null}
                      {historyItems.status === "order_waiting_for_cancel"
                        ? "취소 대기"
                        : null}
                      {historyItems.status === "order_canceled"
                        ? "취소 완료"
                        : null}
                    </span>
                  </Col>

                  <Col xs={12} lg={"auto"}>
                    <div className="order_card_info">
                      주문번호 {historyItems.merchant_uid}
                    </div>

                    <div className="order_card_info">
                      결제일자{" "}
                      {/* {format(new Date(historyItems.paymentDate), "yyyy-MM-dd", {
                      locale: ko,
                    })} */}
                      {historyItems.paymentDate.slice(0, 10)}
                      {/* DB상에 결제시간 그대로 들어 있음 */}
                    </div>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col xs={4} lg={"auto"} className="text-center">
                    <NavLink
                      to={`/order/detail/${historyItems.products[0].rootProductId}`}
                    >
                      <img
                        src={historyItems.products[0].image_url.replace(
                          "upload/",
                          "upload/q_20/"
                        )}
                        alt=""
                        className="order_card_image"
                      />
                    </NavLink>
                  </Col>
                  <Col
                    xs={8}
                    lg={"auto"}
                    className="d-flex flex-column justify-content-around align-items-start"
                  >
                    <div className="fw-bold">{historyItems.name}</div>

                    <div>
                      {historyItems.products[0].deliveryType} /{" "}
                      {historyItems.products[0].deliveryDateTime.stringType}
                    </div>

                    <div>
                      결제 금액 : {historyItems.amount.toLocaleString("ko-KR")}
                      원
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Accordion>
                    <Accordion.Item
                      eventKey={`top-${index}`}
                      className="order_card_accordion"
                    >
                      <Accordion.Header>상세보기</Accordion.Header>
                      <Accordion.Body>
                        {historyItems.products.map((orderProducts, index) => (
                          <Row className="py-4" key={index}>
                            <Col
                              lg={1}
                              className="text-center align-self-center p-0"
                            >
                              <div className="order_card_index_container">
                                <div>{index + 1}</div>
                              </div>
                            </Col>

                            <Col
                              lg={3}
                              className="py-3 text-center d-flex justify-content-center align-items-center"
                            >
                              <NavLink
                                to={`/order/detail/${orderProducts.rootProductId}`}
                              >
                                <img
                                  src={orderProducts.image_url.replace(
                                    "upload/",
                                    "upload/q_20/"
                                  )}
                                  alt=""
                                  className="order_card_image"
                                />
                              </NavLink>
                            </Col>

                            <Col lg={4} className="py-3">
                              <div className="fw-bold mb-2">
                                {orderProducts.title}
                              </div>
                              <div>
                                <div>
                                  레터링 추가 : {orderProducts.letteringToggle}
                                </div>
                                {orderProducts.letteringText ? (
                                  <div>
                                    레터링 문구 : {orderProducts.letteringText}
                                  </div>
                                ) : null}

                                <div>
                                  디자인토퍼 추가 :{" "}
                                  {orderProducts.designTopperToggle}
                                </div>
                                {orderProducts.designTopperText ? (
                                  <div>
                                    디자인토퍼 문구 :{" "}
                                    {orderProducts.designTopperText}
                                  </div>
                                ) : null}

                                {orderProducts.customerRequestText ? (
                                  <div>
                                    요청사항 :{" "}
                                    {orderProducts.customerRequestText}
                                  </div>
                                ) : null}
                              </div>
                            </Col>

                            <Col lg={4} className="align-self-center">
                              <div>
                                <div>
                                  주문 수량 : {orderProducts.quantity}개
                                </div>
                                <div>
                                  개당 금액 :{" "}
                                  {orderProducts.price.toLocaleString("ko-KR")}
                                  원
                                </div>
                              </div>
                            </Col>
                          </Row>
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Row>
              </div>
            ))}
      </Row>
    </Container>
  );
};

export default OrderHistoryPage;
