import React, { useEffect, useState, useRef } from "react";
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
import GuideBread from "./GuideBread";
import GuideRice from "./GuideRice";

////////////////////////////////////////

// import DatePicker from "react-datepicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ko } from "date-fns/locale";

////////////////////////////////////////

import "./css/productDetail.css";
import Instagram from "../components/Instagram";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");

  const { loading, productDetail } = useSelector(
    (state) => state.forSaleProduct
  );

  useEffect(() => {
    dispatch(forSaleProductAction.getDetail(productId));
  }, []);

  // delivery

  const [delivery, setDelivery] = useState();
  const deliveryHandler = (value) => {
    if (value === "택배") {
      setDelivery(true);
    } else {
      setDelivery(false);
    }
    console.log(value);
    console.log(delivery);
  };

  // date & time

  const [date, setDate] = useState();
  const dateHandler = (value) => {
    // let string = String(value);
    let date = new Date(value);
    var finaldate =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    setDate(value);
    console.log(value);
    console.log(date);
    console.log(finaldate);
    // console.log(string.substring(10, 15)); // year
    // console.log(string.substring(10, 15)); // month
    // console.log(string.substring(10, 15)); // day
  };

  const [time, setTime] = useState();
  const timeHandler = (value) => {
    // let string = String(value);
    setTime(value);
    console.log(value);
  };

  // topper

  const [topper, setTopper] = useState();
  const topperHandler = (value) => {
    setTopper(value);
    console.log(value);
  };

  const [topperText, setTopperText] = useState();
  const topperTextHandler = (value) => {
    setTopperText(value);
    console.log(value);
  };

  // lettering

  const [lettering, setLettering] = useState();
  const letteringHandler = (value) => {
    setLettering(value);
    console.log(value);
  };

  const [letteringText, setLetteringText] = useState();
  const letteringTextHandler = (value) => {
    setLetteringText(value);
    console.log(value);
  };

  // textCheck

  const [topperLength, setTopperLength] = useState(0);
  const [topperLengthError, setTopperLengthError] = useState(false);
  const topperLengthHandler = (value) => {
    if (value.length > 15) {
      setTopperLengthError(true);
    } else {
      setTopperLengthError(false);
      setTopperLength(value.length);
    }
  };

  const [letteringLength, setLetteringLength] = useState(0);
  const [letteringLengthError, setLetteringLengthError] = useState(false);

  const LetteringLengthHandler = (value) => {
    if (value.length > 15) {
      setLetteringLengthError(true);
    } else {
      setLetteringLengthError(false);
      setLetteringLength(value.length);
    }
  };

  // // optionPrice

  // // const [optionPrice, setOptionPrice] = useState(
  // //   productDetail && productDetail.price
  // // );

  // const optionPrice = useRef();

  // optionPrice.current = productDetail.price;

  // console.log(optionPrice);

  // console.log(optionPrice);
  // const optionPriceHandler = (value) => {
  //   if (value === "Y") {
  //     optionPrice.current = optionPrice.current + 3000;
  //     console.log(optionPrice);
  //   }
  //   if (topperLength > 10) {
  //     optionPrice.current = optionPrice.current + 3000;
  //     console.log(optionPrice);
  //   }
  // };

  ////////////////////////////////

  let orderForm = {
    수령_방법: delivery,
    수령_날짜: date,
    픽업_시간: time,
    토퍼_추가: topper,
    토퍼_문구: topperText,
    레터링_추가: lettering,
    레터링_문구: letteringText,
  };

  const { handleSubmit, control } = useForm();

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   let body = {
  //     수령_방법: 수령_방법,
  //     수령_날짜: 수령_날짜,
  //     픽업_시간: 픽업_시간,
  //     레터링_추가: 레터링_추가,
  //     레터링_문구: 레터링_문구,
  //   };

  //   if (body.수령_방법 === "") {
  //     alert("수령 방법을 선택 해 주세요");
  //   } else if (body.수령_날짜 === "") {
  //     alert("수령 날짜를 선택 해 주세요");
  //   } else if (body.픽업_시간 === "") {
  //     alert("픽업 시간을 선택 해 주세요");
  //   } else if (body.레터링_추가 === "") {
  //     alert("레터링 여부를 선택 해 주세요");
  //   } else if (body.레터링_문구 === "") {
  //     alert("레터링 문구를 선택 해 주세요");
  //   }
  // };

  const optionConfirmHandler = () => {
    console.log(orderForm);
  };

  const onSubmit = (data) => {
    console.log(data);
    // if (data.수령_방법 === "택배") {
    //   data.수령_시간 = null;
    // }
    // console.log(data);
    // 어팬드시에 제외 하는 방향으로.
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "20px" }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
    >
      {loading ? (
        <Loading text="상품 세부정보 가져오는 중" />
      ) : (
        <>
          <Container className="detail_container my-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-5">
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
                          onChange={(e) => {
                            onChange(e.target.value);
                            deliveryHandler(e.target.value);
                          }}
                          exclusive
                          {...field}
                        >
                          <ToggleButton value="직접 방문">
                            직접 방문
                          </ToggleButton>
                          <ToggleButton value="택배" disabled>
                            택배
                          </ToggleButton>
                        </ToggleButtonGroup>
                      )}
                    />
                  </div>

                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={ko}
                  >
                    <div className="d-flex align-items-center">
                      <span style={{ whiteSpace: "nowrap" }}>수령 날짜</span>
                      <Controller
                        control={control}
                        name="수령_날짜"
                        defaultValue=""
                        render={({ field: { onChange, value, ...field } }) => (
                          <DesktopDatePicker
                            {...field}
                            disablePast={true}
                            label="날짜를 입력해 주세요"
                            inputFormat="yyyy.MM.dd (eee)"
                            disableMaskedInput
                            dayOfWeekFormatter={(day) => `${day}`}
                            value={value}
                            onChange={(e) => {
                              onChange(e);
                              dateHandler(e);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        )}
                      />
                    </div>

                    <div className="d-flex align-items-center">
                      <span style={{ whiteSpace: "nowrap" }}>수령 시간</span>
                      <Controller
                        control={control}
                        name="수령_시간"
                        defaultValue=""
                        render={({ field: { onChange, value, ...field } }) => (
                          <TimePicker
                            {...field}
                            disableMaskedInput
                            // orientation="landscape"
                            value={!delivery ? value : null}
                            onChange={(e) => {
                              console.log(e);
                              onChange(e);
                              timeHandler(value);
                            }}
                            disabled={delivery ? true : false}
                            label={
                              delivery
                                ? "택배 수령시 시간 설정이 불가합니다"
                                : "시간을 입력해 주세요"
                            }
                            renderInput={(params) => <TextField {...params} />}
                            minutesStep={5}
                            showToolbar
                          />
                        )}
                      />
                    </div>
                  </LocalizationProvider>

                  <div>
                    <span>토퍼 추가</span>
                    <Controller
                      control={control}
                      name="토퍼_추가"
                      render={({ field: { onChange, value, ...field } }) => (
                        <ToggleButtonGroup
                          color="secondary"
                          className="my-4"
                          size="medium"
                          value={value}
                          onChange={(e) => {
                            onChange(e.target.value);
                            topperHandler(e.target.value);
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
                    <span>
                      토퍼 문구 {`(${topperLength}/15)`}
                      <span
                        style={{
                          fontSize: "0.5rem",
                          color: "red",
                          marginLeft: "10px",
                        }}
                      >
                        * 10자 내 +6,000원 / 15자 내 +9,000원
                      </span>
                    </span>
                    <Controller
                      control={control}
                      name="토퍼_문구"
                      defaultValue=""
                      render={({ field: { onChange, value, ...field } }) => (
                        <TextField
                          label="최대 15자 까지 입력 가능합니다"
                          inputProps={{ maxLength: 15 }}
                          value={value}
                          error={topperLengthError ? true : false}
                          helperText={
                            topperLengthError
                              ? "문구 길이를 확인해 주세요"
                              : null
                          }
                          onChange={(e) => {
                            onChange(e.target.value);
                            topperTextHandler(e.target.value);
                            topperLengthHandler(e.target.value);
                          }}
                          variant="outlined"
                          style={{ width: "100%" }}
                          className="my-4"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <span>레터링 추가</span>
                    <Controller
                      control={control}
                      name="레터링_추가"
                      render={({ field: { onChange, value, ...field } }) => (
                        <ToggleButtonGroup
                          color="secondary"
                          className="my-4"
                          size="medium"
                          value={value}
                          onChange={(e) => {
                            onChange(e.target.value);
                            letteringHandler(e.target.value);
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
                    <span>
                      레터링 문구 {`(${letteringLength}/15)`}
                      <span
                        style={{
                          fontSize: "0.5rem",
                          color: "red",
                          marginLeft: "10px",
                        }}
                      >
                        * 레터링 문구는 간결할수록 예쁘게 작업 됩니다
                      </span>
                    </span>
                    <Controller
                      control={control}
                      name="레터링_문구"
                      defaultValue=""
                      render={({ field: { onChange, value, ...field } }) => (
                        <TextField
                          label="최대 15자 까지 입력 가능합니다"
                          inputProps={{ maxLength: 15 }}
                          value={value}
                          error={letteringLengthError ? true : false}
                          helperText={
                            letteringLengthError
                              ? "문구 길이를 확인해 주세요"
                              : null
                          }
                          onChange={(e) => {
                            onChange(e.target.value);
                            letteringTextHandler(e.target.value);
                            LetteringLengthHandler(e.target.value);
                          }}
                          variant="outlined"
                          style={{ width: "100%" }}
                          className="my-4"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <span>
                      요청 사항
                      <span
                        style={{
                          fontSize: "0.5rem",
                          color: "red",
                          marginLeft: "10px",
                        }}
                      >
                        * 레터링 추가 요청은 반영되지 않습니다
                      </span>
                    </span>
                    <Controller
                      control={control}
                      name="요청_사항"
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          // multiline
                          // label="레터링 추가 요청은 반영되지 않습니다"
                          variant="outlined"
                          style={{ width: "100%" }}
                          className="my-4"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <Row>
                    <Col>총 금액</Col>
                    {/* <Col>{productDetail.price + optionPrice}</Col> */}
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button
                    variant="contained"
                    type="button"
                    style={{ height: "50px" }}
                    onClick={optionConfirmHandler}
                  >
                    옵션선택 완료
                  </Button>
                </Col>
              </Row>

              {/* <Row>
                <Col>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ height: "50px" }}
                  >
                    옵션선택 완료
                  </Button>
                </Col>
              </Row> */}
            </form>
          </Container>

          <Container>
            {productDetail.ingredient === "rice" ? <GuideRice /> : null}
            {productDetail.ingredient === "bread" || "event" ? (
              <GuideBread />
            ) : null}
            {/* <Instagram /> */}
          </Container>
        </>
      )}
    </motion.div>
  );
};

export default ProductDetail;
