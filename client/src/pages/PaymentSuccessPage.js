import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import format from "date-fns/format";
import { ko } from "date-fns/locale";
import PaymentNav from "../components/PaymentNav";

import { BsCheck2Circle } from "react-icons/bs";

import "./css/PaymentSuccessPage.css";
import { NavLink } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      window.alert("잘못된 접근입니다. 홈 화면으로 이동합니다.");
      navigate("/", { replace: true });
    }
  }, []);

  console.log("state::", state);
  return (
    <>
      {!state ? null : (
        <>
          <h1 className="payment_result_title">주문 결과</h1>

          <Container className="py-5">
            <Row className="mb-4">
              <Col className="order_navigation">
                <PaymentNav status={"complete"} />
              </Col>
            </Row>

            <div className="payment_result_container p-5">
              <Row className="text-center py-4">
                <Col lg={12}>
                  <BsCheck2Circle size={130} className="text-success" />
                </Col>
                <Col lg={12} className="text-success fw-bold">
                  <h4>결제 성공</h4>
                </Col>
              </Row>

              <Row className="justify-content-center py-4">
                <Col lg={12} className="text-center">
                  주문 번호 : {state.result.merchant_uid}
                </Col>
                <Col lg={12} className="text-center">
                  제품명 : {state.result.name}
                </Col>
                <Col lg={12} className="text-center">
                  결제금액 : {state.result.paid_amount.toLocaleString("ko-KR")}{" "}
                  원
                </Col>
              </Row>

              <Row className="payment_result_button_container py-4">
                <Col lg={12} className="text-center">
                  <a
                    href={state.result.receipt_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="payment_result_button"
                  >
                    영수증 조회
                  </a>
                </Col>
                <Col lg={12} className="text-center">
                  <NavLink
                    to="/user/mypage/order-history"
                    className="payment_result_button"
                  >
                    마이페이지로 이동
                  </NavLink>
                </Col>
              </Row>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default PaymentSuccessPage;
