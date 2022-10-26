import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import "./css/Subnav.css";

const Subnav = ({ option }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("design");

  let subnav_items;

  if (option === "rice") {
    subnav_items = [
      { title: "# 전체 보기", link: "" },
      { title: "# 돔 디자인", link: "?design=dome" },
      { title: "# 크레센트 디자인", link: "?design=crescent" },
      { title: "# 리스 디자인", link: "?design=wreath" },
    ];
  }

  if (option === "bread") {
    subnav_items = [
      { title: "# 전체 보기", link: "" },
      { title: "# 레터링 케이크", link: "?design=letter" },
      { title: "# 피규어 케이크", link: "?design=figure" },
      { title: "# 포토 케이크", link: "?design=photo" },
      { title: "# 생화 케이크", link: "?design=fresh_flower" },
      { title: "# 꽃다발 케이크", link: "?design=bouquet" },
      { title: "# 돈 케이크", link: "?design=money" },
      { title: "# 입체 케이크", link: "?design=3D" },
    ];
  }

  if (option === "tart") {
    subnav_items = [
      { title: "# 전체 보기", link: "" },
      // { title: "# 숫자 타르트", link: "?design=number" },
    ];
  }

  // if (option === "guide") {
  //   subnav_items = [
  //     { title: "# 떡 케이크 안내", link: "rice" },
  //     { title: "# 빵 케이크 안내", link: "bread" },
  //   ];
  // }

  let activeStyle = {
    backgroundColor: "var(--bg-accent)",
    color: "var(--bg)",
  };

  return (
    <>
      <div className="filter_container">
        {subnav_items.map((item, index) => (
          <NavLink
            to={item.link}
            key={index}
            className="filter_button"
            style={
              ({ isActive }) => {
                if (item.link.split("=")[1]) {
                  return isActive && query === item.link.split("=")[1]
                    ? activeStyle
                    : null;
                } else {
                  return isActive && query === null ? activeStyle : null;
                }
              }
              // {
              //   if (isActive && query === item.link.split("=")[1]) {
              //     return activeStyle;
              //   } else if (isActive && query === null) {
              //     return activeStyle;
              //   }
              // }

              // isActive && query === item.link.split("=")[1] ? activeStyle : null
            }

            // onClick={(e) => {
            //   console.log(e.target.href.split("=")[1])navli;
            //   if (e.target.href.split("=")[1] === activeQuery) {
            //     console.log("querry correct");
            //   }
            // }}
          >
            {item.title}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Subnav;
