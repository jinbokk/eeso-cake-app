import React from "react";
import ErrorAnimation from "../animations/ErrorAnimation";

import { NavLink } from "react-router-dom";

import "./css/notFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="notFound_container">
      <div className="notFound_title">요청하신 페이지를 찾을 수 없습니다</div>

      <div className="notFound_message">
        원하시는 페이지의 주소가 잘못 입력되었거나<br></br>
        주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다<br></br>
        입력하신 페이지 주소가 정확한지 다시 한번 확인해 주세요<br></br>
        <br></br>
        정상적인 접근임에도 해당 페이지가 지속적으로 나타난다면<br></br>사이트
        관리자에게 문의를 부탁드립니다
      </div>

      <div className="notFound_button">
        <NavLink to="/">홈으로 돌아가기</NavLink>
      </div>
      <ErrorAnimation />
    </div>
  );
};

export default NotFoundPage;
