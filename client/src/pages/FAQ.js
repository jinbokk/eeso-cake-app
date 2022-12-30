import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "react-bootstrap";
import { RxTriangleRight } from "react-icons/rx";
import { MdContactSupport } from "react-icons/md";

import "./css/faq.css";

const FAQ = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const panels = [
    {
      title: <span>전화로 주문이 가능할까요?</span>,
      contents: (
        <span>
          상담 내용을 기록으로 남겨야 하기에, 카카오톡
          <a
            href="https://pf.kakao.com/_ZyKnd"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 link"
          >
            @이소케이크
          </a>
          채널을 통해 채팅 상담 및 주문이 가능합니다
          <br></br>
          예약은 선입금으로 진행되며, 전체적인 진행 과정은 아래와 같습니다.
          <br></br>
          <br></br>
          <span
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
          >
            수령 날짜 및 디자인 상담 <RxTriangleRight /> 가격 안내
            <RxTriangleRight /> 주문 확인 안내 <RxTriangleRight /> 입금 확인
            <RxTriangleRight />
            예약 확정 안내 <RxTriangleRight /> 예약 확정
          </span>
        </span>
      ),
    },

    {
      title: <span>당일 주문이 가능할까요?</span>,
      contents: (
        <span>
          현재 홈페이지 내 당일 주문은 불가하며, 하루 전 / 당일 주문의 경우
          <a
            href="https://pf.kakao.com/_ZyKnd"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 link"
          >
            @이소케이크
          </a>
          카카오톡 채널로 문의해 주시면 안내 드리겠습니다
          <br></br>
          <br></br>
          홈페이지 내에서도 당일 주문 케이크를 이용하실 수 있도록 런칭을
          준비중에 있으며 곧 선보이도록 하겠습니다 :)
          <br></br>
          <br></br>
          하루 전 / 당일 주문의 경우 재료 준비 상황에 따라 소액의 추가금이
          발생할 수 있습니다.
        </span>
      ),
    },

    {
      title: <span>케이크는 냉동상태로 픽업하나요?</span>,
      contents: (
        <span>
          케이크는 냉장상태로 보관 후 제공됩니다. 더운 여름날의 경우, 보냉
          파우치와 아이스팩을 별도로 구매하시어 포장 가능합니다
        </span>
      ),
    },
    {
      title: <span>크림에 알맹이가 있어요</span>,
      contents: (
        <span>
          크림치즈로 만든 크림의 경우, 재료 특성상 작은 알맹이가 있을 수
          있습니다
          <br></br>드시는데에 전혀 문제가 없는 재료 원물이오니, 안심하고 드셔도
          됩니다.
        </span>
      ),
    },
    {
      title: <span>제 케이크가 인스타그램에 업로드 되나요?</span>,
      contents: (
        <span>
          인스타그램 업로드의 경우, 이소케이크 내 별도 확인 작업 후 업로드
          됩니다.
          <br></br>만일 인스타그램 등에 업로드를 원하지 않으실 경우에는
          <br></br>주문 요청사항 혹은 카카오톡
          <a
            href="https://pf.kakao.com/_ZyKnd"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 link"
          >
            @이소케이크
          </a>
          채널을 통해 말씀해 주세요
          <br></br>
          별도의 요청이 없을 시, 케이크 사진은 인스타그램에 업로드 될 수 있음을
          안내 드립니다
        </span>
      ),
    },

    {
      title: <span>케이크 보관은 어떻게 하나요?</span>,
      contents: (
        <span>
          빵케이크의 경우,
          <br></br>픽업 후 빠른 시간내 냉장보관 해주셔야 합니다.
          <br></br>30분 이상 더운 실온 이동시 케이크 손상의 우려가 있으며 크림
          치즈의 특성상
          <br></br>하루 뒤 표면에 약간의 갈라짐이 발생할 수 있습니다. 이에 대한
          책임은 지지 않습니다.
          <br></br>여름철 이동시 매장 내 보냉 파우치 + 아이스팩 구매를 추천
          드립니다.
          <br></br>
          <br></br>
          포토케이크의 경우,
          <br></br>재료의 특성상 케이크의 수분감으로 인해 장시간 냉장 보관시
          <br></br>기포 발생 또는 색상 변질의 우려가 있으므로 당일 수령 및
          섭취를 권해드립니다.
          <br></br>
          <br></br>
          떡케이크의 경우,
          <br></br>케이크가 필요하신 당일 수령을 추천드리며, 실온 보관 후 당일
          드시는 것이 가장 맛있습니다.
          <br></br>떡케이크는 하루 정도 실온에서 보관이 가능하며, 남은 떡은
          냉동보관 / 앙금은 냉장보관으로 분리하여 보관하신 후<br></br> 다시
          드실때는 전자렌지 등으로 데워서 드시면 됩니다
        </span>
      ),
    },

    {
      title: <span>다른 업체 디자인처럼 만들어 주실 수 있나요?</span>,
      contents: (
        <span>
          타업체 디자인 문의는 받지 않으며, 상담 진행이 불가합니다.<br></br>
          홈페이지 혹은
          <a
            href="https://www.instagram.com/eeso_cake/?hl=ko"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 link"
          >
            이소케이크 인스타그램
          </a>
          및
          <a
            href="https://blog.naver.com/eesocake"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 link"
          >
            이소케이크 블로그
          </a>
          사진 캡쳐본을 보내주세요 :)
        </span>
      ),
    },

    {
      title: <span>사진과 실제 색감이 달라요</span>,
      contents: (
        <span>
          수작업의 특성상 100% 똑같은 색감, 디테일로 제작은 어렵습니다.
          <br></br>
          보내주시는 사진을 참고하여 최대한 같게 제작 해 드리고 있지만
          <br></br>
          사용 중이신 디스플레이에 따라 색감이 차이가 날 수 있으며
          <br></br>수제작의 특성상 색상이 100% 똑같을 수는 없는 점 양해
          부탁드립니다.
        </span>
      ),
    },

    {
      title: <span>주문 취소 및 환불 규정</span>,
      contents: (
        <span>
          주문제작 케이크 제작 특성상 하루 제작량에 맞춰 예약마감, 주문서 정리,
          재료 준비가 진행되기 때문에
          <br></br>3일 전 부터는 환불이 불가하시며 , 5일 전 취소시 부터는
          위약금이 발생하시는 점 양해 부탁드립니다.
          <br></br>
          <br></br>
          수령 5일 전 취소시 30% 위약금 발생
          <br></br>수령 4일 전 취소시 50% 위약금 발생
          <br></br>수령 3일 전 취소시 환불이 불가합니다.
          <br></br>
          <br></br>예약 입금이 완료된 후의 모든 취소건은
          <br></br>날짜일수에 관계 없이 취소 수수료 10,000원이 발생되오니,
          신중한 예약을 부탁 드립니다
        </span>
      ),
    },

    {
      title: <span>픽업 시간을 변경하고 싶어요</span>,
      contents: (
        <span>
          픽업 시간 변경의 경우, 월요일 휴무날을 제외한 수령 전날 오후 1시까지
          연락건에 한하여 변경이 가능합니다.
        </span>
      ),
    },
  ];

  return (
    <Container style={{ marginTop: "4rem" }}>
      <div className="d-flex flex-column align-items-center pb-5">
        <MdContactSupport size={50} />
        <div className="display-6 mt-3">FAQ</div>
      </div>
      {panels.map((item, index) => {
        return (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            className="faq_section"
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                sx={{ width: "100%", textAlign: "start", flexShrink: 0 }}
              >
                <span
                  className="faq_title"
                  style={
                    expanded === `panel${index}`
                      ? {
                          color: "var(--bg-accent)",
                        }
                      : null
                  }
                >
                  <span className="faq_accent">Q.</span>
                  {item.title}
                </span>
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography>
                <span className="faq_contents">
                  <span className="faq_accent">A.</span>
                  {item.contents}
                </span>
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Container>
  );
};

export default FAQ;
