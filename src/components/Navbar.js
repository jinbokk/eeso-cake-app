import React from "react";

import "./css/NavBar.css";

import NavMenu from "./NavMenu";

import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav_container_top">
      <div className="nav_container">
        <Link to="/">
          <div>
            <img className="main_logo" src="/images/logo_4.png" alt="" />
          </div>
        </Link>

        <Link to="/">
          <NavMenu title="HOME" />
        </Link>

        <Link to="/about">
          <NavMenu title="ABOUT" />
        </Link>

        <NavMenu
          title="CAKES"
          items={[
            {
              title: "RICE CAKES",
              image_url: "/images/rice_cake_icon.png",
              link: "/rice",
            },
            {
              title: "BREAD CAKES",
              image_url: "/images/bread_cake_icon.png",
              link: "/bread",
            },
            {
              title: "TART CAKES",
              image_url: "/images/tart_cake_icon.png",
              link: "/tart",
            },
          ]}
        />

        <NavMenu title="CONTACT" />
      </div>
    </div>
  );
};

export default NavBar;
