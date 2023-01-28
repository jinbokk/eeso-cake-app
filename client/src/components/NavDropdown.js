import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NavDropdown = ({ navMenu, slim = false }) => {
  // const [isShown, setIsShown] = useState(false);

  const mouseOver = (e) => {
    // setIsShown(true);
    // e.target.classList.add("shown");
  };

  const mouseLeave = (e) => {
    // setIsShown(false);
    // e.target.classList.remove("shown");
  };

  let activeStyle = {
    color: "var(--bg-accent)",
    pointerEvents: "none",
  };

  return (
    <>
      <ul className="dropDown_depth_1">
        <li>
          <button
            className="dropDown_btn"
            onMouseEnter={mouseOver}
            onMouseLeave={mouseLeave}
          >
            <NavLink
              to={"/" + navMenu.mainTitle.toLowerCase()}
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              {navMenu.mainTitle}
            </NavLink>
          </button>
        </li>

        <li>
          <ul className={slim ? "slim dropDown_depth_2" : "dropDown_depth_2"}>
            {navMenu.item.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.link}
                  style={({ isActive }) => (isActive ? activeStyle : null)}
                  className="dropDown_menu"
                >
                  {item.imgSrc ? (
                    <div className="dropDown_menu_img_container">
                      <div>
                        <img
                          src={item.imgSrc}
                          className="dropDown_menu_img"
                          alt=""
                        />
                      </div>
                      <div style={{ margin: "auto" }}>{item.subTitle}</div>
                    </div>
                  ) : (
                    <div>{item.subTitle}</div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
};

export default NavDropdown;
