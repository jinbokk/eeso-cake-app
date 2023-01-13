import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router";

const Coupon = () => {
  const [title, setTitle] = useOutletContext();

  useEffect(() => {
    setTitle("쿠폰 / 마일리지");
  }, []);

  return <div>Coupon</div>;
};

export default Coupon;
