import React, { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { forSaleProductAction } from "../redux/actions/forSaleProductAction";
import Loading from "../components/Loading";
import axios from "axios";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import {
  Button,
  TextareaAutosize,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  InputAdornment,
} from "@mui/material";
// import DatePicker from "react-datepicker";

import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";

import "./css/productDetail.css";
import "react-datepicker/dist/react-datepicker.css";
import { textAlign } from "@mui/system";

import DatePicker from "../components/DatePicker";

const ProductDetail = () => {
  registerLocale("ko", ko);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");

  const { loading, productDetail } = useSelector(
    (state) => state.forSaleProduct
  );

  useEffect(() => {
    dispatch(forSaleProductAction.getDetail(productId));
  }, []);

  const [startDate, setStartDate] = useState(new Date());
  const DatePickerCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button className="calendar_btn" onClick={onClick} ref={ref}>
      {value ? (
        <span className="p-2">{value}</span>
      ) : (
        <span className="p-2">날짜를 선택해 주세요</span>
      )}
    </Button>
  ));

  const { handleSubmit, control } = useForm();

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   let body = {
  //     수령_방법: 수령_방법,
  //     수령_날짜: 수령_날짜,
  //     픽업_시간: 픽업_시간,
  //     레터링_여부: 레터링_여부,
  //     레터링_문구: 레터링_문구,
  //   };

  //   if (body.수령_방법 === "") {
  //     alert("수령 방법을 선택 해 주세요");
  //   } else if (body.수령_날짜 === "") {
  //     alert("수령 날짜를 선택 해 주세요");
  //   } else if (body.픽업_시간 === "") {
  //     alert("픽업 시간을 선택 해 주세요");
  //   } else if (body.레터링_여부 === "") {
  //     alert("레터링 여부를 선택 해 주세요");
  //   } else if (body.레터링_문구 === "") {
  //     alert("레터링 문구를 선택 해 주세요");
  //   }
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: "20px" }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
    >
      {loading ? (
        <Loading text="상품 세부정보 가져오는 중" />
      ) : (
        <Container className="mt-5">
          <Row>
            <Col lg={7}>
              <img
                src={productDetail.image_url}
                alt=""
                className="detail_img"
              />
            </Col>
            <Col lg={5}>
              <h1>{productDetail.title}</h1>
              <h1>₩ {productDetail.price}</h1>
              <h2>{productDetail.description}</h2>

              <div>
                <span>수령 방법</span>
                <Controller
                  control={control}
                  name="수령_방법"
                  render={({ field: { onChange, value, ...field } }) => (
                    <ToggleButtonGroup
                      color="secondary"
                      className="my-4"
                      size="medium"
                      value={value}
                      onChange={(event, value) => {
                        onChange(value);
                      }}
                      exclusive
                      {...field}
                    >
                      <ToggleButton value="직접_방문">직접 방문</ToggleButton>
                      <ToggleButton value="택배">택배</ToggleButton>
                    </ToggleButtonGroup>
                  )}
                />
              </div>

              <div className="d-flex align-items-center">
                <span style={{ whiteSpace: "nowrap" }}>수령 날짜</span>
                <Controller
                  control={control}
                  name="date-input"
                  render={({ field }) => (
                    <DatePicker />
                    // <DatePicker
                    //   locale="ko"
                    //   dateFormat="yyyy/MM/dd (eee)"
                    //   placeholderText="Select date"
                    //   onChange={(date) => field.onChange(date)}
                    //   customInput={<DatePickerCustomInput />}
                    //   includeDateIntervals={[
                    //     {
                    //       start: subDays(new Date(), -1),
                    //       end: addDays(new Date(), 14),
                    //     },
                    //   ]}
                    //   selected={field.value}
                    //   showPopperArrow={false}
                    //   popperPlacement="right"
                    //   previousMonthButtonLabel={<button>HI</button>}
                    // >
                    //   <div
                    //     style={{
                    //       color: "red",
                    //       textAlign: "center",
                    //       padding: "1rem",
                    //     }}
                    //   >
                    //     현재일 기준 2일 이후 예약이 가능합니다
                    //   </div>
                    // </DatePicker>
                  )}
                />
              </div>

              <div>
                <span>레터링 여부</span>
                <Controller
                  control={control}
                  name="레터링_여부"
                  render={({ field: { onChange, value, ...field } }) => (
                    <ToggleButtonGroup
                      color="secondary"
                      className="my-4"
                      size="medium"
                      value={value}
                      onChange={(event, value) => {
                        onChange(value);
                      }}
                      exclusive
                      {...field}
                    >
                      <ToggleButton value="Y">Y</ToggleButton>
                      <ToggleButton value="N">N</ToggleButton>
                    </ToggleButtonGroup>
                  )}
                />
              </div>

              <div>
                <span>레터링 문구</span>
                <Controller
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <TextField
                      id="outlined-basic"
                      label="한글, 특수문자 6자 / 영어, 숫자, 기호 12자 까지 입력 가능합니다"
                      variant="outlined"
                      style={{ width: "100%" }}
                      className="my-4"
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </motion.div>
  );
};

export default ProductDetail;
