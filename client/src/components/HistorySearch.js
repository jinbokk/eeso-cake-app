import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { DatePicker, TimePicker } from "antd";
import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/ko_KR";
import datePickerLocale from "antd/es/date-picker/locale/ko_KR";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import "./css/historySearch.css";

dayjs.locale("ko");

const HistorySearch = () => {
  const [startDate, setStartDate] = useState(dayjs().subtract(7, "days"));
  const [endDate, setEndDate] = useState(dayjs());
  const [dateRange, setDateRange] = useState(7);

  useEffect(() => {
    console.log(dateRange);

    // dateRange가 바뀔 때 마다, db데이터를 페이지네이션 하여 가져온다.
  }, [dateRange]);

  const dateRangeHandler = (dateRange) => {
    setStartDate(
      dayjs()
        .subtract(dateRange.value, dateRange.type)
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0)
    );
    setEndDate(dayjs().set("hour", 23).set("minute", 59).set("second", 59));
    setDateRange({
      start: dayjs()
        .subtract(dateRange.value, dateRange.type)
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0)
        .format(),
      end: dayjs().set("hour", 23).set("minute", 59).set("second", 59).format(),
    });
  };

  return (
    <ConfigProvider locale={locale}>
      <Container className="my-4 history_search_container">
        <Row className="justify-content-center">
          <Col lg={"auto"} xs={"auto"} className="text-center">
            <DatePicker
              inputReadOnly
              size="small"
              className="history_search_picker"
              value={startDate}
              showToday={true}
              allowClear={false}
              defaultValue={undefined}
              format={"YYYY-MM-DD"}
              locale={datePickerLocale}
              placeholder="시작일"
              popupClassName="custom_dropdown"
            />
            <span className="mx-2">~</span>
            <DatePicker
              inputReadOnly
              size="small"
              className="history_search_picker"
              value={endDate}
              showToday={true}
              allowClear={false}
              defaultValue={undefined}
              format={"YYYY-MM-DD"}
              locale={datePickerLocale}
              placeholder="종료일"
              popupClassName="custom_dropdown"
            />
          </Col>
          <Col
            lg={"auto"}
            xs={"auto"}
            className="text-center shortcut_button align-self-center"
          >
            <div
              onClick={() => {
                dateRangeHandler({ type: "days", value: 7 });
              }}
            >
              최근 1주일
            </div>
          </Col>
          <Col
            lg={"auto"}
            xs={"auto"}
            className="text-center shortcut_button align-self-center"
          >
            <div
              onClick={() => {
                dateRangeHandler({ type: "month", value: 1 });
              }}
            >
              최근 1개월
            </div>
          </Col>
          <Col
            lg={"auto"}
            xs={"auto"}
            className="text-center shortcut_button align-self-center"
          >
            <div
              onClick={() => {
                dateRangeHandler({ type: "month", value: 3 });
              }}
            >
              최근 3개월
            </div>
          </Col>
          <Col
            lg={"auto"}
            xs={"auto"}
            className="text-center shortcut_button align-self-center"
          >
            <div
              onClick={() => {
                dateRangeHandler({ type: "month", value: 6 });
              }}
            >
              최근 6개월
            </div>
          </Col>
        </Row>
      </Container>
    </ConfigProvider>
  );
};

export default HistorySearch;
