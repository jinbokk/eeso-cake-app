import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router";

const OrderCancellationHistory = () => {
  const [title, setTitle] = useOutletContext();

  useEffect(() => {
    setTitle("쇼핑 정보");
  }, []);

  return <div>OrderCancellationHistory</div>;
};

export default OrderCancellationHistory;
