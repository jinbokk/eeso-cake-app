import React, { useEffect, useState } from "react";

import "./css/Navbar.css";

import NavMenu from "./NavMenu";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll === 0) {
      setScrolled(false);
    } else if (currentScroll > 0) {
      setScrolled(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, handleScroll]);

  let activeStyle = {
    color: "var(--bg-accent)",
  };

  return (
    <div
      className="nav_container_top"
      style={
        scrolled
          ? {
              boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.2)",
              transition: "0.3s",
            }
          : { boxShadow: "none", transition: "0.3s" }
      }
    >
      <div className="nav_container">
        <NavLink to="/">
          <div>
            <img className="main_logo" src="/images/logo_test.png" alt="" />
          </div>
        </NavLink>

        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <div className="nav_menu">HOME</div>
        </NavLink>

        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <div className="nav_menu">ABOUT</div>
        </NavLink>

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

        <NavLink
          to="/contact"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <div className="nav_menu">CONTACT</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
