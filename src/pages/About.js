import React from "react";
import "./css/About.css";

const About = () => {
  return (
    <>
      <div className="text_container_top">
        <div>About</div>
        <div>
          <img className="img_container" src={require("../images/test2.jpg")} />
        </div>
        <div className="text_container">
          <div>안녕하세요 이소케이크입니다 :)</div>
          <div>주문제작 수제 디자인 케이크 전문점으로</div>
          <div>합성제,보존제,유화제 등을 사용하지않고</div>
          <div>수시로 갓구워낸 시트와 유생크림만을 사용합니다.</div>
          <div>언제나 좋은 재료로 정성껏 제작해드리고있습니다.</div>
          <div>
            어린이집,유치원케이크 피규어케이크,장난감케이크
            포토케이크,숫자타르트,앙금플라워떡케이크,생화&웨딩케이크
          </div>
          <div>
            남녀노소 구분없이 좋아할수있는 여러가지 디자인의 케이크 포트폴리오를
            보유하고있으며,
          </div>
          <div>이소케이크에서 구매 하실 수 있답니다.</div>
          <div>특별하고 소중한 기념일</div>
          <div>
            예쁘고 맛까지 놓치지 않는 단 하나뿐인 케이크로 보답드리겠습니다.
          </div>
          <div>이소케이크와 함께해주세요 :)</div>
        </div>
      </div>
    </>
  );
};

export default About;
