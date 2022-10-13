import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./css/Subnav.css";

const Subnav = ({ items }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeUrl = (e) => {
    navigate(`?design=${e.target.value}`); //url만 유저친화적으로 변경한 것. 랜더에 영향 없음.
  };

  return (
    <>
      <div className="filter_container">
        {items.map((item, index) => (
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
