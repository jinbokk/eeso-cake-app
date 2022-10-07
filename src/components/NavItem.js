import React from "react";
import { Link } from "react-router-dom";

const NavItem = (props) => {
  console.log(props);
  return (
    <>
      {props.link ? (
        <Link to={props.link}>
          <div className="nav_item_container">
            <div className="nav_item_image_container">
              <img src={props.image_url} alt="" className="nav_item_image" />
            </div>
            <h3>{props.title}</h3>
          </div>
        </Link>
      ) : (
        <div className="nav_item_container">
          <img src={props.image_url} alt="" className="nav_item_image" />
          <h3>{props.title}</h3>
        </div>
      )}
    </>
  );
};

export default NavItem;
