import React from "react";

import "../css/Navbar.css";

const Navbar = () => {
  return (
    <div className="nav_container">
      <div>로고이미지 자리</div>
      <div>HOME</div>
      <div>ABOUT</div>
      <div>CAKES</div>
      {/* dropdown버튼으로 제작할 것 */}
      <div>CONTACT</div>
    </div>
  );
};

export default Navbar;
