import React from "react";
import Map from "../components/Map";
import { Row, Col, Container } from "react-bootstrap";

import "./css/Contact.css";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div>정보 입력하기</div>
          </Col>
          <Col>
            <div className="map_container">
              <Map />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
