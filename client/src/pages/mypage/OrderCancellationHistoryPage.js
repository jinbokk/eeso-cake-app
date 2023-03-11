import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router";
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { RxDot, RxDotFilled } from "react-icons/rx";
import Accordion from "react-bootstrap/Accordion";
import format from "date-fns/format";
import { ko } from "date-fns/locale";
import moment from "moment";
import "moment/locale/ko";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import "../css/orderHistoryPage.css";
import { userActions } from "../../redux/actions/userActions";
import axios from "axios";
import HistorySearch from "../../components/HistorySearch";

dayjs.locale("ko");

const OrderCancellationHistoryPage = () => {
  // 1. 결제완료 : order_paid
  // 2. 제작중 : order_making
  // 3. 픽업 대기: order_waiting_for_pickup
  // 4. 픽업 완료: order_complete
  // 5. 취소 대기 : order_waiting_for_cancel
  // 6. 주문 취소 : order_cancelled

  const [title, setTitle] = useOutletContext();
  const { width } = useWindowDimensions();
  const { authUserData } = useSelector((state) => state.user);

  useLayoutEffect(() => {
    setTitle("쇼핑 정보");
  }, []);

  const findOrderHandler = async (imp_uid) => {
    let orderHistory = await axios
      .get(`/api/users/find-order`, { params: { imp_uid: imp_uid } })
      .then((res) => res.data);

    return orderHistory;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "20px" }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
    >
      <Container>
        <Row className="order_history_lookup justify-content-around">
          <Col xs={6} className="order_history_lookup_item border_right">
            <div className="order_history_lookup_text">취소대기</div>
            <div className="display-5">
              {
                authUserData.history.filter(
                  (item) => item.status === "order_waiting_for_cancel"
                ).length
              }
            </div>
          </Col>

          <Col xs={6} className="order_history_lookup_item">
            <div className="order_history_lookup_text">취소완료</div>
            <div className="display-5">
              {
                authUserData.history.filter(
                  (item) => item.status === "order_cancelled"
                ).length
              }
            </div>
          </Col>
        </Row>

        <Row>
          <HistorySearch />
        </Row>

        <Row className="my-5">
          {authUserData.history &&
            authUserData.history
              .slice(0)
              .reverse()
              .map(
                (historyItems, index) =>
                  historyItems.status === "order_waiting_for_cancel" ||
                  (historyItems.status === "order_cancelled" && (
                    <div key={index} className="order_card">
                      <Row className="order_card_status text-start d-flex justify-content-between align-items-center mb-4">
                        <Col
                          xs={12}
                          lg={"auto"}
                          className="d-flex flex-row justify-content-start align-items-center"
                        >
                          <div className="me-2 status_title">
                            <span>
                              <RxDotFilled
                                size={25}
                                // style={{ position: "relative", bottom: "2px" }}
                              />
                            </span>
                            {historyItems.status === "order_waiting_for_cancel"
                              ? "취소 대기"
                              : null}
                            {historyItems.status === "order_cancelled"
                              ? "주문 취소"
                              : null}
                          </div>
                        </Col>

                        <Col
                          xs={12}
                          lg={"auto"}
                          className={width < 992 ? "mt-4" : ""}
                        >
                          <div className="order_card_info">
                            주문번호 {historyItems.merchant_uid}
                          </div>

                          <div className="order_card_info">
                            결제일자{" "}
                            {/* {format(new Date(historyItems.paymentDate), "YYYY-MM-DD", {
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
                          {width < 992 ? (
                            <>
                              <div>{historyItems.products[0].deliveryType}</div>
                              <div>
                                {
                                  historyItems.products[0].deliveryDateTime
                                    .stringType
                                }
                              </div>
                            </>
                          ) : (
                            <div>
                              {historyItems.products[0].deliveryType} /{" "}
                              {
                                historyItems.products[0].deliveryDateTime
                                  .stringType
                              }
                            </div>
                          )}

                          <div>
                            결제 금액 :{" "}
                            {historyItems.amount.toLocaleString("ko-KR")}원
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
                              {historyItems.products.map(
                                (orderProducts, index) => (
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
                                        {orderProducts.size ? (
                                          <div>
                                            케이크 사이즈 : {orderProducts.size}
                                            <span className="disabled_text">
                                              {orderProducts.size === "2호"
                                                ? " (+15,000원)"
                                                : null}
                                              {orderProducts.size === "3호"
                                                ? " (+30,000원)"
                                                : null}
                                              {orderProducts.size ===
                                              "2단 (1호+3호)"
                                                ? " (+45,000원)"
                                                : null}
                                            </span>
                                          </div>
                                        ) : null}

                                        {orderProducts.sheet ? (
                                          <div>
                                            케이크 시트 : {orderProducts.sheet}
                                            <span className="disabled_text">
                                              {orderProducts.sheet ===
                                              "초코 시트"
                                                ? " (+3,000원)"
                                                : null}
                                            </span>
                                          </div>
                                        ) : null}

                                        {orderProducts.letteringToggle !==
                                        "추가하지 않기" ? (
                                          <div>
                                            <div>
                                              레터링 추가 :{" "}
                                              {orderProducts.letteringToggle}
                                            </div>
                                            {orderProducts.letteringText ? (
                                              <div>
                                                레터링 문구 :{" "}
                                                {orderProducts.letteringText}
                                              </div>
                                            ) : null}
                                          </div>
                                        ) : null}

                                        {orderProducts.designTopperToggle !==
                                        "추가하지 않기" ? (
                                          <div>
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
                                          주문 금액 :{" "}
                                          {orderProducts.price.toLocaleString(
                                            "ko-KR"
                                          )}
                                          원
                                        </div>
                                      </div>
                                    </Col>
                                  </Row>
                                )
                              )}

                              <Row className="pt-3">
                                {historyItems.status === "order_paid" ||
                                "order_making" ||
                                "order_waiting_for_pickup" ||
                                "order_complete" ? (
                                  <Col
                                    className="order_cancel_button text-center"
                                    onClick={() =>
                                      findOrderHandler(
                                        historyItems.imp_uid
                                      ).then((result) => {
                                        console.log("result::", result);
                                        if (result.success) {
                                          window.open(
                                            result.data.response.receipt_url,
                                            "_blank"
                                          );
                                        } else {
                                          return;
                                        }
                                      })
                                    }
                                  >
                                    결제영수증 조회
                                  </Col>
                                ) : null}

                                {historyItems.status === "order_cancelled" ? (
                                  <Col
                                    className="order_cancel_button text-center"
                                    onClick={() =>
                                      findOrderHandler(
                                        historyItems.imp_uid
                                      ).then((result) => {
                                        console.log("result::", result);
                                        if (result.success) {
                                          window.open(
                                            result.data.response
                                              .cancel_receipt_urls[0],
                                            "_blank"
                                          );
                                        } else {
                                          return;
                                        }
                                      })
                                    }
                                  >
                                    취소영수증 조회
                                  </Col>
                                ) : null}
                              </Row>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Row>
                    </div>
                  ))
              )}
        </Row>
        {/* <Row>
        <Col className="my-5">
          <div className="mb-4">
            * 주문하신 제품은 픽업 4일전까지 레터링 문구만 수정 가능합니다
          </div>
          <div>* 레터링 외 수정사항은 취소 후 재주문 부탁드립니다.</div>
        </Col>
      </Row> */}
      </Container>
    </motion.div>
  );
};

export default OrderCancellationHistoryPage;
