import React, { useEffect, useState } from "react";

import "./css/Navbar.css";

import { NavLink } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import useWindowDimensions from "../hooks/useWindowDimensions";

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

  const [toggleHandler, setToggleHandler] = useState(false);

  useEffect(() => {
    console.log(toggleHandler);
  }, [toggleHandler]);

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
        <span
          className="nav_mobile"
          onClick={() => setToggleHandler((prev) => !prev)}
        >
          <span
            className={
              toggleHandler ? "nav_mobile_bar close" : "nav_mobile_bar"
            }
          ></span>
        </span>

        <span
          className={
            toggleHandler
              ? "nav_mobile_transparent triggered"
              : "nav_mobile_transparent"
          }
          onClick={() => setToggleHandler(false)}
        ></span>

        <div
          className={
            width < 992
              ? "nav_container mobile" + (toggleHandler ? " triggered" : "")
              : "nav_container"
          }
        >
          <div className="main_logo">
            <NavLink to="/" onClick={() => setToggleHandler(false)}>
              <div>
                <img src="/images/logo_test.png" alt="" />
              </div>
            </NavLink>
          </div>

          <NavLink
            to="/"
            end
            style={({ isActive }) => (isActive ? activeStyle : null)}
            onClick={() => setToggleHandler(false)}
          >
            <div className="nav_menu">HOME</div>
          </NavLink>

          <NavLink
            to="/about"
            style={({ isActive }) => (isActive ? activeStyle : null)}
            onClick={() => setToggleHandler(false)}
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
            setToggleHandler={setToggleHandler}
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
            setToggleHandler={setToggleHandler}
          />

          <NavLink
            to="/contact"
            style={({ isActive }) => (isActive ? activeStyle : null)}
            onClick={() => setToggleHandler(false)}
          >
            <div className="nav_menu">CONTACT</div>
          </NavLink>

          {/* <div className="link_container">
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
                <img src="/icons/naver_mini.png" alt="" className="link_icon" />
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
