import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import PaymentNav from "../components/PaymentNav";

import { BiErrorCircle } from "react-icons/bi";

const PaymentFailurePage = () => {
  const { state } = useLocation();

  return (
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
              <BiErrorCircle size={130} className="text-danger" />
            </Col>
            <Col lg={12} className="text-danger fw-bold">
              <h4>결제 실패</h4>
            </Col>
          </Row>

          <Row className="justify-content-center py-4">
            <Col lg={12} className="text-center">
              {state.result.error_msg}
            </Col>
          </Row>

          <Row className="payment_result_button_container py-4">
            <Col lg={12} className="text-center">
              <NavLink to="/" className="payment_result_button">
                홈 화면으로 이동
              </NavLink>
              <NavLink to="/user/cart" className="payment_result_button">
                장바구니로 이동
              </NavLink>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default PaymentFailurePage;
