import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router";
import MypageNav from "../components/MypageNav";
import useWindowDimensions from "../hooks/useWindowDimensions";

import "./css/myPage.css";

const MyPage = () => {
  const [title, setTitle] = useState("");
  const { width } = useWindowDimensions();

  return (
    <Container>
      {width > 992 ? (
        <Row className="text-center py-4">
          <h1 className="mypage_title">{title}</h1>
        </Row>
      ) : null}

      <Row>
        <Col lg={3}>
          <MypageNav />
        </Col>

        {width < 992 ? (
          <Row className="text-center">
            <h1 className="mypage_title">{title}</h1>
          </Row>
        ) : null}

        <Col lg={9}>
          <Outlet context={[title, setTitle]} />
        </Col>
      </Row>
    </Container>
  );
};

export default MyPage;
