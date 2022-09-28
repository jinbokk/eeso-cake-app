import React from "react";
import "../css/Navbar.css";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav_container">
      <Link to="/">
        <div>로고이미지 자리</div>
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

      <Link to="/special">
        <div>스페셜 케이크</div>
      </Link>

      <Link to="/tart">
        <div>타르트</div>
      </Link>

      <div>CONTACT</div>
    </div>
  );
};

export default Navbar;
