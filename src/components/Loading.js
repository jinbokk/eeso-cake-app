import React from "react";

import "./css/Loading.css";

const Loading = ({ text }) => {
  return (
    <>
      <div className="loading_container">
        <div style={{ paddingBottom: "10px" }}>{text} 가져오는 중...</div>
        <div style={{ paddingBottom: "40px" }}>잠시만 기다려 주세요 : )</div>
        <div className="flipping">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
