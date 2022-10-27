import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Footer from "../components/Footer";
import "./css/Home.css";

import CountUp from "react-countup";
import Loading from "../components/Loading";

import { instagramActions } from "../redux/actions/instagramActions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(instagramActions.getInstaData());
  }, []);

  const instagramData = useSelector((state) => state.instagram);

  return (
    <>
      <div className="home_container_top">
        <div
          className="section_1_container"
          style={{ backgroundImage: "url(/images/home_image_4.png)" }}
        >
          <div className="section_1_text">
            <div>
              <span
                style={{
                  fontSize: "180px",
                  color: "var(--bg)",
                }}
              >
                M
              </span>
              aking your day even more special
            </div>
          </div>
        </div>

        <div className="section_2_container_top">
          <div className="section_2_image_container">
            <img
              src="/images/home_image_1.jpg"
              alt=""
              className="section_2_image"
            />
          </div>

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
          <h2>- 이소케이크 인스타그램 둘러보기 -</h2>

          {instagramData.loading ? (
            <Loading
              width={"100vw"}
              height={"100vh"}
              text={"인스타그램 피드 가져오는 중..."}
            />
          ) : (
            <>
              <div className="instaFeed_counter">
                지금까지{" "}
                <CountUp
                  start={1}
                  end={instagramData.userProfileData.media_count}
                  duration={3}
                  suffix=" 개"
                  useEasing={true}
                  className="instaFeed_counter_accent"
                />
                의 게시글이 포스팅 되었어요 !
              </div>
              <div className="instaFeed_container_top">
                {instagramData.userFeedsData.data.map((item, index) => (
                  <a
                    className="instaFeed_container"
                    href={item.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    <img
                      src={item.media_url}
                      className="instaFeed_image"
                      alt=""
                    />
                    <div className="instaFeed_text_container">
                      <div className="instaFeed_timestamp">
                        {item.timestamp.slice(0, 10)} /{" "}
                        {item.timestamp.slice(11, 16)}
                      </div>
                      <div className="instaFeed_caption">{item.caption}</div>
                      <div className="instaFeed_read_more">READ MORE</div>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
