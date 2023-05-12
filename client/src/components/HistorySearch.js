import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

import { DatePicker, TimePicker } from "antd";
import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/ko_KR";
import datePickerLocale from "antd/es/date-picker/locale/ko_KR";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import "./css/historySearch.css";
import { userActions } from "../redux/actions/userActions";

dayjs.locale("ko");

const HistorySearch = ({ searchIndex }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const startQuery = searchParams.get("start");
  const endQuery = searchParams.get("end");

  const [startDate, setStartDate] = useState(
    (startQuery && dayjs(startQuery)) || dayjs().subtract(7, "days")
  );
  const [endDate, setEndDate] = useState(
    (endQuery && dayjs(endQuery)) || dayjs()
  );
  const [dateRange, setDateRange] = useState(
    dayjs(endQuery) - dayjs(startQuery) || 7
  );

  useEffect(() => {
    if (dateRange.start !== undefined && dateRange.end !== undefined) {
      navigate(`?start=${dateRange.start}&end=${dateRange.end}`);

      dispatch(
        userActions.searchHistory({
          start: dateRange.start,
          end: dateRange.end,
        })
      ).then((res) => {
        if (searchIndex === "paid") {
          dispatch({
            type: "PAYMENT_HISTORY_SEARCH",
            payload: res.data.result,
          });
        } else {
          dispatch({
            type: "PAYMENT_HISTORY_SEARCH",
            payload: res.data.result,
          });
        }
      });
    }
  }, [dateRange]);

  const RangeShortcutHandler = (dateRange) => {
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
        .format("YYYY-MM-DD"),
      end: dayjs()
        .set("hour", 23)
        .set("minute", 59)
        .set("second", 59)
        .format("YYYY-MM-DD"),
    });
  };

  const rangeCheckHandler = (dateRange) => {
    const { start, end } = dateRange;
    if (dayjs(start).format() > dayjs(end).format()) {
      alert("시작 날짜는 종료 날짜보다 클 수 없습니다");
    } else {
      setStartDate(
        dayjs(start).set("hour", 0).set("minute", 0).set("second", 0)
      );
      setEndDate(
        dayjs(end).set("hour", 23).set("minute", 59).set("second", 59)
      );
      setDateRange({
        start: dayjs(start)
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .format("YYYY-MM-DD"),
        end: dayjs(end)
          .set("hour", 23)
          .set("minute", 59)
          .set("second", 59)
          .format("YYYY-MM-DD"),
      });
    }
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
              onSelect={(selectedDate) => {
                rangeCheckHandler({ start: selectedDate, end: endDate });
              }}
              showToday={true}
              allowClear={false}
              defaultValue={undefined}
              format={"YYYY-MM-DD"}
              locale={datePickerLocale}
              placeholder="시작일"
              popupClassName="delivery_dropdown"
            />
            <span className="mx-2">~</span>
            <DatePicker
              inputReadOnly
              size="small"
              className="history_search_picker"
              value={endDate}
              onSelect={(selectedDate) => {
                rangeCheckHandler({ start: startDate, end: selectedDate });
              }}
              showToday={true}
              allowClear={false}
              defaultValue={undefined}
              format={"YYYY-MM-DD"}
              locale={datePickerLocale}
              placeholder="종료일"
              popupClassName="delivery_dropdown"
            />
          </Col>
          <Col
            lg={"auto"}
            xs={"auto"}
            className={
              endDate.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD") &&
              endDate.diff(startDate, "day") === 7
                ? "text-center shortcut_button align-self-center active"
                : "text-center shortcut_button align-self-center"
            }
          >
            <div
              onClick={() => {
                RangeShortcutHandler({ type: "days", value: 7 });
              }}
            >
              최근 1주일
            </div>
          </Col>
          <Col
            lg={"auto"}
            xs={"auto"}
            className={
              endDate.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD") &&
              endDate.diff(startDate, "month") === 1
                ? "text-center shortcut_button align-self-center active"
                : "text-center shortcut_button align-self-center"
            }
          >
            <div
              onClick={() => {
                RangeShortcutHandler({ type: "month", value: 1 });
              }}
            >
              최근 1개월
            </div>
          </Col>
          <Col
            lg={"auto"}
            xs={"auto"}
            className={
              endDate.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD") &&
              endDate.diff(startDate, "month") === 3
                ? "text-center shortcut_button align-self-center active"
                : "text-center shortcut_button align-self-center"
            }
          >
            <div
              onClick={() => {
                RangeShortcutHandler({ type: "month", value: 3 });
              }}
            >
              최근 3개월
            </div>
          </Col>
          <Col
            lg={"auto"}
            xs={"auto"}
            className={
              endDate.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD") &&
              endDate.diff(startDate, "month") === 6
                ? "text-center shortcut_button align-self-center active"
                : "text-center shortcut_button align-self-center"
            }
          >
            <div
              onClick={() => {
                RangeShortcutHandler({ type: "month", value: 6 });
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
