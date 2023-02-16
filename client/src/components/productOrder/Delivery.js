import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Controller } from "react-hook-form";
import { orderActions } from "../../redux/actions/orderActions";

import { ToggleButtonGroup, ToggleButton, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { brown } from "@mui/material/colors";

import { FaCarSide } from "react-icons/fa";

import {
  DatePicker,
  TimePicker,
  DesktopDatePicker,
  DesktopTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { format, addDays } from "date-fns";
import { ko } from "date-fns/locale";

/// antd
// import dayjs from "dayjs";
// import "dayjs/locale/ko";
// import locale from "antd/locale/ko_KR";
// import { DatePicker, TimePicker } from "antd";

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
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000 * -1;
  console.log("timezoneOffset:", timezoneOffset);
  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [dateError, setDateError] = useState(undefined);

  const dateHandler = (date) => {
    setDate(date);
    const selectedDate = new Date(date.getTime() + timezoneOffset); // UTC 기준으로 -9h로 하루가 차이나는 경우가 생기므로 더 해줌.
    const modifiedDate = format(date, "yyyy-MM-dd (eee)", {
      locale: ko,
    });

    const body = {
      dateType: selectedDate,
      stringType: modifiedDate,
    };

    dispatch(orderActions.setDeliveryDate(body));
  };

  const [timeOpen, setTimeOpen] = useState(false);
  const [time, setTime] = useState(null);
  const [minTime, setMinTime] = useState(undefined);
  const [maxTime, setMaxTime] = useState(undefined);
  const [timeError, setTimeError] = useState(undefined);

  const timeHandler = (date) => {
    setTime(date);
    console.log("timezone Offset", date.getTimezoneOffset());
    const selectedTime = new Date(date.getTime() + timezoneOffset);
    const modifiedTime = format(date, "a hh:mm", { locale: ko });

    const body = {
      dateType: selectedTime,
      stringType: modifiedTime,
    };
    dispatch(orderActions.setDeliveryTime(body));
    // let ampm_before = time ? format(time, "a", { locale: ko }) : undefined;
    // console.log(time);
    // let ampm_after = format(date, "a", { locale: ko }); // 오전 || 오후

    // console.log("ampm_before", ampm_before);
    // console.log("ampm_after", ampm_after);

    // if ((ampm_before !== undefined || null) && ampm_before !== ampm_after) {
    //   setTime(new Date(0, 0, 0, 11));
    // } else {
    //   setTime(date);
    // }
  };

  // const [combinedDateWithTime, setCombinedDateWithTime] = useState(undefined);

  // const combineDateWithTime = (date, time) => {
  //   const combinedDateWithTime = new Date(
  //     date.getFullYear(),
  //     date.getMonth(),
  //     date.getDate(),
  //     time.getHours(),
  //     time.getMinutes(),
  //     time.getSeconds(),
  //     time.getMilliseconds()
  //   );

  //   setCombinedDateWithTime(combinedDateWithTime);
  // };

  const storeHourHandler = (date) => {
    // 평일     am 11:00 ~ pm 7:30
    // 토요일   am 10:00 ~ pm 4:00
    // 일요일   am 10:00 ~ pm 12:00

    const selectedDay = format(date, "eee", { locale: ko });
    console.log("selectedDay", selectedDay);

    if (selectedDay === "토") {
      setMinTime(new Date(0, 0, 0, 10));
      setMaxTime(new Date(0, 0, 0, 16));
    } else if (selectedDay === "일") {
      setMinTime(new Date(0, 0, 0, 10));
      setMaxTime(new Date(0, 0, 0, 12));
    } else {
      setMinTime(new Date(0, 0, 0, 11));
      setMaxTime(new Date(0, 0, 0, 19, 30));
    }
  };

  // default when create cartItems
  useEffect(() => {
    setDelivery(null);
    setDate(null);
    setTime(null);
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

      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
        <div className="option_menu_section">
          <span className="option_menu_text">수령 날짜</span>
          <div className="controller_container">
            <Controller
              control={control}
              name="수령_날짜"
              defaultValue={null}
              render={({ field: { onChange, value, ...field } }) => (
                <DatePicker
                  {...field}
                  size="lg"
                  className="mui_x_custom"
                  minDate={addDays(new Date(), 3)}
                  maxDate={addDays(new Date(), 14)}
                  inputFormat="yyyy.MM.dd (eee)"
                  disableMaskedInput
                  dayOfWeekFormatter={(day) => `${day}`}
                  value={date}
                  onChange={(date) => {
                    onChange(date);
                    dateHandler(date);
                    storeHourHandler(date);
                  }}
                  fullWidth
                  open={dateOpen}
                  onOpen={() => {
                    if (!delivery) {
                      setDateError(true);
                    } else {
                      setDateOpen(true);
                    }
                  }}
                  onClose={() => setDateOpen(false)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onClick={() => {
                        if (!delivery) {
                          setDateError(true);
                        } else {
                          setDateOpen(true);
                        }
                      }}
                      error={dateError && !delivery ? true : false}
                      helperText={
                        dateError && !delivery
                          ? "수령 방법을 먼저 선택해 주세요"
                          : null
                      }
                      inputProps={{
                        ...params.inputProps,
                        readOnly: true,
                        style: {
                          fontSize: "0.9rem",
                          cursor: "pointer",
                        },
                        placeholder: "날짜를 선택해 주세요",
                      }}
                    />
                  )}
                />
              )}
            />
          </div>
        </div>

        {/* <div>
          <div className="option_menu_section">
            <span className="option_menu_text">수령 날짜</span>
            <div className="controller_container">
              <Controller
                control={control}
                name="수령_날짜"
                defaultValue={null}
                render={({ field: { onChange, value, ...field } }) => (
                  <CustomDatePicker
                    {...field}
                    allowClear={false}
                    inputReadOnly
                    showToday={false}
                    placeholder={"날짜를 선택해 주세요"}
                    format="YYYY-MM-DD (ddd)"
                    disabledDate={disabledDate}
                    onChange={(e) => console.log(e)}
                  />
                )}
              />
            </div>
          </div>
        </div> */}

        <div className="option_menu_section">
          <span className="option_menu_text">수령 시간</span>

          <div className="controller_container">
            <Controller
              control={control}
              name="수령_시간"
              defaultValue={null}
              render={({ field: { onChange, value, ...field } }) => (
                <TimePicker
                  {...field}
                  disableMaskedInput
                  className="mui_x_custom"
                  value={delivery === "택배" ? null : time}
                  minTime={minTime}
                  maxTime={maxTime}
                  inputFormat="a hh:mm"
                  onChange={(date) => {
                    onChange(date);
                    timeHandler(date);
                  }}
                  disabled={delivery === "택배" ? true : false}
                  ampmInClock
                  fullWidth
                  open={timeOpen}
                  onOpen={() => {
                    if (!date) {
                      setTimeError(true);
                    } else {
                      setTimeOpen(true);
                    }
                  }}
                  onClose={() => setTimeOpen(false)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onClick={() => {
                        if (!date) {
                          setTimeError(true);
                        } else {
                          setTimeOpen(true);
                        }
                      }}
                      error={timeError && !date ? true : false}
                      helperText={
                        timeError && !date ? "날짜를 먼저 선택해 주세요" : null
                      }
                      inputProps={{
                        ...params.inputProps,
                        readOnly: true,
                        style: {
                          fontSize: "0.9rem",
                          cursor: "pointer",
                        },
                        placeholder:
                          delivery === "택배"
                            ? "택배 수령시 설정 불가"
                            : "시간을 선택해 주세요",
                      }}
                    />
                  )}
                  minutesStep={5}
                  showToolbar
                />
              )}
            />
          </div>
        </div>
        {/* 
        <div className="option_menu_section">
          <span className="option_menu_text">수령 시간</span>

          <div className="controller_container">
            <Controller
              control={control}
              name="수령_시간"
              defaultValue={null}
              render={({ field: { onChange, value, ...field } }) => (
                <CustomTimePicker
                  {...field}
                  allowClear={false}
                  showNow={false}
                  use12Hours
                  minuteStep={10}
                  inputReadOnly
                  format="a hh:mm"
                  placeholder="시간을 선택해 주세요"
                />
              )}
            />
          </div>
        </div> */}
      </LocalizationProvider>
    </>
  );
};

export default Delivery;
