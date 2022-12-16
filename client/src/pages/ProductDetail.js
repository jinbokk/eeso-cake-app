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
  ToggleButtonGroup,
  ToggleButton,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

import GuideBread from "./GuideBread";
import GuideRice from "./GuideRice";
import { BsStars } from "react-icons/bs";
import { MdCake, MdRateReview } from "react-icons/md";

////////////////////////////////////////

// import DatePicker from "react-datepicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, addDays } from "date-fns";
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

  //theme
  const theme = createTheme({
    palette: {
      primary: {
        main: pink[300],
      },
      secondary: {
        main: pink[500],
      },
    },
  });

  // delivery
  const [delivery, setDelivery] = useState(undefined);
  const deliveryHandler = (value) => {
    setDelivery(value);
  };

  // date
  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState(undefined);
  const dateHandler = (value) => {
    // const date = new Date(value);
    // const weekday = ["일", "월", "화", "수", "목", "금", "토"];
    // const modifiedDate =
    //   date.getFullYear() +
    //   "년 " +
    //   (date.getMonth() + 1) +
    //   "월 " +
    //   date.getDate() +
    //   "일 " +
    //   `(${weekday[date.getDay()]})`;

    const date = new Date(value);
    const modifiedDate = format(date, "yyyy년 MM월 dd일 (eee)", { locale: ko });
    setDate(modifiedDate);
  };

  //  time
  const [timeOpen, setTimeOpen] = useState(false);
  const [time, setTime] = useState(undefined);
  const [minTime, setMinTime] = useState(undefined);
  const [maxTime, setMaxTime] = useState(undefined);
  const timeHandler = (value) => {
    const date = new Date(value);
    const modifiedTime = format(date, "a hh : mm", { locale: ko });
    setTime(modifiedTime);
  };

  const storeHourHandler = (date) => {
    // 평일     am 11:00 ~  pm 7:30
    // 토요일   am 10:00 ~  pm 4:00
    // 일요일   am 10:00 ~  pm 12:00

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

    console.log(minTime);
    console.log(maxTime);
  };

  const [timeError, setTimeError] = useState(undefined);

  // topper
  const [topper, setTopper] = useState(undefined);
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

  // request
  const [request, setRequest] = useState(undefined);
  const requestHandler = (value) => {
    setRequest(value);
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
    수령_시간: time,
    레터링_추가: lettering,
    레터링_문구: letteringText,
    토퍼_추가: topper,
    토퍼_문구: topperText,
    요청_사항: request,
  };

  const { handleSubmit, control } = useForm();

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   let body = {
  //     수령_방법: 수령_방법,
  //     수령_날짜: 수령_날짜,
  //     수령_시간: 수령_시간,
  //     레터링_추가: 레터링_추가,
  //     레터링_문구: 레터링_문구,
  //   };

  //   if (body.수령_방법 === "") {
  //     alert("수령 방법을 선택 해 주세요");
  //   } else if (body.수령_날짜 === "") {
  //     alert("수령 날짜를 선택 해 주세요");
  //   } else if (body.수령_시간 === "") {
  //     alert("픽업 시간을 선택 해 주세요");
  //   } else if (body.레터링_추가 === "") {
  //     alert("레터링 여부를 선택 해 주세요");
  //   } else if (body.레터링_문구 === "") {
  //     alert("레터링 문구를 선택 해 주세요");
  //   }
  // };

  const [option, setOption] = useState([]);
  const [optionPrice, setOptionPrice] = useState(0);

  const optionConfirmHandler = () => {
    if (orderForm.토퍼_문구 && orderForm.토퍼_문구.length !== 0) {
      if (0 < orderForm.토퍼_문구.length && orderForm.토퍼_문구.length <= 10) {
        console.log("6000원 플러스");
        setOptionPrice((prevPrice) => prevPrice + 6000);
      } else {
        console.log("9000원 플러스");
        setOptionPrice((prevPrice) => prevPrice + 9000);
      }
    } else {
      setTopperLengthError(true);
    }

    let totalPrice = Number(productDetail.price) + optionPrice;
    console.log("total ::::", totalPrice);

    option.push(orderForm);
    console.log(option);
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
          <Container className="detail_container py-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-5">
                <Col lg={7} className="image_container">
                  <img
                    src={productDetail.image_url}
                    alt=""
                    className="detail_img"
                  />
                  <div className="warning">
                    * 수작업 케이크 특성상 위 이미지와 다소 차이가 있을 수
                    있습니다
                  </div>

                  <Row>
                    <Col sm={12} md={4} className="plus_tag">
                      <MdCake size={35} color={"white"} className="m-2" />
                      <span className="w-75">
                        첨가제 사용을 최소화하고
                        <br /> 정성스레 만든 건강한 케이크
                      </span>
                    </Col>
                    <Col sm={12} md={4} className="plus_tag">
                      <MdRateReview size={35} color={"white"} className="m-2" />
                      <span className="w-75">
                        고객님들의 만족스런
                        <br /> 리뷰를 통해 검증된 맛
                      </span>
                    </Col>
                    <Col sm={12} md={4} className="plus_tag">
                      <BsStars size={35} color={"white"} className="m-2" />
                      <span className="w-75">
                        특별한 날을 <br /> 더욱 특별하게 빛내 보세요
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col lg={5}>
                  <h1>{productDetail.title}</h1>
                  <h5>{productDetail.description}</h5>
                  <h1>₩ {productDetail.price}</h1>

                  <ThemeProvider theme={theme}>
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
                          defaultValue={null}
                          render={({
                            field: { onChange, value, ...field },
                          }) => (
                            <DesktopDatePicker
                              {...field}
                              sx={{
                                "& .MuiPickersDay": {
                                  backgroundColor: "red",
                                },
                              }}
                              minDate={addDays(new Date(), 3)}
                              maxDate={addDays(new Date(), 14)}
                              inputFormat="yyyy.MM.dd (eee)"
                              disableMaskedInput
                              dayOfWeekFormatter={(day) => `${day}`}
                              value={value}
                              onChange={(e) => {
                                onChange(e);
                                dateHandler(e);
                                storeHourHandler(e);
                              }}
                              open={dateOpen}
                              onOpen={() => setDateOpen(true)}
                              onClose={() => setDateOpen(false)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  onClick={(e) => {
                                    setDateOpen(true);
                                  }}
                                  inputProps={{
                                    ...params.inputProps,
                                    readOnly: true,
                                    style: { cursor: "pointer" },
                                    placeholder: "날짜를 선택해 주세요",
                                  }}
                                />
                              )}
                            />
                          )}
                        />
                      </div>

                      <div className="d-flex align-items-center">
                        <span style={{ whiteSpace: "nowrap" }}>수령 시간</span>
                        <Controller
                          control={control}
                          name="수령_시간"
                          defaultValue={null}
                          render={({
                            field: { onChange, value, ...field },
                          }) => (
                            <TimePicker
                              {...field}
                              sx={{
                                "& .MuiPickersToolbar-content": {
                                  flexDirection: "row-reverse",
                                  justifyContent: "center",
                                },
                                "& .MuiTimePickerToolbar-ampmLabel": {
                                  padding: "4px",
                                },
                                "& .MuiTimePickerToolbar-ampmLabel.Mui-selected":
                                  {
                                    color: pink[300],
                                  },
                                "& .MuiTimePickerToolbar-ampmSelection": {
                                  flexDirection: "row",
                                  marginRight: "10px",
                                },
                              }}
                              disableMaskedInput
                              // orientation="landscape"
                              value={delivery === "택배" ? null : value}
                              minTime={minTime}
                              maxTime={maxTime}
                              inputFormat="a hh:mm"
                              onChange={(e) => {
                                onChange(e);
                                timeHandler(e);
                              }}
                              disabled={delivery === "택배" ? true : false}
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
                                  onClick={(e) => {
                                    if (!date) {
                                      setTimeError(true);
                                    } else {
                                      setTimeOpen(true);
                                    }
                                  }}
                                  error={timeError && !date ? true : false}
                                  helperText={
                                    timeError && !date
                                      ? "날짜를 먼저 선택해 주세요"
                                      : null
                                  }
                                  inputProps={{
                                    ...params.inputProps,
                                    readOnly: true,
                                    style: { cursor: "pointer" },
                                    placeholder:
                                      delivery === "택배"
                                        ? "택배 수령시 시간 설정이 불가합니다"
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
                    </LocalizationProvider>

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
                            // label="최대 15자 까지 입력 가능합니다"
                            placeholder="최대 15자 까지 입력 가능합니다"
                            inputProps={{ maxLength: 15 }}
                            value={value}
                            error={letteringLengthError ? true : false}
                            helperText={
                              letteringLengthError
                                ? "문구를 확인해 주세요"
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
                            // label="최대 15자 까지 입력 가능합니다"
                            placeholder="최대 15자 까지 입력 가능합니다"
                            inputProps={{ maxLength: 15 }}
                            value={value}
                            error={topperLengthError ? true : false}
                            helperText={
                              topperLengthError ? "문구를 확인해 주세요" : null
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
                        render={({ field: { onChange, value, ...field } }) => (
                          <TextField
                            {...field}
                            // multiline
                            // label="레터링 추가 요청은 반영되지 않습니다"
                            variant="outlined"
                            style={{ width: "100%" }}
                            className="my-4"
                            value={value}
                            onChange={(e) => {
                              onChange(e.target.value);
                              requestHandler(e.target.value);
                            }}
                          />
                        )}
                      />
                    </div>

                    <Row>
                      <Col>총 금액</Col>
                      {/* <Col>{Number(productDetail.price) + optionPrice}</Col> */}
                    </Row>

                    {option !== []
                      ? option.map((item, index) => {
                          return (
                            <div key={index} className="order_preview">
                              {/* <div>{index + 1} 번</div> */}
                              <div>
                                <span className="me-2">수령 방법 :</span>
                                <span>{item.수령_방법}</span>
                              </div>
                              <div>
                                <span className="me-2">수령 날짜 :</span>
                                <span>{item.수령_날짜}</span>
                              </div>
                              <div>
                                <span className="me-2">수령 시간 :</span>
                                <span>{item.수령_시간}</span>
                              </div>
                              <div>
                                <span className="me-2">레터링 추가 :</span>
                                <span>{item.레터링_추가}</span>
                              </div>
                              <div>
                                <span className="me-2">레터링 문구 :</span>
                                <span>{item.레터링_문구}</span>
                              </div>
                              <div>
                                <span className="me-2">토퍼 추가 :</span>
                                <span>{item.토퍼_추가}</span>
                              </div>
                              <div>
                                <span className="me-2">토퍼 문구 :</span>
                                <span>{item.토퍼_문구}</span>
                              </div>
                              <div>
                                <span className="me-2">요청 사항 :</span>
                                <span>{item.요청_사항}</span>
                              </div>
                            </div>
                          );
                        })
                      : null}

                    <Button
                      variant="contained"
                      type="button"
                      style={{ height: "50px" }}
                      onClick={() => optionConfirmHandler()}
                    >
                      옵션선택 완료
                    </Button>
                  </ThemeProvider>
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
