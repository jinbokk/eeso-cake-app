import React from "react";
import { NavLink } from "react-router-dom";

import "./css/NavDropdown.css";

const NavDropdown = ({ navMenu, setToggleHandler }) => {
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
            <div>
              {navMenu.mainTitle}
              <span style={{ marginLeft: "5px" }}>&#9662;</span>
            </div>
          </NavLink>
        </button>

        <div
          className={`dropdown_menu_container ${navMenu.flexDir} align-items-start`}
        >
          {navMenu.item.map((item, index) => (
            <NavLink
              to={item.link}
              style={({ isActive }) => (isActive ? activeStyle : null)}
              className="dropdown_menu"
              key={index}
            >
              {item.imgSrc ? (
                <div
                  className="dropdown_menu_img_container"
                  onClick={() => setToggleHandler(false)}
                >
                  <img src={item.imgSrc} className="dropdown_menu_img" alt="" />
                  <div>{item.subTitle}</div>
                </div>
              ) : (
                <div onClick={() => setToggleHandler(false)}>
                  {item.subTitle}
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavDropdown;
