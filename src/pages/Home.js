import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./css/Home.css";

const Home = () => {
  const productsData = useSelector((state) => state.product);
  const instagramData = useSelector((state) => state.instagram);

  console.log(productsData);
  console.log(instagramData);

  return (
    <>
      <div className="home_container_top">
        <div
          className="section_1_container"
          style={{ backgroundImage: "url(" + "/images/home_image_4.jpg" + ")" }}
        >
          <div className="section_1_text">
            <span style={{ fontSize: "100px", color: "var(--bg)" }}>특</span>
            별한 날을 더욱 특별하게
          </div>
          <div className="section_1_text">- 이소케이크 -</div>
        </div>

        <div className="section_2_container">
          <div
            style={{
              backgroundImage: "url(" + "/images/home_image_1.jpg" + ")",
            }}
            className="section_2_image"
          ></div>

          <div className="section_2_text_container_top">
            <div className="section_2_text_container_1">
              <div className="section_2_text">
                <div className="section_2_text_lg">無</div>
                <div className="section_2_text_sm">합성제</div>
              </div>

              <div className="section_2_text">
                <div className="section_2_text_lg">無</div>
                <div className="section_2_text_sm">보존제</div>
              </div>

              <div className="section_2_text">
                <div className="section_2_text_lg">無</div>
                <div className="section_2_text_sm">유화제</div>
              </div>
            </div>

            <div className="section_2_text_container_2">
              <div className="underline">케이크도 건강해야 합니다</div>
              <div>
                이소케이크에서는, 합성제 보존제 유화제 등을 사용하지 않고
              </div>
              <div>수시로 갓 구워낸 시트와 유생크림만을 사용합니다</div>
            </div>
          </div>
        </div>

        <div className="section_3_container">
          <h2>이소케이크의 인스타그램</h2>
          <h3>원하는 케이크를 쉽게 찾아보세요 !</h3>
          <div>현재 미디어 4839 개</div>
          <div className="instaFeed_container_top">
            {instagramData.loading ? (
              <div>laoding feed</div>
            ) : (
              instagramData.userFeedsData.data.map((item) => (
                <a
                  className="instaFeed_container"
                  href={item.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={item.media_url} className="instaFeed_image" />
                  <div>{item.caption}</div>
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
