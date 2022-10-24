import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./css/NavDropdown.css";

const NavDropdown = ({ navMenu }) => {
  const [mouseOn, SetMouseOn] = useState(false);

  let activeStyle = {
    color: "var(--bg-accent)",
  };

  return (
    <>
      <div className="dropdown_menu_container_top">
        {navMenu.mainTitle}
        <div className="dropdown_menu_container">
          {navMenu.item.map((item, index) => (
            <NavLink
              to={item.path}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              key={index}
            >
              {item.subTitle}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavDropdown;
