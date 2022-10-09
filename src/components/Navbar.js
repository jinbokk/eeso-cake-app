import React from "react";

import "./css/Navbar.css";

import NavMenu from "./NavMenu";

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

        <Link to="/">
          <div className="nav_menu">HOME</div>
        </Link>

        <Link to="/about">
          <div className="nav_menu">ABOUT</div>
        </Link>

        <NavMenu
          title="CAKES"
          items={[
            {
              title: "RICE CAKES",
              image_url: "/images/rice_cake_icon.png",
              link: "rice",
            },
            {
              title: "BREAD CAKES",
              image_url: "/images/bread_cake_icon.png",
              link: "bread",
            },
            {
              title: "TART CAKES",
              image_url: "/images/tart_cake_icon.png",
              link: "tart",
            },
          ]}
        />

        <Link to="/contact">
          <div className="nav_menu">CONTACT</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
