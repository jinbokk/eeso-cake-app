import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./css/Subnav.css";

const Subnav = ({ ingredient }) => {
  let subnav_items;

  if (ingredient === "rice") {
    subnav_items = [
      { title: "# 돔형 케이크", value: "dome" },
      { title: "# 반달형 케이크", value: "crescent" },
      { title: "# 리스형 케이크", value: "wreath" },
    ];
  } else if (ingredient === "bread") {
    subnav_items = [
      { title: "# 레터링 케이크", value: "letter" },
      { title: "# 피규어 케이크", value: "figure" },
      { title: "# 포토 케이크", value: "photo" },
      { title: "# 생화 케이크", value: "fresh_flower" },
      { title: "# 꽃다발 케이크", value: "bouquet" },
      { title: "# 돈 케이크", value: "money" },
      { title: "# 입체 케이크", value: "3D" },
    ];
  } else if (ingredient === "tart") {
    subnav_items = [{ title: "# 숫자 타르트", value: "number" }];
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeUrl = (e) => {
    navigate(`?design=${e.target.value}`); //url만 유저친화적으로 변경한 것. 랜더에 영향 없음.
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
