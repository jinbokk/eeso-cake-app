import React, { useEffect, useState } from "react";

import "./css/Navbar.css";

import { NavLink } from "react-router-dom";
import NavDropdown from "./NavDropdown";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expand, setExpand] = useState(false);

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

        <div
          // exact
          to="/cakes"
          className="nav_menu"
          onClick={() => setExpand(!expand)}
        >
          CAKES
        </div>

        <div>
          {expand && (
            <>
              <NavLink
                to="cakes/rice"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <div className="nav_item_container">
                  <img
                    src="/images/rice_cake_icon.png"
                    alt=""
                    className="nav_item_image"
                  />
                  <h3>RICE CAKES</h3>
                </div>
              </NavLink>

              <NavLink
                to="cakes/bread"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <div className="nav_item_container">
                  <img
                    src="/images/bread_cake_icon.png"
                    alt=""
                    className="nav_item_image"
                  />
                  <h3>BREAD CAKES</h3>
                </div>
              </NavLink>

              <NavLink
                to="cakes/tart"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <div className="nav_item_container">
                  <img
                    src="/images/tart_cake_icon.png"
                    alt=""
                    className="nav_item_image"
                  />
                  <h3>TART CAKES</h3>
                </div>
              </NavLink>
            </>
          )}
        </div>

        <NavLink
          to="/guide"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          onMouseEnter={() => {
            console.log("mouse enter");
          }}
        >
          <div className="nav_menu">GUIDE</div>
        </NavLink>

        <NavDropdown
          navMenu={{
            mainTitle: "TEST Main Title",
            item: [
              { subTitle: "TEST Sub Title1", path: "/test1" },
              { subTitle: "TEST Sub Title2", path: "/test2" },
              { subTitle: "TEST Sub Title3", path: "/test3" },
            ],
          }}
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
