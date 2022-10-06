import React, { useState } from "react";
import "./css/Navbar.css";

import NavMenu from "./NavMenu";
import NavItem from "./NavItem";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav_container_top">
      <div className="nav_container">
        <Link to="/">
          <div>
            <img className="main_logo" src="/images/logo_4.png" alt="" />
          </div>
        </Link>

        <NavMenu
          props={{
            title: "HOME",
          }}
        />

        <NavMenu
          props={{
            title: "ABOUT",
          }}
        />

        <NavMenu
          props={{
            title: "CAKES",
            img_url: {
              rice_image_url: "/images/logo_4.png",
              bread_image_url: "/images/logo_4.png",
              tart_image_url: "/images/logo_4.png",
            },
          }}
        />

        <NavMenu
          props={{
            title: "CONTACT",
            img_url: "/images/logo_4.png",
          }}
        />
      </div>
    </div>

    // <Link to="/rice">
    //   <div>떡 케이크</div>
    // </Link>

    // <Link to="/figure">
    //   <div>피큐어 케이크</div>
    // </Link>

    // <Link to="/photo">
    //   <div>포토 케이크</div>
    // </Link>

    // <Link to="/design">
    //   <div>디자인 케이크</div>
    // </Link>

    // <Link to="/letter">
    //   <div>레터링 케이크</div>
    // </Link>

    // <Link to="/tart">
    //   <div>타르트</div>
    // </Link>
  );
};

export default Navbar;
