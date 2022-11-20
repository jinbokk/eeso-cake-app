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
            : {
                boxShadow: "rgba(99, 99, 99, 0.3) 0px 2px 8px 0px",
                transition: "box-shadow 0.3s",
              }
        }
      >
        <div className="nav_container">
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

              <div>
                <div className="util_container">
                  <div className="user_container mx-5">
                    <NavLink
                      to="/login"
                      style={({ isActive }) => (isActive ? activeStyle : null)}
                    >
                      LOGIN
                    </NavLink>
                    <span className="mx-2">/</span>
                    <NavLink
                      to="/register"
                      style={({ isActive }) => (isActive ? activeStyle : null)}
                    >
                      SIGN UP
                    </NavLink>
                  </div>
                  <a
                    href="https://www.instagram.com/eeso_cake/?hl=ko"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex" }}
                  >
                    <img
                      src="/icons/instgram_mini.png"
                      alt=""
                      className="link_icon"
                    />
                  </a>
                  <a
                    href="https://blog.naver.com/eesocake"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex" }}
                  >
                    <img
                      src="/icons/naver_mini.png"
                      alt=""
                      className="link_icon"
                    />
                  </a>
                  <a
                    href="https://pf.kakao.com/_ZyKnd"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex" }}
                  >
                    <img
                      src="/icons/kakaotalk_mini.png"
                      alt=""
                      className="link_icon"
                    />
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {width < 992 ? <NavbarAside /> : null}
    </>
  );
};

export default Navbar;
