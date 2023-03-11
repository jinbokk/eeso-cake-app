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

const Delivery = ({ control, cartItems, setError }) => {
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
  const [dateError, setDateError] = useState({});

  useEffect(() => {
    setError(dateError.value);
  }, [dateError]);

  const dateHandler = (date) => {
    setDate(date);
    const dateData = dayjs(date).format();
    const modifiedDate = dayjs(date).format("YYYY-MM-DD (ddd)");

    console.log("dateType", dateData);

    const body = {
      dateType: dateData,
      stringType: modifiedDate,
    };

    dispatch(orderActions.setDeliveryDate(body));
  };

  useEffect(() => {
    setTime(undefined);
    setTimeError({ value: false });
  }, [date]);

  // time
  let dayHours = Array.from(Array(24).keys()); // [0,1,2,.....,23]
  let disabledTimeArray;
  let openTime;
  let closeTime;
  let disabledMinutes;

  const [time, setTime] = useState(undefined);
  const [timeError, setTimeError] = useState({});

  useEffect(() => {
    setError(timeError.value);
  }, [timeError]);

  const timeHandler = (selectedTime) => {
    if (
      parseInt(dayjs(time).format("HH")) ===
      parseInt(dayjs(selectedTime).format("HH")) - 12
    ) {
      let changedTime = dayjs(selectedTime).set("hour", 12).set("minute", 0).set("second", 0);
      selectedTime = changedTime;
      setTime(changedTime);
    } else {
      setTime(selectedTime);
    }

    if (
      parseInt(dayjs(time).format("HH")) ===
      parseInt(dayjs(selectedTime).format("HH")) + 12
    ) {
      let changedTime = dayjs(selectedTime)
        .set("hour", parseInt(openTime + 1))
        .set("minute", 0).set("second", 0);
      selectedTime = changedTime;
      setTime(changedTime);
    } else {
      setTime(selectedTime);
    }
  };

  useEffect(() => {
    if (time) {
      if (parseInt(dayjs(time).format("HH")) === parseInt(closeTime)) {
        disabledMinutes = [10, 20, 30, 40, 50];
      } else {
        disabledMinutes = [];
      }

      const timeData = dayjs(time).format();
      const modifiedTime = dayjs(time).format("a hh:mm");

      const body = {
        dateType: timeData,
        stringType: modifiedTime,
      };

      dispatch(orderActions.setDeliveryTime(body));
    }
  }, [time]);

  const disabledTimeHandler = () => {
    // 평일     am 11:00 ~ pm 7:30
    // 토요일   am 10:00 ~ pm 4:00
    // 일요일   am 10:00 ~ pm 12:00

    const selectedDay = dayjs(date).format("ddd");

    if (selectedDay === "토") {
      // 10 ~ 16
      let start = dayHours.slice(0, 10);
      let end = dayHours.slice(17, 24);
      disabledTimeArray = [...start, ...end];
      openTime = dayHours[9];
      closeTime = dayHours[16];
    } else if (selectedDay === "일") {
      // 10 ~ 12
      let start = dayHours.slice(0, 10);
      let end = dayHours.slice(13, 24);
      disabledTimeArray = [...start, ...end];
      openTime = dayHours[9];
      closeTime = dayHours[12];
    } else {
      // 11 ~ 19
      let start = dayHours.slice(0, 11);
      let end = dayHours.slice(20, 24);
      disabledTimeArray = [...start, ...end];
      openTime = dayHours[10];
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
                    setDateError({ value: false });
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
                  <CustomToggleButton value="퀵 배송">
                    <div
                      style={{
                        fontSize: "0.9rem",
                        pointerEvents: "none",
                      }}
                    >
                      퀵 배송 (본인신청)
                    </div>
                  </CustomToggleButton>
                  {/* <CustomToggleButton value="택배" disabled>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        pointerEvents: "none",
                      }}
                    >
                      택배
                    </div>
                  </CustomToggleButton> */}
                </ToggleButtonGroup>
              )}
            />
          </div>
        </div>

        {delivery === "퀵 배송" ? (
          <div className="flex-column option_menu_section">
            <div
              style={{
                color: "red",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              퀵 배송 주의사항 안내
            </div>
            <div style={{ fontSize: "0.85rem", textAlign: "start" }}>
              <div>
                <div className="mb-3">
                  케이크 배송은 파손 위험으로 인해 1:1 퀵 배송으로만 가능합니다
                </div>

                <div className="py-2">
                  <span style={{ color: "red" }}>
                    퀵 배송건의 경우,
                    <br></br>주문하신 날짜와 시간에 맞추어{" "}
                    <spn className="fw-bold">직접 신청</spn>을 진행 해 주셔야
                    하며<br></br>픽업 후 퀵 배송건에 대한 파손 보상은 불가함을
                    안내드립니다
                  </span>
                </div>

                <div>
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
                  onClick={() => {
                    if (!delivery) {
                      setDateError({
                        value: true,
                        message: "수령 방법을 먼저 선택해 주세요",
                      });
                    }
                  }}
                  disabled={dateError && dateError.value ? true : false}
                  popupStyle={
                    dateError && dateError.value ? { display: "none" } : null
                  }
                  className={dateError && dateError.value ? "error" : ""}
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
                      (current && current > dayjs(before, "YYYY-MM-DD")) ||
                      (current && dayjs(current).format("ddd") === "월")
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
            {dateError && dateError.value ? (
              <div className="error_text">{dateError.message}</div>
            ) : null}
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
                      setTimeError({
                        value: true,
                        message: "수령 날짜를 먼저 선택해 주세요",
                      });
                    } else if (
                      date &&
                      time &&
                      disabledTimeArray.includes(
                        parseInt(dayjs(time).format("HH"))
                      )
                    ) {
                      setTime(undefined);
                      setTimeError({ value: false });
                      dispatch(orderActions.setDeliveryTime(undefined));
                    }
                  }}
                  onOpenChange={(isOpen) => {
                    if (!isOpen) {
                      if (
                        time &&
                        disabledTimeArray.includes(
                          parseInt(dayjs(time).format("HH"))
                        )
                      ) {
                        setTimeError({
                          value: true,
                          message:
                            "수령이 불가한 시간입니다. 다시 선택해 주세요.",
                        });
                      }
                    }
                  }}
                  disabled={timeError && timeError.value ? true : false}
                  popupStyle={
                    timeError && timeError.value ? { display: "none" } : null
                  }
                  className={timeError && timeError.value ? "error" : ""}
                  disabledTime={disabledTimeHandler}
                />
              )}
            />
            {delivery === "퀵 배송" ? (
              <div className="quick_delivery_message">
                배송 차량이 공방에 도착하는 시간을 선택 해 주세요
              </div>
            ) : null}
            {timeError && timeError.value ? (
              <div className="error_text">{timeError.message}</div>
            ) : null}
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

export default Delivery;
