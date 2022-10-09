import React from "react";
import "./css/Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer_container_top">
        <div className="subNav">
          <div>HOME</div>
          <div>MAP</div>
          <div>GUIDE</div>
        </div>
        <div className="info">
          <div className="info_items">
            <div>상호명</div>
            <div>이소케이크</div>
          </div>

          <div className="info_items">
            <div>대표자명</div>
            <div>이소정</div>
          </div>

          <div className="info_items">
            <div>위치</div>
            <div>경기 의정부시 승지로30번길 20 1층</div>
          </div>

          <div className="info_items">
            <div>전화번호</div>
            <div>0507-1424-1945</div>
          </div>

          <div className="info_items">
            <div>영업 시간</div>
            <div>11:00 ~ 18:00 / 매주 월요일 휴무</div>
          </div>

          <div className="info_items">
            <div>사업자번호</div>
            <div>430-39-00287</div>
          </div>
        </div>
        <div className="copyright">Copyright 2022. eesocake. All Right Reserved</div>
      </div>
    </>
  );
};

export default Footer;
