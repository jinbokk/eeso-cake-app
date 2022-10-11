import React from "react";
import "./css/Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer_container_top">
        <div className="footer_banner">
          <div className="footer_banner_item">
            <img
              src="/icons/tasty.png"
              alt=""
              className="footer_banner_item_icon"
            />
            <div>
              고급스러운 크림치즈의 맛
              <br />
              시럽 없이도 촉촉한 수제 빵시트
              <br />
              고소하고 담백한 우유 생크림
            </div>
          </div>
          <div className="footer_banner_item">
            <img
              src="/icons/calender.png"
              alt=""
              className="footer_banner_item_icon"
            />
            <div>
              세상에 하나뿐인
              <br />
              고객님만의 케이크를
              <br />
              지금 바로 예약하세요
            </div>
          </div>
          <div className="footer_banner_item">
            <img
              src="/icons/cake.png"
              alt=""
              className="footer_banner_item_icon"
            />
            <div>
              특별한 날,
              <br />
              고객님의 행복을 위해
              <br />
              최선을 다 하겠습니다
            </div>
          </div>
        </div>
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
            <div>0507 - 1424 - 1945</div>
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
        <div className="copyright">
          Copyright 2022. eesocake. All Right Reserved
        </div>
      </div>
    </>
  );
};

export default Footer;
