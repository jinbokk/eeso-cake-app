import React, { useEffect, useState } from "react";

import "./css/Navbar.css";

import { NavLink } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import useHighlight from "../hooks/useHighlight";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useHighlight();

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
        <div>
          <NavLink to="/">
            <div>
              <img className="main_logo" src="/images/logo_test.png" alt="" />
            </div>
          </NavLink>
        </div>

        <div>
          <NavLink
            to="/"
            end
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            <div className="nav_menu">HOME</div>
          </NavLink>
        </div>

        <div>
          <NavLink
            to="/about"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            <div className="nav_menu">ABOUT</div>
          </NavLink>
        </div>

        <div>
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
        </div>

        <div>
          <NavDropdown
            navMenu={{
              mainTitle: "CAKES",
              flexDir: "row",
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
        </div>

        <div>
          <NavLink
            to="/contact"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            <div className="nav_menu">CONTACT</div>
          </NavLink>
        </div>
        <div className="link_container">
          <div>
            <a
              href="https://www.instagram.com/eeso_cake/?hl=ko"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons/instgram.png" alt="" className="link_icon" />
            </a>
          </div>
          <div>
            <a
              href="https://blog.naver.com/eesocake"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons/naver.png" alt="" className="link_icon" />
            </a>
          </div>
          <div>
            <a
              href="https://pf.kakao.com/_ZyKnd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/icons/kakaotalk.png"
                alt=""
                className="link_icon"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
