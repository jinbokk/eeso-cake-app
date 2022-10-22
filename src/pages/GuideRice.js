import React from "react";
import Map from "../components/Map";

import "./css/Guide.css";
import Footer from "../components/Footer";
import Subnav from "../components/Subnav";

const Guide = () => {
  return (
    <>
      <Subnav option={"guide"} />
      <div className="guide_container">
        <div className="guide_subtitle">케이크 사이즈 안내</div>
        <div>
          <img
            src="/images/cake_size.png"
            className="cakes_size_image"
            alt=""
          />
          <div className="size_info">
            <div>1호 : 지름 15cm (2~3인용)</div>
            <div>2호 : 지름 18cm (3~5인용)</div>
            <div>3호 : 지름 18cm (5~7인용)</div>
            <div>4호 : 지름 18cm (7~9인용)</div>
          </div>
        </div>

        <div className="guide_subtitle">떡케이크 디자인 안내</div>
        <img
          src="/images/cake_size_sample_test.png"
          className="cakes_size_image"
          alt=""
        />

        <div className="design_container">
          <div className="design_info_container">
            <div>돔 디자인</div>
            <div>
              케이크 윗면에 전체적으로 꽃이 올라가는 디자인! 미니, 1호 사이즈에
              추천드리는 디자인입니다 풍성해 보이는 디자인.
            </div>
          </div>

          <div className="design_info_container">
            <div>크레센트트 디자인</div>
            <div>
              여백의 미를 살린 세련된 케이크를 찾으시는 분들께 추천드려요!
            </div>
          </div>

          <div className="design_info_container">
            <div>리스 디자인</div>
            <div>
              3,4호 대형 사이즈에 추천드리는 디자인입니다 화려한 화관 스타일의
              케이크! 여러 조각 나누어 드셔도 예쁨을 최대한 남길 수 있는 디자인.
            </div>
          </div>
        </div>

        <div className="guide_subtitle">설기 맛 선택</div>
        <div className="taste_info_container">
          <div>백설기 (기본설기)</div>
          <div>흑임자 설기 (흑임자 잼 / 쿠앤크 색감) *BEST</div>
          <div>단호박 설기 (단호박 필링 / 노란 설기 )</div>
          <div>초코 설기 ( 초코칩 필링 / 브라운 설기 )</div>
        </div>

        <div className="guide_subtitle">케이크 상자 선택</div>
        <div className="package_info_container">
          <div>종이 상자 패키지 (기본 패키지)</div>
          <div>투명 상자 패키지</div>
        </div>

        <div>
          <div>
            위의 4가지를 결정하신 후, 성함 / 연락처 / 픽업 날짜,시간 과 함께
            편하신 곳으로 상담 요청 주시면 확인하는 대로 빠른 연락드리겠습니다 :
            )
          </div>

          <div>
            * 전화 예약 : 0507 - 1424 - 1945 / 카카오톡 : leeso0904 @이소케이크
          </div>

          <div>
            * 주문은 3~5일 전 상담 완료 부탁드리며, 주말 주문은 조금 더 빠르게
            마감이 되는 관계로 여유를 가지고 예약을 부탁드립니다.
          </div>

          <div>
            * 상담 완료 후 계좌 안내해드리며, 맞춤 수제 케이크는 선결제 후 제작
            진행되시는 점 참고 부탁드립니다.
          </div>

          <div>
            * 맞춤 수제작 특성상 하루 전 / 당일 취소는
            불가함을 안내해 드립니다.
          </div>

          <div>
            * 케이크는 손상의 우려가 있어 직접 픽업을 원칙으로 합니다. 부득이
            배송을 원하시는 경우 지하철 택배 / 차량 배송으로만 받으실 수 있습니다. ( 배송비용
            별도 9,000원~2만원이상 )
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Guide;
