import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import NavDropdown from "./NavDropdown";

import Accordion from "react-bootstrap/Accordion";
// import "./css/custom.scss";

const NavbarAside = () => {
  const [toggleHandler, setToggleHandler] = useState(false);

  let activeStyle = {
    color: "var(--bg-accent)",
  };

  return (
    <>
      <span
        className="nav_mobile_bar_container"
        onClick={() => setToggleHandler((prev) => !prev)}
      >
        <span
          className={toggleHandler ? "nav_mobile_bar close" : "nav_mobile_bar"}
        ></span>
      </span>

      <Container
        fluid
        className={
          toggleHandler
            ? "nav_mobile_container triggered"
            : "nav_mobile_container"
        }
      >
        <Row>
          <Col className="align-items-center">
            <NavLink to="/" onClick={() => setToggleHandler(false)}>
              <div>
                <img src="/images/logo_test.png" alt="" className="main_logo" />
              </div>
            </NavLink>
          </Col>
        </Row>

        <Row>
          <Col className="mt-3">
            <Accordion defaultActiveKey={["0"]}>
              <Accordion.Item eventKey="0">
                <NavLink
                  to="/"
                  end
                  style={({ isActive }) => (isActive ? activeStyle : null)}
                  onClick={() => setToggleHandler(false)}
                >
                  <div className="nav_menu">HOME</div>
                </NavLink>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <NavLink
                  to="/about"
                  style={({ isActive }) => (isActive ? activeStyle : null)}
                  onClick={() => setToggleHandler(false)}
                >
                  <div className="nav_menu">ABOUT</div>
                </NavLink>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>GUIDE</Accordion.Header>
                <Accordion.Body>
                  <NavLink
                    to="/guide/rice"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                    onClick={() => setToggleHandler(false)}
                  >
                    <div className="nav_menu">RICE CAKE GUIDE</div>
                  </NavLink>

                  <NavLink
                    to="/guide/bread"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                    onClick={() => setToggleHandler(false)}
                  >
                    <div className="nav_menu">BREAD CAKE GUIDE</div>
                  </NavLink>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>CAKES</Accordion.Header>
                <Accordion.Body>
                  <NavLink
                    to="/cakes/rice"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                    onClick={() => setToggleHandler(false)}
                  >
                    <div className="nav_menu">RICE CAKES</div>
                  </NavLink>

                  <NavLink
                    to="/cakes/bread"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                    onClick={() => setToggleHandler(false)}
                  >
                    <div className="nav_menu">BREAD CAKES</div>
                  </NavLink>

                  <NavLink
                    to="/cakes/tart"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                    onClick={() => setToggleHandler(false)}
                  >
                    <div className="nav_menu">TART CAKES</div>
                  </NavLink>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <NavLink
                  to="/contact"
                  style={({ isActive }) => (isActive ? activeStyle : null)}
                  onClick={() => setToggleHandler(false)}
                >
                  <div className="nav_menu">CONTACT</div>
                </NavLink>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="util_containerAside">
              <div>
                <a
                  href="https://www.instagram.com/eeso_cake/?hl=ko"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/icons/instgram_mini.png"
                    alt=""
                    className="link_icon"
                  />
                </a>
              </div>
              <div>
                <a
                  href="https://blog.naver.com/eesocake"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/icons/naver_mini.png"
                    alt=""
                    className="link_icon"
                  />
                </a>
              </div>
              <div>
                <a
                  href="https://pf.kakao.com/_ZyKnd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/icons/kakaotalk_mini.png"
                    alt=""
                    className="link_icon"
                  />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NavbarAside;
