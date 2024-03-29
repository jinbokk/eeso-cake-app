import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useOutletContext } from "react-router";
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { RxDot, RxDotFilled } from "react-icons/rx";
import Accordion from "react-bootstrap/Accordion";
import { motion } from "framer-motion";
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

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useOutletContext();
  const { authUserData } = useSelector((status) => status.user);
  const { width } = useWindowDimensions();

  useLayoutEffect(() => {
    setTitle("쇼핑 정보");
  }, []);

  const orderCancelHandler = (body) => {
    let confirm = window.confirm(
      "주문 취소시, 해당 결제건의 모든 주문이 취소됩니다.\n취소된 주문은 되돌릴 수 없으며 필요시 재주문을 해주셔야 합니다.\n\n주문을 취소하시겠습니까?"
    );

    if (confirm) {
      dispatch(userActions.orderCancel(body)).then((res) => {
        if (res.status === "cancelled") {
          window.alert("주문이 취소되었습니다.");
          dispatch(userActions.auth());
        }
      });
    } else {
      return;
    }
  };

  const findOrderHandler = async (imp_uid) => {
    let orderHistory = await axios
      .get(`/api/users/find-order`, { params: { imp_uid: imp_uid } })
      .then((res) => res.data);

    return orderHistory;
  };

  return (
    // authUserData.isAuth 가 있으면 렌더하는 방식은
    // 유저가 뒤로가기를 눌렀을때 잠시 페이지가 보이는 현상이 발생한다.
    // 로드하지 않아도 되는 페이지를 로드하는 낭비가 발생하는 것이다.
    // 애초에 랜더 전에 auth로 인증을 하도록 구현해야 한다...
    <motion.div
      initial={{ opacity: 0, y: "20px" }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
    >
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
            <div className="order_history_lookup_text">픽업 대기</div>
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
            <div className="order_history_lookup_text">픽업 완료</div>
            <div className="display-5">
              {authUserData.history &&
                authUserData.history.filter(
                  (item) => item.status === "order_complete"
                ).length}
            </div>
          </Col>
        </Row>

        <Row>
          <HistorySearch searchIndex={"paid"} />
        </Row>

        {/* 이하 결제 내역 */}

        <Row>
          {authUserData.history &&
            authUserData.history
              .slice(0)
              .reverse()
              .map((historyItems, index) =>
                historyItems.status === "order_paid" ||
                historyItems.status === "order_making" ||
                historyItems.status === "order_waiting_for_pickup" ||
                historyItems.status === "order_complete" ? (
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
                          {historyItems.status === "order_paid"
                            ? "결제 완료"
                            : null}
                          {historyItems.status === "order_making"
                            ? "제작중"
                            : null}
                          {historyItems.status === "order_waiting_for_pickup"
                            ? "픽업 대기"
                            : null}
                          {historyItems.status === "order_complete"
                            ? "픽업 완료"
                            : null}
                          {/* {historyItems.status === "order_waiting_for_cancel"
                        ? "취소 대기"
                        : null}
                      {historyItems.status === "order_cancelled"
                        ? "주문 취소"
                        : null} */}
                        </div>
                      </Col>

                      <Col
                        xs={12}
                        lg={"auto"}
                        className={width < 992 ? "mt-4" : ""}
                      >
                        <div className="order_card_info">
                          <span className="bubble">주문번호</span>{" "}
                          {historyItems.merchant_uid}
                        </div>

                        <div className="order_card_info">
                          <span className="bubble">결제일자</span>{" "}
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
                                            {orderProducts.sheet === "초코 시트"
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
                                    findOrderHandler(historyItems.imp_uid).then(
                                      (result) => {
                                        if (result.success) {
                                          window.open(
                                            result.data.response.receipt_url,
                                            "_blank"
                                          );
                                        } else {
                                          return;
                                        }
                                      }
                                    )
                                  }
                                >
                                  결제영수증 조회
                                </Col>
                              ) : null}

                              {historyItems.status === "order_paid" ? (
                                <Col
                                  className="order_cancel_button text-center"
                                  onClick={() =>
                                    orderCancelHandler({
                                      imp_uid: historyItems.imp_uid,
                                      merchant_uid: historyItems.merchant_uid,
                                    })
                                  }
                                >
                                  주문 취소
                                </Col>
                              ) : null}

                              {historyItems.status === "order_cancelled" ? (
                                <Col
                                  className="order_cancel_button text-center"
                                  onClick={() =>
                                    findOrderHandler(historyItems.imp_uid).then(
                                      (result) => {
                                        if (result.success) {
                                          window.open(
                                            result.data.response
                                              .cancel_receipt_urls[0],
                                            "_blank"
                                          );
                                        } else {
                                          return;
                                        }
                                      }
                                    )
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
                ) : null
              )}
        </Row>

        <Row className="my-5 info_text">
          <Row
            className="justify-content-center text-center mb-4"
            style={{ fontSize: "1.7rem", fontWeight: "bold" }}
          >
            주문상태 안내
          </Row>

          {width < 992 ? (
            <Table className="order_history_table">
              <thead className="text-center">
                <tr style={{ color: "var(--bg-accent)" }}>
                  <th style={{ width: "25%" }}>결제 완료</th>
                  <th style={{ width: "25%" }}>제작중</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <div>
                      주문 및 결제가 완료된 상태입니다. 결제일시 기준으로 24시간
                      내에 주문 취소 및 즉시 환불 처리가 가능합니다
                    </div>
                  </td>
                  <td>
                    <div style={{ lineHeight: "2rem" }}>
                      <div>
                        결제일시 기준으로 24시간 이후{" "}
                        <span className="text_emphasis">제작중</span> 상태로
                        자동 변경되며,{" "}
                        <span className="text_underline">
                          홈페이지 내 주문 변경 및 취소가 불가
                        </span>
                        합니다.
                        <br></br>
                        관련 문의 : 카카오톡{" "}
                        <a
                          href="https://pf.kakao.com/_ZyKnd"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link"
                        >
                          @이소케이크
                        </a>{" "}
                        채널
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>

              <thead className="text-center">
                <tr style={{ color: "var(--bg-accent)" }}>
                  <th style={{ width: "25%" }}>픽업 대기</th>
                  <th style={{ width: "25%" }}>픽업 완료</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <div style={{ lineHeight: "2rem" }}>
                      수령 당일,{" "}
                      <span className="text_emphasis">픽업 대기</span> 상태로
                      자동 변경됩니다
                    </div>
                  </td>
                  <td>
                    <div style={{ lineHeight: "2rem" }}>
                      예약하신 수령시간 이후,{" "}
                      <span className="text_emphasis">픽업 완료</span> 상태로
                      자동 변경됩니다
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <Table className="order_history_table">
              <thead className="text-center">
                <tr style={{ color: "var(--bg-accent)" }}>
                  <th style={{ width: "25%" }}>결제 완료</th>
                  <th style={{ width: "25%" }}>제작중</th>
                  <th style={{ width: "25%" }}>픽업 대기</th>
                  <th style={{ width: "25%" }}>픽업 완료</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <div>
                      주문 및 결제가 완료된 상태입니다. 결제일시 기준으로 24시간
                      내에 주문 취소 및 즉시 환불 처리가 가능합니다
                    </div>
                  </td>
                  <td>
                    <div style={{ lineHeight: "2rem" }}>
                      <div>
                        결제일시 기준으로 24시간 이후{" "}
                        <span className="text_emphasis">제작중</span> 상태로
                        자동 변경되며,{" "}
                        <span className="text_underline">
                          홈페이지 내 주문 변경 및 취소가 불가
                        </span>
                        합니다.
                        <br></br>
                        관련 문의 : 카카오톡{" "}
                        <a
                          href="https://pf.kakao.com/_ZyKnd"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link"
                        >
                          @이소케이크
                        </a>{" "}
                        채널
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ lineHeight: "2rem" }}>
                      수령 당일,{" "}
                      <span className="text_emphasis">픽업 대기</span> 상태로
                      자동 변경됩니다
                    </div>
                  </td>
                  <td>
                    <div style={{ lineHeight: "2rem" }}>
                      예약하신 수령시간 이후,{" "}
                      <span className="text_emphasis">픽업 완료</span> 상태로
                      자동 변경됩니다
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </Row>
      </Container>
    </motion.div>
  );
};

export default OrderHistoryPage;
