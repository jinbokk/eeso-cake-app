import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productFilterActions } from "../redux/actions/productFilterActions";
import "./css/Subnav.css";

const Subnav = ({ items }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeUrl = (e) => {
    navigate(`?design=${e.target.value}`); //url만 유저친화적으로 변경한 것. 랜더에 영향 없음.
    dispatch(productFilterActions.getFilteredProducts(e.target.value));
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
        {/* <button
          className="filter_button"
          value={"dome"}
          onClick={(e) => changeUrl(e)}
        >
          # 돔형
        </button>
        <button
          className="filter_button"
          value={"crescent"}
          onClick={(e) => changeUrl(e)}
        >
          # 초승달형
        </button>
        <button
          className="filter_button"
          value={"wreath"}
          onClick={(e) => changeUrl(e)}
        >
          # 리스형
        </button> */}
      </div>
    </>
  );
};

export default Subnav;
