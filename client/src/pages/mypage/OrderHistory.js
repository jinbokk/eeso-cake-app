import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router";
import { IoIosArrowForward } from "react-icons/io";

const OrderHistory = () => {
  const [title, setTitle] = useOutletContext();

  useEffect(() => {
    setTitle("쇼핑 정보");
  }, []);

  return (
    <Container>
      <Row className="order_history_lookup justify-content-around">
        <Col xs={1} className="order_history_lookup_item">
          <div className="order_history_lookup_text">결제 완료</div>
          <div className="display-5">0</div>
        </Col>

        <Col
          xs={2}
          className="d-flex align-items-center justify-content-center"
        >
          <IoIosArrowForward className="order_history_lookup_arrow" />
        </Col>

        <Col xs={1} className="order_history_lookup_item">
          <div className="order_history_lookup_text">제작중</div>
          <div className="display-5">0</div>
        </Col>

        <Col
          xs={2}
          className="d-flex align-items-center justify-content-center"
        >
          <IoIosArrowForward className="order_history_lookup_arrow" />
        </Col>

        <Col xs={1} className="order_history_lookup_item">
          <div className="order_history_lookup_text">픽업/배송대기</div>
          <div className="display-5">0</div>
        </Col>

        <Col
          xs={2}
          className="d-flex align-items-center justify-content-center"
        >
          <IoIosArrowForward className="order_history_lookup_arrow" />
        </Col>

        <Col xs={1} className="order_history_lookup_item">
          <div className="order_history_lookup_text">픽업/배송완료</div>
          <div className="display-5">0</div>
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
    </Container>
  );
};

export default OrderHistory;
