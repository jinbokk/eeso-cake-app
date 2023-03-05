import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Controller } from "react-hook-form";
import { orderActions } from "../../redux/actions/orderActions";

import { ToggleButtonGroup, ToggleButton, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { brown } from "@mui/material/colors";

import { FaCarSide } from "react-icons/fa";

// import {
//   DatePicker,
//   TimePicker,
//   DesktopDatePicker,
//   DesktopTimePicker,
//   LocalizationProvider,
// } from "@mui/x-date-pickers";

import { DatePicker, TimePicker } from "antd";
import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/ko_KR";
import datePickerLocale from "antd/es/date-picker/locale/ko_KR";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

const Delivery = ({ control, cartItems }) => {
  const dispatch = useDispatch();

  const CustomToggleButton = styled(ToggleButton)(() => ({
    border: "1px solid",
    color: brown[400],
    borderColor: "rgba(0, 0, 0, 0.25)",
    boxShadow: "none",
    "&.Mui-disabled": {
      border: "1px solid",
      borderColor: "rgba(0, 0, 0, 0.25)",
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: brown[300],
    },

    "&:hover": {
      boxShadow: "none",
    },
  }));

  // const CustomDatePicker = styled(DatePicker)(() => ({
  //   border: "1px solid",
  //   color: brown[400],
  //   borderColor: "rgba(0, 0, 0, 0.25)",
  //   boxShadow: "none",
  //   height: "50px",
  //   width: "100%",
  // }));

  // const CustomTimePicker = styled(TimePicker)(() => ({
  //   border: "1px solid",
  //   color: brown[400],
  //   borderColor: "rgba(0, 0, 0, 0.25)",
  //   boxShadow: "none",
  //   height: "50px",
  //   width: "100%",
  // }));

  // delivery
  const [delivery, setDelivery] = useState(undefined);

  const deliveryHandler = (value) => {
    console.log(delivery);
    setDelivery(value);
    dispatch(orderActions.setDeliveryType(value));
  };

  // date
  const [date, setDate] = useState(undefined);

  const dateHandler = (date) => {
    setDate(date);
    const dateData = dayjs(date).format();
    const modifiedDate = dayjs(date).format("YYYY-MM-DD (ddd)");

    const body = {
      dateType: dateData,
      stringType: modifiedDate,
    };

    dispatch(orderActions.setDeliveryDate(body));
  };

  const [time, setTime] = useState(undefined);
  const [timeError, setTimeError] = useState(undefined);

  const timeHandler = (selectedTime) => {
    if (
      parseInt(dayjs(time).format("HH")) ===
        parseInt(dayjs(selectedTime).format("HH")) - 12 ||
      parseInt(dayjs(time).format("HH")) ===
        parseInt(dayjs(selectedTime).format("HH")) + 12
    ) {
      console.log("am/pm changed");
      setTime(undefined);
    } else {
      setTime(selectedTime);
    }

    /// 로직 수정해야함.. 버그가 있다.

    const timeData = dayjs(time).format();
    const modifiedTime = dayjs(time).format("a hh:mm");

    const body = {
      dateType: timeData,
      stringType: modifiedTime,
    };

    dispatch(orderActions.setDeliveryTime(body));
  };

  let disabledTimeArray;
  let closeTime;
  let disabledMinutes;

  useEffect(() => {
    if (parseInt(dayjs(time).format("HH")) === parseInt(closeTime)) {
      disabledMinutes = [10, 20, 30, 40, 50];
    } else {
      disabledMinutes = [];
    }
  }, [time]);

  const disabledTimeHandler = () => {
    // 평일     am 11:00 ~ pm 7:30
    // 토요일   am 10:00 ~ pm 4:00
    // 일요일   am 10:00 ~ pm 12:00

    const selectedDay = dayjs(date).format("ddd");

    let dayHours = Array.from(Array(24).keys()); // [0,1,2,.....,23]

    if (selectedDay === "토") {
      // 10 ~ 16
      let start = dayHours.slice(0, 10);
      let end = dayHours.slice(17, 24);
      disabledTimeArray = [...start, ...end];
      closeTime = dayHours[16];
    } else if (selectedDay === "일") {
      // 10 ~ 12
      let start = dayHours.slice(0, 10);
      let end = dayHours.slice(13, 24);
      disabledTimeArray = [...start, ...end];
      closeTime = dayHours[12];
    } else {
      // 11 ~ 19
      let start = dayHours.slice(0, 11);
      let end = dayHours.slice(20, 24);
      disabledTimeArray = [...start, ...end];
      closeTime = dayHours[19];
    }

    return {
      disabledHours: () => {
        return disabledTimeArray;
      },
      disabledMinutes: () => {
        return disabledMinutes;
      },
    };
  };

  // default when create cartItems
  useEffect(() => {
    setDelivery(undefined);
    setDate(undefined);
    setTime(undefined);
  }, [cartItems]);

  return (
    <>
      <div>
        <div className="option_menu_section">
          <div>
            <div>수령 방법</div>
            {/* <div className="warning">
                            * 택배 서비스는 준비 중입니다
                          </div> */}
          </div>
          <div className="controller_container">
            <Controller
              control={control}
              name="수령_방법"
              render={({ field: { onChange, value, ...field } }) => (
                <ToggleButtonGroup
                  color="button"
                  size="medium"
                  value={delivery}
                  // value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                    deliveryHandler(e.target.value);
                  }}
                  exclusive
                  fullWidth
                  style={{
                    whiteSpace: "nowrap",
                  }}
                  {...field}
                >
                  <CustomToggleButton value="방문 수령">
                    <div
                      style={{
                        fontSize: "0.9rem",
                        pointerEvents: "none",
                      }}
                    >
                      방문 수령
                    </div>
                  </CustomToggleButton>
                  <CustomToggleButton value="차량 배송">
                    <div
                      style={{
                        fontSize: "0.9rem",
                        pointerEvents: "none",
                      }}
                    >
                      차량 배송
                    </div>
                  </CustomToggleButton>
                  <CustomToggleButton value="택배" disabled>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        pointerEvents: "none",
                      }}
                    >
                      택배
                    </div>
                  </CustomToggleButton>
                </ToggleButtonGroup>
              )}
            />
          </div>
        </div>

        {delivery === "차량 배송" ? (
          <div className="flex-column option_menu_section">
            <div
              style={{
                color: "red",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              차량배송 주의사항 안내
            </div>
            <div style={{ fontSize: "0.85rem", textAlign: "start" }}>
              <div>
                <div>
                  케이크 배송은 파손 위험으로 인해 1:1 차량 배송으로만
                  가능합니다
                  <br></br>
                  수령하실 곳의 상세 주소지를 하단 요청사항에 기재 해 주시면
                  <br></br>
                  요금 조회후 안내를 도와 드리겠습니다
                  <br></br>
                </div>

                <div className="py-3">
                  <div className="mb-3">
                    <FaCarSide className="me-2" />
                    요금 안내
                  </div>
                  <div style={{ color: "red" }}>
                    * 서울 / 경기 외 장거리, 지방 차량 배송 불가
                  </div>
                  의정부 내 : ₩ 9,000 ~<br></br>
                  서울 / 경기 : ₩ 10,000 ~ ₩ 50,000
                </div>

                <div>
                  <span style={{ color: "red" }}>
                    픽업 후 이동 , 차량 배송건에 대한 파손 보상은 불가함을
                    안내드립니다
                  </span>
                  <br></br>
                  부득이하게 픽업이 어려우신 고객님들께 권해드리며
                  <br></br>
                  케이크는 직접 픽업이 가장 안전함을 안내드립니다
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <ConfigProvider locale={locale}>
        <div className="option_menu_section">
          <span className="option_menu_text">수령 날짜</span>
          <div className="controller_container">
            <Controller
              control={control}
              name="수령_날짜"
              // defaultValue={null}
              render={({ field: { onChange, value, ...field } }) => (
                <DatePicker
                  {...field}
                  inputReadOnly
                  value={date}
                  onChange={(value) => {
                    onChange(value);
                    dateHandler(value);
                  }}
                  showToday={false}
                  allowClear={false}
                  defaultValue={undefined}
                  format={"YYYY-MM-DD (ddd)"}
                  locale={datePickerLocale}
                  style={{ width: "100%" }}
                  placeholder="날짜를 선택해 주세요"
                  popupClassName="custom_dropdown"
                  disabledDate={(current) => {
                    let after = dayjs().add(5, "days").format("YYYY-MM-DD");
                    let before = dayjs().add(3, "week").format("YYYY-MM-DD");

                    return (
                      (current && current < dayjs(after, "YYYY-MM-DD")) ||
                      (current && current > dayjs(before, "YYYY-MM-DD"))
                      // ||
                      // (current &&
                      //   current ===
                      //     dayjs(
                      //       dayjs().weekday(1).format("YYYY-MM-DD"),
                      //       "YYYY-MM-DD"
                      //     ))
                      // 매주 월요일 선택불가 하도록 해야함
                    );
                  }}
                  renderExtraFooter={() => {
                    return (
                      <div className="text-center">
                        <div className="fw-bold">~ 픽업 가능 시간 안내 ~</div>
                        <div>월요일 휴무</div>
                        <div>평일 : 오전 11시 ~ 오후 7시 30분</div>
                        <div>토요일 : 오전 10시 ~ 오후 4시</div>
                        <div>일요일 : 오전 10시 ~ 오후 12시 (정오)</div>
                      </div>
                    );
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="option_menu_section">
          <span className="option_menu_text">수령 시간</span>
          <div className="controller_container">
            <Controller
              control={control}
              name="수령_시간"
              render={({ field: { onChange, value, ...field } }) => (
                <TimePicker
                  {...field}
                  inputReadOnly
                  value={time}
                  onChange={(value) => {
                    onChange(value);
                    // timeHandler(value);
                  }}
                  onSelect={(selectedTime) => {
                    timeHandler(selectedTime);

                    console.log("time", parseInt(dayjs(time).format("HH")));
                    console.log(
                      "selectedTime",
                      parseInt(dayjs(selectedTime).format("HH"))
                    );
                  }}
                  format={"a h시 mm분"}
                  use12Hours
                  placeholder="시간을 선택해 주세요"
                  minuteStep={10}
                  hideDisabledOptions
                  showNow={false}
                  allowClear={false}
                  style={{ width: "100%" }}
                  popupClassName="custom_dropdown"
                  onClick={() => {
                    if (date === undefined) {
                      setTimeError(true);
                    } else {
                      setTimeError(false);
                    }
                  }}
                  disabled={timeError ? true : false}
                  popupStyle={timeError ? { display: "none" } : null}
                  className={timeError ? "error" : ""}
                  disabledTime={disabledTimeHandler}
                  // status={"error"}
                  // disabledTime={
                  //   date
                  //     ? (selectedHour) => disabledTimeHandler(selectedHour)
                  //     : null
                  // }
                />
              )}
            />
            {timeError ? (
              <div className="error_text">! 수령 날짜를 먼저 선택해 주세요</div>
            ) : null}
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

export default Delivery;
