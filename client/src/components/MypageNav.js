import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MypageNav = () => {
  let activeStyle = {
    color: "var(--bg-accent)",
  };

  return (
    <Container>
      <Row className="justify-content-around">
        <Col lg={12} xs={"auto"} className="my-4">
          <h5 className="fw-bold user-select-none">쇼핑 정보</h5>
          <div>
            <NavLink
              to="/user/mypage/order-history"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              주문 조회
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/user/mypage/order-cancellation-history"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              주문취소 현황
            </NavLink>
          </div>
        </Col>

        <Col lg={12} xs={"auto"} className="my-4">
          <h5 className="fw-bold user-select-none">쿠폰 / 마일리지</h5>
          <div>
            <NavLink
              to="/user/mypage/coupon"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              나의 쿠폰
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/user/mypage/mileage"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              나의 마일리지
            </NavLink>
          </div>
        </Col>

        <Col lg={12} xs={"auto"} className="my-4">
          <h5 className="fw-bold user-select-none">회원 정보</h5>
          <div>
            <NavLink
              to="/user/mypage/edit-profile"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              회원 정보 수정
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/user/mypage/unregister"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              회원 탈퇴
            </NavLink>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MypageNav;
