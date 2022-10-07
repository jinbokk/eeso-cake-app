import React, { useState } from "react";

import NavItem from "./NavItem";

const NavMenu = (props) => {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <div className="nav_menu" onClick={() => setExpand(!expand)}>
        {props.title}
      </div>
      <div>
        {expand && (
          <div className="nav_item_container_top">
            {props.items.map((item) => (
              <NavItem
                title={item.title}
                image_url={item.image_url}
                link={item.link}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NavMenu;
