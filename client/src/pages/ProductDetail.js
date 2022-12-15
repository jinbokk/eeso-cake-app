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
    setDate(value);
    console.log(value);
  };

  const [time, setTime] = useState();
  const timeHandler = (value) => {
    setTime(value);
    console.log(value);
  };

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");

  const { loading, productDetail } = useSelector(
    (state) => state.forSaleProduct
  );

  useEffect(() => {
    dispatch(forSaleProductAction.getDetail(productId));
  }, []);

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

  const onSubmit = (data, event) => {
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
          <Container className="detail_container mt-5">
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
                          onChange={(event, value) => {
                            onChange(value);
                            deliveryHandler(value);
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
                            onChange={(value) => {
                              onChange(value);
                              dateHandler(value);
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
                            onChange={(value) => {
                              console.log(value);
                              onChange(value);
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
                      name="레터링_문구"
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="한글, 특수문자 6자 / 영어, 숫자, 기호 12자 까지 입력 가능합니다"
                          variant="outlined"
                          style={{ width: "100%" }}
                          className="my-4"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <span>요청 사항</span>
                    <Controller
                      control={control}
                      name="요청_사항"
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="레터링 추가 요청은 반영되지 않습니다"
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

              <Row>
                <Col>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ height: "50px" }}
                  >
                    상품 업로드
                  </Button>
                </Col>
              </Row>
            </form>
          </Container>

          <Container>
            {productDetail.ingredient === "rice" ? <GuideRice /> : null}
            {productDetail.ingredient === "bread" || "event" ? (
              <GuideBread />
            ) : null}
            <Instagram />
          </Container>
        </>
      )}
    </motion.div>
  );
};

export default ProductDetail;
