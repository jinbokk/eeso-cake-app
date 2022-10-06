import React, { useState } from "react";

import NavItem from "./NavItem";
import "./css/NavMenu.css";

const NavMenu = ({ props }) => {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <div className="nav_menu" onClick={() => setExpand(!expand)}>
        {props.title}
      </div>
      <div>{expand && <NavItem />}</div>
    </>
  );
};

export default NavMenu;
