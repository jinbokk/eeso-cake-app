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
          {/* <img
            src="/images/cake_size.png"
            className="cakes_size_image"
            alt=""
          />
          <div className="size_info">
            <div>1호 : 지름 15cm (2~3인용)</div>
            <div>2호 : 지름 18cm (3~5인용)</div>
            <div>3호 : 지름 18cm (5~7인용)</div>
            <div>4호 : 지름 18cm (7~9인용)</div>
          </div> */}
          <div> 1호 원형 : 지름 16cm ( 2~4인용)</div>

          <div>2호 원형 : 지름 19cm ( 4~6인용)</div>

          <div>3호 원형 : 지름 21cm (6~9인 이상)</div>

          <div>미니 원형 : 지름 13cm (1~2인용)</div>

          <div>
            * 미니, 3호 사이즈는 2단, 3단 케이크 제작 시 가능하신 사이즈입니다.
          </div>

          <div>하트 케이크 - 1호, 2호 제작 가능</div>

          <div>2단 케이크 주문 예시 1호 + 3호 미니+ 2호 가능</div>
        </div>

        <div className="guide_subtitle">케이크 맛 종류</div>
        <div>
          <div>
            겉 크림 - 크림치즈크림 / 속안 샌드 크림 - 생크림 *이소케이크에서는
            동물성 생크림과 직접 만드는 빵시트 , 필라델피아 크림치즈 등
            좋은재료들로만 정성껏 제작해드립니다. [출처] [필독]이소케이크
            앙금플라워 떡케이크 & 레터링 케이크 주문 안내|작성자 이소케이크
          </div>
          <div>
            1. 기본 - 바닐라 빵시트 / 생크림 샌드 2. 초코 빵시트 / 초코 생크림
            샌드 ( +3,000원 ) * 프랑스산 발로나 초코 파우더를 사용합니다 :)
          </div>
        </div>

        {/* <div className="guide_subtitle">떡케이크 디자인 안내</div>
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
        </div> */}

        {/* <div className="guide_subtitle">설기 맛 선택</div>
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
        </div> */}

        <div>
          <div>
            원하시는 디자인 설명 없이 가격만 문의하시면 안내를 해드릴 수
            없습니다
          </div>
          <div>
            ** 디자인 & 레터링 케이크는 디자인에 따라 가격이 다르기 때문에,
            원하시는 디자인 필히 사진 또는 손그림 첨부해주세요!
          </div>
          <div>타업체 사진은 받지 않습니다. ( 색상 참고만 가능 )</div>
          <div>
            이소케이크의 홈페이지 또는 인스타그램 / 블로그 캡쳐본만을 첨부
            부탁드립니다 : )
          </div>

          <div>
            3. 인물 사진, 디테일이 많이 필요한 그림 주문은 제작이 어렵습니다. (
            * 인물사진 정중히 사양합니다. )
          </div>

          <div>
            그림 가능 여부는 원하시는 이미지 첨부해 주시면 안내 도와드릴게요 ^^
          </div>

          <div>4. 100% 똑같은 색감으로 제작은 어렵습니다.</div>

          <div>
            보내주시는 사진을 참고하여 최대한 같게 색감을 제작해드리지만 가지고
            계신 핸드폰, pc에 따라 보신 색감과 받아보시는 케이크의 색상이 100%
            똑같을 수는 없는 점 참고 부탁드립니다.
          </div>

          <div>5. 이동 시 주의 사항 안내</div>

          <div>
            레터링 빵 케이크는 픽업해 가신 후 빠른 시간 내에 냉장보관해주셔야
            합니다. 더운 여름철 30분 이상 이동 시 크림 갈라짐, 색 번짐 은 발생할
            수 있으며, 이에 대한 책임은 지지 않습니다. * 여름철 이동 시 아이스팩
            구매 추천드립니다. ( 개당 1,000원)
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
            * 맞춤 수제작 특성상 하루 전 / 당일 취소는 불가함을 안내해 드립니다.
          </div>

          <div>
            * 케이크는 손상의 우려가 있어 직접 픽업을 원칙으로 합니다. 부득이
            배송을 원하시는 경우 지하철 택배 / 차량 배송으로만 받으실 수
            있습니다. ( 배송비용 별도 9,000원~2만원이상 )
          </div>

          <div>
            위 내용 확인하신 후 케이크가 필요하신 날짜 / 케이크 호수 / 케이크 맛
            선택하시어 원하시는 디자인 사진 또는 손그림 첨부해주시면 가장 빠른
            상담이 가능합니다 ^^
          </div>

          <div>
            *디자인 선택이 어려우시다면~! 축하 내용을 말씀해주세요~ 제가 몇 가지
            추천도 해드릴게요 ^^ (ex : 여자친구 생일 케이크, 아이 돌잔치 케이크,
            부모님 생신 케이크 등등 )
          </div>

          <div>
            * 전화 예약 : 0507 - 1424 - 1945 / 카카오톡 : leeso0904 @이소케이크
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Guide;
