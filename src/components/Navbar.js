import React from "react";
import "./css/Navbar.css";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav_container_top">
      <div className="nav_container">
        <Link to="/">
          <div>
            <img
              className="main_logo"
              src={require("../images/logo_4.png")}
              alt=""
            />
          </div>
        </Link>
  
        <Link to="/">
          <div>HOME</div>
        </Link>
  
        <Link to="/about">
          <div>ABOUT</div>
          <div>오시는길?</div>
        </Link>
  
        <Link to="/rice">
          <div>떡 케이크</div>
        </Link>
  
        <Link to="/figure">
          <div>피큐어 케이크</div>
        </Link>
  
        <Link to="/photo">
          <div>포토 케이크</div>
        </Link>
  
        <Link to="/design">
          <div>디자인 케이크</div>
        </Link>
  
        <Link to="/letter">
          <div>레터링 케이크</div>
        </Link>
  
        <Link to="/tart">
          <div>타르트</div>
        </Link>
  
        <div>CONTACT</div>
      </div>
    </div>
  );
};

export default Navbar;
