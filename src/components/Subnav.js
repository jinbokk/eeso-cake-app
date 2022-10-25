import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Subnav.css";

const Subnav = ({ option }) => {
  let subnav_items;

  if (option === "rice") {
    subnav_items = [
      { title: "# 전체 보기", value: "" },
      { title: "# 돔 디자인", value: "?design=dome" },
      { title: "# 크레센트 디자인", value: "?design=crescent" },
      { title: "# 리스 디자인", value: "?design=wreath" },
    ];
  }

  if (option === "bread") {
    subnav_items = [
      { title: "# 전체 보기", value: "" },
      { title: "# 레터링 케이크", value: "?design=letter" },
      { title: "# 피규어 케이크", value: "?design=figure" },
      { title: "# 포토 케이크", value: "?design=photo" },
      { title: "# 생화 케이크", value: "?design=fresh_flower" },
      { title: "# 꽃다발 케이크", value: "?design=bouquet" },
      { title: "# 돈 케이크", value: "?design=money" },
      { title: "# 입체 케이크", value: "?design=3D" },
    ];
  }

  if (option === "tart") {
    subnav_items = [
      // { title: "# 전체 보기", value: "" },
      { title: "# 숫자 타르트", value: "?design=number" },
    ];
  }

  // if (option === "guide") {
  //   subnav_items = [
  //     { title: "# 떡 케이크 안내", value: "rice" },
  //     { title: "# 빵 케이크 안내", value: "bread" },
  //   ];
  // }

  const navigate = useNavigate();

  const changeUrl = (e) => {
    navigate(e.target.value);
  };

  return (
    <>
      <div className="filter_container">
        {subnav_items.map((item, index) => (
          <button
            className="filter_button"
            value={item.value}
            key={index}
            onClick={(e) => changeUrl(e)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </>
  );
};

export default Subnav;
