import React from "react";

const ProductFilter = () => {
  return (
    <>
      <div className="filter_accordion">
        {/* <h3>빵케이크</h3>
        <ul>
          <li>레터링케이크</li>
          <li>피규어케이크</li>
          <li>생화케이크</li>
        </ul>

        <h3>떡케이크</h3>
        <ul>
          <li>돔 디자인</li>
          <li>초승달 디자인</li>
          <li>리스 디자인</li>
        </ul>

        
        <h3>타르트</h3>
        <ul>
          <li>숫자 타르트</li>
        </ul> */}

        <h3>케이크 종류</h3>
        <ul>
          <li>빵 케이크</li>
          <li>떡 케이크</li>
          <li>타르트</li>
        </ul>

        <h3>디자인</h3>
        <ul>
          <li>피규어</li>
          <li>레터링</li>
          <li>생화</li>
          <li>3D</li>
        </ul>
      </div>
    </>
  );
};

export default ProductFilter;
