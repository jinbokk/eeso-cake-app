import React from "react";
import { NavLink } from "react-router-dom";

import "./css/NavDropdown.css";

const NavDropdown = ({ navMenu }) => {
  let activeStyle = {
    color: "var(--bg-accent)",
    pointerEvents: "none",
  };

  return (
    <>
      <div className="dropdown">
        <button className="dropdown_btn">
          <NavLink
            to={"/" + navMenu.mainTitle.toLowerCase()}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            {navMenu.mainTitle}
          </NavLink>
        </button>

        <div className={`dropdown_menu_container ${navMenu.flexDir}`}>
          {navMenu.item.map((item, index) => (
            <NavLink
              to={item.link}
              style={({ isActive }) => (isActive ? activeStyle : null)}
              className="dropdown_menu"
              key={index}
            >
              {item.imgSrc ? (
                <div className="dropdown_menu_img_container">
                  <img src={item.imgSrc} className="dropdown_menu_img" />
                  <div>{item.subTitle}</div>
                </div>
              ) : (
                <div>{item.subTitle}</div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavDropdown;
