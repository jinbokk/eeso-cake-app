import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NavDropdown = ({ navMenu, setToggleHandler }) => {
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
      <ul class="dropDown_depth_1">
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
          <ul className="dropDown_depth_2">
            {navMenu.item.map((item, index) => (
              <li>
                <NavLink
                  to={item.link}
                  style={({ isActive }) => (isActive ? activeStyle : null)}
                  className="dropDown_menu"
                  key={index}
                >
                  {item.imgSrc ? (
                    <div
                      className="dropDown_menu_img_container"
                      onClick={() => setToggleHandler(false)}
                    >
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
                    <div onClick={() => setToggleHandler(false)}>
                      {item.subTitle}
                    </div>
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
