import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { forSaleProductActions } from "../redux/actions/forSaleProductActions";
import { userActions } from "../redux/actions/userActions";

import Loading from "../components/Loading";
import useWindowDimensions from "../hooks/useWindowDimensions";
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
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import { brown } from "@mui/material/colors";

import GuideBread from "./GuideBread";
import GuideRice from "./GuideRice";
import { BsStars, BsCart4 } from "react-icons/bs";
import { MdCake, MdRateReview, MdPayment } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";

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

import "./css/orderDetail.css";
import Instagram from "../components/Instagram";
import { textAlign } from "@mui/system";

const OrderDetail = ({ match }) => {
  const dispatch = useDispatch();
  // const [searchParams] = useSearchParams();
  // const productId = searchParams.get("productId");
  const { productId } = useParams();

  const { width, height } = useWindowDimensions();

  const { loading, productDetail } = useSelector(
    (state) => state.forSaleProduct
  );

  useEffect(() => {
    dispatch(forSaleProductActions.getDetail(productId));
  }, []);

  //theme
  const theme = createTheme({
    palette: {
      primary: {
        main: brown[300],
      },
      button: {
        main: brown[500],
      },
    },
  });

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

  const QuantityButton = styled(Button)(() => ({
    width: "10px",
    minWidth: 0,
    height: "10px",
    padding: "10px",
    boxShadow: "none",

    "&:hover": {
      boxShadow: "none",
    },
  }));

  // delivery
  const [delivery, setDelivery] = useState(undefined);

  const deliveryHandler = (value) => {
    console.log(delivery);
    setDelivery(value);
  };

  // date
  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [modifiedDate, setModifiedDate] = useState(undefined);
  const [dateError, setDateError] = useState(undefined);

  const dateHandler = (event) => {
    setDate(event);
    const date = new Date(event);
    const modifiedDate = format(date, "yyyy??? MM??? dd??? (eee)", { locale: ko });
    setModifiedDate(modifiedDate);
  };

  //  time
  const [timeOpen, setTimeOpen] = useState(false);
  const [time, setTime] = useState(null);
  const [modifiedTime, setModifiedTime] = useState(undefined);
  const [minTime, setMinTime] = useState(undefined);
  const [maxTime, setMaxTime] = useState(undefined);
  const [timeError, setTimeError] = useState(undefined);

  const timeHandler = (event) => {
    setTime(event);
    const date = new Date(event);
    const modifiedTime = format(date, "a hh : mm", { locale: ko });
    setModifiedTime(modifiedTime);
  };

  const storeHourHandler = (event) => {
    // ??????     am 11:00 ~ pm 7:30
    // ?????????   am 10:00 ~ pm 4:00
    // ?????????   am 10:00 ~ pm 12:00

    const selectedDay = format(event, "eee", { locale: ko });
    console.log("selectedDay", selectedDay);

    if (selectedDay === "???") {
      setMinTime(new Date(0, 0, 0, 10));
      setMaxTime(new Date(0, 0, 0, 16));
    } else if (selectedDay === "???") {
      setMinTime(new Date(0, 0, 0, 10));
      setMaxTime(new Date(0, 0, 0, 12));
    } else {
      setMinTime(new Date(0, 0, 0, 11));
      setMaxTime(new Date(0, 0, 0, 19, 30));
    }
  };

  // topper
  const [topper, setTopper] = useState(false);
  const topperHandler = (value) => {
    setTopper(value);
    console.log(value);
  };

  const [topperText, setTopperText] = useState("");
  const topperTextHandler = (value) => {
    setTopperText(value);
    console.log(value);
  };

  // lettering
  const [lettering, setLettering] = useState(false);
  const letteringHandler = (value) => {
    setLettering(value);
    console.log(value);
  };

  const [letteringText, setLetteringText] = useState("");
  const letteringTextHandler = (value) => {
    setLetteringText(value);
    console.log(value);
  };

  // request
  const [request, setRequest] = useState("");
  const requestHandler = (value) => {
    setRequest(value);
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

  ////////////////////////////////

  let orderForm = {
    ??????_??????: delivery,
    ??????_??????: modifiedDate,
    ??????_??????: modifiedTime,
    ?????????_??????: lettering,
    ?????????_??????: letteringText,
    ??????_??????: topper,
    ??????_??????: topperText,
    ??????_??????: request,
  };

  const { handleSubmit, control } = useForm();

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   let body = {
  //     ??????_??????: ??????_??????,
  //     ??????_??????: ??????_??????,
  //     ??????_??????: ??????_??????,
  //     ?????????_??????: ?????????_??????,
  //     ?????????_??????: ?????????_??????,
  //   };

  //   if (body.??????_?????? === "") {
  //     alert("?????? ????????? ?????? ??? ?????????");
  //   } else if (body.??????_?????? === "") {
  //     alert("?????? ????????? ?????? ??? ?????????");
  //   } else if (body.??????_?????? === "") {
  //     alert("?????? ????????? ?????? ??? ?????????");
  //   } else if (body.?????????_?????? === "") {
  //     alert("????????? ????????? ?????? ??? ?????????");
  //   } else if (body.?????????_?????? === "") {
  //     alert("????????? ????????? ?????? ??? ?????????");
  //   }
  // };

  const [option, setOption] = useState([]);
  const [optionPrice, setOptionPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const optionConfirmHandler = () => {
    // let orderForm = {
    //   ??????_??????: delivery,
    //   ??????_??????: modifiedDate,
    //   ??????_??????: modifiedTime,
    //   ?????????_??????: lettering,
    //   ?????????_??????: letteringText,
    //   ??????_??????: topper,
    //   ??????_??????: topperText,
    //   ??????_??????: request,
    //   ??????: 1,
    // };

    // if (!topper && !lettering) {
    //   return alert(
    //     "????????? ??? ????????? / ????????? ?????? ?????? ????????? ?????? ??? ?????????"
    //   );
    // } else if (!topper) {
    //   return alert("????????? ?????? ?????? ????????? ????????? ?????????");
    // } else if (!lettering) {
    //   return alert("????????? ??? ????????? ?????? ????????? ????????? ?????????");
    // }

    if (!delivery || !date || !time || !lettering || !topper) {
      return alert("????????? ?????? ?????? ??? ?????????");
    }

    if (orderForm.??????_?????? && orderForm.??????_??????.length !== 0) {
      if (0 < orderForm.??????_??????.length && orderForm.??????_??????.length <= 10) {
        console.log("6000??? ?????????");
        setOptionPrice((prevPrice) => prevPrice + 6000);
      } else {
        console.log("9000??? ?????????");
        setOptionPrice((prevPrice) => prevPrice + 9000);
      }
    } else {
      setTopperLengthError(true);
    }

    let totalPrice = (
      parseInt(productDetail.price) + optionPrice
    ).toLocaleString("ko-KR");
    setTotalPrice(totalPrice);
    setOption((prev) => [...prev, orderForm]);

    // form reset
    setDelivery(null);

    setDate(null);
    setModifiedDate(null);

    setTime(null);
    setModifiedTime(null);

    setTopper(null);
    setTopperText("");

    setLettering(null);
    setLetteringText("");

    setRequest("");
  };

  const optionRemoveHandler = (optionIndex) => {
    const confirm = window.confirm("?????? ????????? ??????????????????????");

    if (confirm) {
      setOption(option.filter((item, index) => index !== optionIndex));
    } else {
      return;
    }
  };

  const addToCartHandler = () => {
    dispatch(userActions.addToCart(productId, option));
  };

  const onSubmit = (data) => {
    console.log("submit ??????::::", data);

    // if (data.??????_?????? === "??????") {
    //   data.??????_?????? = null;
    // }
    // console.log(data);
    // ??????????????? ?????? ?????? ????????????.
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "20px" }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
    >
      {loading || !productDetail.image_url ? (
        <Loading text="?????? ???????????? ???????????? ???" />
      ) : (
        <>
          <Container className="detail_container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-5">
                {width < 992 ? (
                  <div style={{ padding: "0 3rem" }}>
                    <h1 className="mb-3 fw-bold">{productDetail.title}</h1>
                    <h5 className="mb-4">{productDetail.description}</h5>
                    <h1 className="mb-4">
                      ??? {productDetail.price.toLocaleString("ko-KR")}
                    </h1>
                  </div>
                ) : null}

                <Col lg={7} className="image_container">
                  <img
                    src={productDetail.image_url}
                    alt=""
                    className="detail_img"
                  />
                  <div className="warning">
                    ????????? ????????? ????????? ??? ???????????? ?????? ????????? ?????? ???
                    ????????????
                  </div>

                  {/* <Row>
                    <Col sm={12} md={4} className="plus_tag">
                      <MdCake size={35} color={"white"} className="m-2" />
                      <span className="w-75">
                        ????????? ????????? ???????????????
                        <br /> ???????????? ?????? ????????? ?????????
                      </span>
                    </Col>
                    <Col sm={12} md={4} className="plus_tag">
                      <MdRateReview size={35} color={"white"} className="m-2" />
                      <span className="w-75">
                        ??????????????? ????????????
                        <br /> ????????? ?????? ????????? ???
                      </span>
                    </Col>
                    <Col sm={12} md={4} className="plus_tag">
                      <BsStars size={35} color={"white"} className="m-2" />
                      <span className="w-75">
                        ????????? ?????? <br /> ?????? ???????????? ?????? ?????????
                      </span>
                    </Col>
                  </Row> */}
                </Col>

                <Col lg={5} className="px-5">
                  {width > 992 ? (
                    <>
                      <h1 className="mb-3 fw-bold">{productDetail.title}</h1>
                      <h5 className="mb-4">{productDetail.description}</h5>
                      <h1 className="mb-4">
                        ??? {Number(productDetail.price).toLocaleString("ko-KR")}
                      </h1>
                    </>
                  ) : null}

                  <ThemeProvider theme={theme}>
                    <div>
                      <div className="option_menu_section">
                        <div className="option_menu_text">
                          <div>?????? ??????</div>
                          {/* <div className="warning">
                            * ?????? ???????????? ?????? ????????????
                          </div> */}
                        </div>
                        <div className="controller_container">
                          <Controller
                            control={control}
                            name="??????_??????"
                            render={({
                              field: { onChange, value, ...field },
                            }) => (
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
                                <CustomToggleButton value="?????? ??????">
                                  <div
                                    style={{
                                      fontSize: "1rem",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    ?????? ??????
                                  </div>
                                </CustomToggleButton>
                                <CustomToggleButton value="?????? ??????">
                                  <div
                                    style={{
                                      fontSize: "1rem",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    ?????? ??????
                                  </div>
                                </CustomToggleButton>
                                <CustomToggleButton value="??????" disabled>
                                  <div
                                    style={{
                                      fontSize: "1rem",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    ??????
                                  </div>
                                </CustomToggleButton>
                              </ToggleButtonGroup>
                            )}
                          />
                        </div>
                      </div>

                      {delivery === "?????? ??????" ? (
                        <div className="flex-column option_menu_section">
                          <div
                            style={{
                              color: "red",
                              fontWeight: "bold",
                              marginBottom: "1rem",
                            }}
                          >
                            ???????????? ???????????? ??????
                          </div>
                          <div
                            style={{ fontSize: "0.85rem", textAlign: "start" }}
                          >
                            <div>
                              <div>
                                ????????? ????????? ?????? ???????????? ?????? 1:1 ??????
                                ??????????????? ???????????????
                                <br></br>
                                ???????????? ?????? ?????? ???????????? ?????? ??????????????? ??????
                                ??? ?????????
                                <br></br>
                                ?????? ????????? ????????? ?????? ??????????????????
                                <br></br>
                              </div>

                              <div className="py-3">
                                ?????? ??????
                                <div style={{ color: "red" }}>
                                  * ?????? / ?????? ??? ?????????, ?????? ?????? ?????? ??????
                                </div>
                                ????????? ??? : ??? 9,000 ~<br></br>
                                ?????? / ?????? : ??? 10,000 ~ ??? 50,000
                              </div>

                              <div>
                                <span style={{ color: "red" }}>
                                  ?????? ??? ?????? , ?????? ???????????? ?????? ?????? ?????????
                                  ???????????? ??????????????????
                                </span>
                                <br></br>
                                ??????????????? ????????? ???????????? ??????????????? ???????????????
                                <br></br>
                                ???????????? ?????? ????????? ?????? ???????????? ??????????????????
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={ko}
                    >
                      <div className="option_menu_section">
                        <span className="option_menu_text">?????? ??????</span>
                        <div className="controller_container">
                          <Controller
                            control={control}
                            name="??????_??????"
                            defaultValue={null}
                            render={({
                              field: { onChange, value, ...field },
                            }) => (
                              <DesktopDatePicker
                                {...field}
                                className="mui_x_custom"
                                minDate={addDays(new Date(), 3)}
                                maxDate={addDays(new Date(), 14)}
                                inputFormat="yyyy.MM.dd (eee)"
                                disableMaskedInput
                                dayOfWeekFormatter={(day) => `${day}`}
                                value={date}
                                onChange={(event) => {
                                  onChange(event);
                                  dateHandler(event);
                                  storeHourHandler(event);
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
                                    error={
                                      dateError && !delivery ? true : false
                                    }
                                    helperText={
                                      dateError && !delivery
                                        ? "?????? ????????? ?????? ????????? ?????????"
                                        : null
                                    }
                                    inputProps={{
                                      ...params.inputProps,
                                      readOnly: true,
                                      style: {
                                        cursor: "pointer",
                                      },
                                      placeholder: "????????? ????????? ?????????",
                                    }}
                                  />
                                )}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="option_menu_section">
                        <span className="option_menu_text">?????? ??????</span>
                        <div className="controller_container">
                          <Controller
                            control={control}
                            name="??????_??????"
                            defaultValue={null}
                            render={({
                              field: { onChange, value, ...field },
                            }) => (
                              <TimePicker
                                {...field}
                                className="mui_x_custom"
                                value={delivery === "??????" ? null : time}
                                minTime={minTime}
                                maxTime={maxTime}
                                disableMaskedInput
                                inputFormat="a hh:mm"
                                onChange={(event) => {
                                  onChange(event);
                                  timeHandler(event);

                                  console.log(event);
                                }}
                                disabled={delivery === "??????" ? true : false}
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
                                      timeError && !date
                                        ? "????????? ?????? ????????? ?????????"
                                        : null
                                    }
                                    inputProps={{
                                      ...params.inputProps,
                                      readOnly: true,
                                      style: {
                                        cursor: "pointer",
                                      },
                                      placeholder:
                                        delivery === "??????"
                                          ? "?????? ????????? ?????? ??????"
                                          : "????????? ????????? ?????????",
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
                    </LocalizationProvider>

                    <div className="d-block option_menu_section">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="option_menu_text">
                          ????????? ??? ?????????
                        </span>
                        <div className="controller_container">
                          <Controller
                            control={control}
                            name="?????????_??????"
                            render={({
                              field: { onChange, value, ...field },
                            }) => (
                              <ToggleButtonGroup
                                color="button"
                                size="medium"
                                defaultValue={false}
                                value={lettering}
                                onChange={(e) => {
                                  onChange(e.target.value);
                                  letteringHandler(e.target.value);
                                }}
                                exclusive
                                fullWidth
                                style={{
                                  whiteSpace: "nowrap",
                                }}
                                {...field}
                              >
                                <CustomToggleButton value="?????? ??????">
                                  <div
                                    style={{
                                      fontSize: "1rem",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    ?????? ??????
                                  </div>
                                </CustomToggleButton>
                                <CustomToggleButton value="???????????? ??????">
                                  <div
                                    style={{
                                      fontSize: "1rem",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    ???????????? ??????
                                  </div>
                                </CustomToggleButton>
                              </ToggleButtonGroup>
                            )}
                          />
                        </div>
                      </div>

                      <div
                        className={
                          lettering === "?????? ??????" ? "input_visible" : "input_hide"
                        }
                      >
                        <div className="d-flex justify-content-between">
                          <div>????????? ?????? {`(${letteringLength}/15)`}</div>
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "red",
                              marginBottom: "1rem",
                            }}
                          >
                            * ????????? ????????? ??????????????? ????????? ?????? ?????????
                          </div>
                        </div>
                        <Controller
                          control={control}
                          name="?????????_??????"
                          defaultValue=""
                          render={({
                            field: { onChange, value, ...field },
                          }) => (
                            <TextField
                              // label="?????? 15??? ?????? ?????? ???????????????"
                              placeholder="?????? 15??? ?????? ?????? ???????????????"
                              inputProps={{ maxLength: 15 }}
                              value={letteringText}
                              error={letteringLengthError ? true : false}
                              helperText={
                                letteringLengthError
                                  ? "????????? ????????? ?????????"
                                  : null
                              }
                              onChange={(e) => {
                                onChange(e.target.value);
                                letteringTextHandler(e.target.value);
                                LetteringLengthHandler(e.target.value);
                              }}
                              variant="outlined"
                              fullWidth
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="d-block option_menu_section">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="option_menu_text">????????? ??????</span>
                        <div className="controller_container">
                          <Controller
                            control={control}
                            name="??????_??????"
                            render={({
                              field: { onChange, value, ...field },
                            }) => (
                              <ToggleButtonGroup
                                color="button"
                                size="medium"
                                // defaultValue={false}
                                value={topper}
                                onChange={(e) => {
                                  onChange(e.target.value);
                                  topperHandler(e.target.value);
                                }}
                                exclusive
                                fullWidth
                                style={{
                                  whiteSpace: "nowrap",
                                }}
                                {...field}
                              >
                                <CustomToggleButton value="?????? ??????">
                                  <div
                                    style={{
                                      fontSize: "1rem",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    ?????? ??????
                                  </div>
                                </CustomToggleButton>
                                <CustomToggleButton value="???????????? ??????">
                                  <div
                                    style={{
                                      fontSize: "1rem",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    ???????????? ??????
                                  </div>
                                </CustomToggleButton>
                              </ToggleButtonGroup>
                            )}
                          />
                        </div>
                      </div>

                      <div
                        className={
                          topper === "?????? ??????" ? "input_visible" : "input_hide"
                        }
                      >
                        <div className="d-flex justify-content-between">
                          <div>?????? ?????? {`(${topperLength}/15)`}</div>
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "red",
                              marginBottom: "1rem",
                            }}
                          >
                            * 10??? ??? +6,000??? / 15??? ??? +9,000???
                          </div>
                        </div>

                        <Controller
                          control={control}
                          name="??????_??????"
                          defaultValue=""
                          render={({
                            field: { onChange, value, ...field },
                          }) => (
                            <TextField
                              // label="?????? 15??? ?????? ?????? ???????????????"
                              placeholder="?????? 15??? ?????? ?????? ???????????????"
                              inputProps={{ maxLength: 15 }}
                              value={topperText}
                              error={topperLengthError ? true : false}
                              helperText={
                                topperLengthError
                                  ? "????????? ????????? ?????????"
                                  : null
                              }
                              onChange={(e) => {
                                onChange(e.target.value);
                                topperTextHandler(e.target.value);
                                topperLengthHandler(e.target.value);
                              }}
                              variant="outlined"
                              fullWidth
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="d-block border-0 option_menu_section">
                      <div className="d-flex justify-content-between">
                        <div>?????? ??????</div>
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "red",
                            marginBottom: "1rem",
                          }}
                        >
                          * ????????? ?????? ????????? ???????????? ????????????
                        </div>
                      </div>

                      <Controller
                        control={control}
                        name="??????_??????"
                        defaultValue=""
                        render={({ field: { onChange, value, ...field } }) => (
                          <TextField
                            {...field}
                            // multiline
                            // label="????????? ?????? ????????? ???????????? ????????????"
                            fullWidth
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={request}
                            onChange={(e) => {
                              onChange(e.target.value);
                              requestHandler(e.target.value);
                            }}
                          />
                        )}
                      />
                    </div>

                    <Button
                      variant="contained"
                      type="button"
                      style={{ height: "50px" }}
                      onClick={() => optionConfirmHandler()}
                      fullWidth
                    >
                      <AiOutlineCheckCircle
                        size={25}
                        style={{
                          marginRight: "5px",
                          position: "relative",
                        }}
                      />
                      <div style={{ fontSize: "1rem", pointerEvents: "none" }}>
                        ???????????? ??????
                      </div>
                    </Button>

                    {option.length > 0 ? (
                      <>
                        {option.map((item, index) => {
                          return (
                            <Row
                              key={index}
                              className="order_preview align-items-center p-3"
                            >
                              <Col className="d-flex flex-row justify-content-between mb-2">
                                <div className="fw-bold">
                                  {productDetail.title}
                                </div>

                                <div className="d-flex flex-row justify-content-center align-items-center">
                                  <QuantityButton
                                    variant="contained"
                                    onClick={() => (item.?????? = item.?????? + 1)}
                                  >
                                    <div style={{ fontSize: "1.5rem" }}>-</div>
                                  </QuantityButton>
                                  <div className="mx-3 user-select-none">
                                    {item.??????}
                                  </div>
                                  <QuantityButton variant="contained">
                                    <div style={{ fontSize: "1.5rem" }}>+</div>
                                  </QuantityButton>
                                </div>

                                <div
                                  className="remove_button"
                                  onClick={() => optionRemoveHandler(index)}
                                >
                                  X
                                </div>
                              </Col>

                              <Col lg={12} className="mb-2">
                                <div>
                                  <span>
                                    {item.??????_??????} / {item.??????_??????} /{" "}
                                    {item.??????_??????}
                                  </span>
                                </div>
                              </Col>

                              <Col>
                                {item.?????????_?????? === "?????? ??????" ? (
                                  <div>
                                    <span className="me-2">
                                      ????????? ??? ????????? / {item.?????????_??????}
                                    </span>
                                  </div>
                                ) : (
                                  <div className="disabled_text">
                                    ????????? ??? ????????? / ???????????? ??????
                                  </div>
                                )}

                                {item.??????_?????? === "?????? ??????" ? (
                                  <div>
                                    <span className="me-2">
                                      ????????? ?????? ?????? / {item.??????_??????}
                                    </span>
                                  </div>
                                ) : (
                                  <div className="disabled_text">
                                    ????????? ?????? / ???????????? ??????
                                  </div>
                                )}

                                {item.??????_?????? ? (
                                  <div>
                                    <span className="me-2">
                                      ?????? ?????? / {item.??????_??????}
                                    </span>
                                  </div>
                                ) : null}
                              </Col>
                            </Row>
                          );
                        })}

                        <Row
                          className="p-5"
                          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                        >
                          <Col className="justify-content-center align-items-center">
                            ?????? ??????
                          </Col>
                          <Col className="align-items-center">
                            <span
                              style={{ fontSize: "1.1rem", opacity: "0.6" }}
                            >
                              ??? ?????? x???
                            </span>
                            <span>??? {totalPrice}</span>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <Button
                              variant="contained"
                              type="button"
                              style={{ height: "50px" }}
                              onClick={() => addToCartHandler()}
                              fullWidth
                            >
                              <MdPayment
                                size={25}
                                style={{
                                  marginRight: "5px",
                                  position: "relative",
                                }}
                              />
                              <div
                                style={{
                                  fontSize: "1rem",
                                  pointerEvents: "none",
                                }}
                              >
                                ????????????
                              </div>
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              variant="contained"
                              type="submit"
                              style={{ height: "50px" }}
                              onClick={() => addToCartHandler()}
                              fullWidth
                            >
                              <BsCart4
                                size={25}
                                style={{
                                  marginRight: "5px",
                                  position: "relative",
                                  bottom: "3px",
                                }}
                              />
                              <div
                                style={{
                                  fontSize: "1rem",
                                  pointerEvents: "none",
                                }}
                              >
                                ????????????
                              </div>
                            </Button>
                          </Col>
                        </Row>
                      </>
                    ) : null}
                  </ThemeProvider>
                </Col>
              </Row>
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

export default OrderDetail;
