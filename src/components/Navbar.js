import React, { useEffect, useState } from "react";

import "./css/navbar.css";

import { NavLink } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import useWindowDimensions from "../hooks/useWindowDimensions";
import NavbarAside from "./NavbarAside";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { width, height } = useWindowDimensions();

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
  }, [scrolled]);

  let activeStyle = {
    color: "var(--bg-accent)",
  };

  return (
    <>
      <div
        className="nav_container_top"
        style={
          scrolled
            ? {
                boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.2)",
                transition: "box-shadow 0.3s",
              }
            : { boxShadow: "none", transition: "box-shadow 0.3s" }
        }
      >
        <div className="nav_container">
          {/* <div
          className={
            width < 992
              ? "nav_container mobile" + (toggleHandler ? " triggered" : "")
              : "nav_container"
          }
        > */}
          {width < 992 ? (
            <>
              <NavLink to="/">
                <div>
                  <img
                    src="/images/logo_test.png"
                    alt=""
                    className="main_logo"
                  />
                </div>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/">
                <div>
                  <img
                    src="/images/logo_test.png"
                    alt=""
                    className="main_logo"
                  />
                </div>
              </NavLink>

              <NavLink
                to="/"
                end
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                <div className="nav_menu">HOME</div>
              </NavLink>

              <NavLink
                to="/about"
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                <div className="nav_menu">ABOUT</div>
              </NavLink>

              <NavDropdown
                navMenu={{
                  mainTitle: "GUIDE",
                  flexDir: "col",
                  item: [
                    { subTitle: "RICE CAKE GUIDE", link: "/guide/rice" },
                    { subTitle: "BREAD CAKE GUIDE", link: "/guide/bread" },
                  ],
                }}
              />

              <NavDropdown
                navMenu={{
                  mainTitle: "CAKES",
                  flexDir: "col",
                  item: [
                    {
                      subTitle: "RICE CAKES",
                      link: "/cakes/rice",
                      imgSrc: "/images/rice_cake_icon.png",
                    },
                    {
                      subTitle: "BREAD CAKES",
                      link: "/cakes/bread",
                      imgSrc: "/images/bread_cake_icon.png",
                    },
                    {
                      subTitle: "TART CAKES",
                      link: "/cakes/tart",
                      imgSrc: "/images/tart_cake_icon.png",
                    },
                  ],
                }}
              />

              <NavLink
                to="/contact"
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                <div className="nav_menu">CONTACT</div>
              </NavLink>
            </>
          )}
        </div>
      </div>

      {width < 992 ? <NavbarAside /> : null}
    </>
  );
};

export default Navbar;
