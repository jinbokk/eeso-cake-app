import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router";

const CouponPage = () => {
  const [title, setTitle] = useOutletContext();

  useEffect(() => {
    setTitle("쿠폰 / 마일리지");
  }, []);

  return <div>해당 기능은 준비 중입니다. 조금만 기다려 주세요 :)</div>;
};

export default CouponPage;
