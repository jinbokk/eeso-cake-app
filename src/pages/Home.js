import React from "react";
import "../css/Home.css";

import PreviewItems from "../components/PreviewItems";
import BestItems from "../components/BestItems";

const Home = () => {
  return (
    <>
      <div className="home_container_top">
        <div className="home_container">
          <h1 className="main_msg">
            안녕하세요,
            <br />
            이소케이크 입니다
          </h1>
          <div className="sub_img">
            <div className="sub_msg">
              <div>Since 2017</div>
              <div>찾아주셔서 진심으로 감사드립니다.</div>
              <div>뜻깊은 날, 더욱 빛나실 수 있도록 정성을 다하겠습니다</div>
            </div>
          </div>
        </div>
      </div>
      <PreviewItems />
      <BestItems />
    </>
  );
};

export default Home;
