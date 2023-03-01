import React from "react";
import { Container } from "react-bootstrap";
import { NavLink, useSearchParams } from "react-router-dom";
import "./css/subnav.css";

const Subnav = ({ option }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("design");

  let subnav_items;

  if (option === "rice") {
    subnav_items = [
      { title: "# 전체 보기", link: "" },
      { title: "# 돔 디자인", link: "?design=dome" },
      { title: "# 초승달 디자인", link: "?design=crescent" },
      { title: "# 리스 디자인", link: "?design=wreath" },
      { title: "# 꽃다발 디자인", link: "?design=bouquet" },
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
    subnav_items = [{ title: "# 전체 보기", link: "" }];
  }

  let activeStyle = {
    backgroundColor: "var(--bg-accent)",
    color: "var(--bg)",
  };

  return (
    <>
      <div className="gradient_overlay"></div>
      <Container className="filter_container_top">
        <div className="filter_container">
          {subnav_items.map((item, index) => (
            <NavLink
              to={item.link}
              key={index}
              className="filter_button"
              style={({ isActive }) => {
                if (item.link.split("=")[1]) {
                  return isActive && query === item.link.split("=")[1]
                    ? activeStyle
                    : null;
                } else {
                  return isActive && query === null ? activeStyle : null;
                }
              }}
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Subnav;
