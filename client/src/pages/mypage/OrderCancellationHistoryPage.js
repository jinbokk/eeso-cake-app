import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router";
import { IoIosArrowForward } from "react-icons/io";

const OrderCancellationHistoryPage = () => {
  const [title, setTitle] = useOutletContext();
  const { authUserData } = useSelector((state) => state.user);

  useEffect(() => {
    setTitle("쇼핑 정보");
  }, []);

  return (
    <Container>
      <Row className="order_history_lookup justify-content-around">
        <Col xs={6} className="order_history_lookup_item border_right">
          <div className="order_history_lookup_text">취소요청</div>
          <div className="display-5">
            {
              authUserData.history.filter(
                (item) => item.state === "order_waiting_for_pickup"
              ).length
            }
          </div>
        </Col>

        <Col xs={6} className="order_history_lookup_item">
          <div className="order_history_lookup_text">취소완료</div>
          <div className="display-5">
            {
              authUserData.history.filter(
                (item) => item.state === "order_complete"
              ).length
            }
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
    </Container>
  );
};

export default OrderCancellationHistoryPage;
