import React from "react";

import "./css/loading.css";

const Loading = ({ width = "100%", height = "100%", text }) => {
  return (
    <div style={{ width: width, height: height }}>
      <div className="loading_container">
        <div style={{ paddingBottom: "10px" }}>{text}</div>
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
    </div>
  );
};

export default Loading;
