import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { forSaleProductActions } from "../redux/actions/forSaleProductActions";
import { userActions } from "../redux/actions/userActions";

import Loading from "../components/Loading";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { brown } from "@mui/material/colors";

import GuideBread from "./GuideBread";
import GuideRice from "./GuideRice";
import { BsCart4 } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";

import Delivery from "../components/productOrder/Delivery";
import Lettering from "../components/productOrder/Lettering";
import DesignTopper from "../components/productOrder/DesignTopper";
import CustomerRequest from "../components/productOrder/CustomerRequest";

import "./css/orderDetail.css";

const OrderDetail = () => {
  const dispatch = useDispatch();

  const { productId } = useParams();

  const { width } = useWindowDimensions();

  const { loading, productDetail } = useSelector(
    (state) => state.forSaleProduct
  );

  const {
    deliveryType,
    deliveryDate,
    deliveryTime,
    letteringToggle,
    letteringText,
    designTopperToggle,
    designTopperText,
    customerRequestText,
  } = useSelector((state) => state.order);

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

  let orderForm = {
    ??????_??????: deliveryType,
    ??????_??????: deliveryDate,
    ??????_??????: deliveryTime,
    ?????????_??????: letteringToggle,
    ?????????_??????: letteringText,
    ???????????????_??????: designTopperToggle,
    ???????????????_??????: designTopperText,
    ??????_??????: customerRequestText,
  };

  const { handleSubmit, control } = useForm();

  const [option, setOption] = useState([]);
  const [optionPrice, setOptionPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // // lengthCheck
  // const [topperLength, setTopperLength] = useState(0);
  // const [topperLengthError, setTopperLengthError] = useState(false);
  // const topperLengthHandler = (value) => {
  //   if (value.length > 15) {
  //     setTopperLengthError(true);
  //   } else {
  //     setTopperLengthError(false);
  //     setTopperLength(value.length);
  //   }
  // };

  const optionConfirmHandler = () => {
    if (orderForm.???????????????_?????? && orderForm.???????????????_??????.length !== 0) {
      // if (0 < orderForm.???????????????_??????.length && orderForm.???????????????_??????.length <= 10) {
      //   console.log("6000??? ?????????");
      //   setOptionPrice((prevPrice) => prevPrice + 6000);
      // } else {
      //   console.log("9000??? ?????????");
      //   setOptionPrice((prevPrice) => prevPrice + 9000);
      // }
    }

    // let totalPrice = (
    //   parseInt(productDetail.price) + optionPrice
    // ).toLocaleString("ko-KR");

    // setTotalPrice(totalPrice);

    console.log("orderForm", orderForm);

    if (
      !orderForm.??????_?????? ||
      !orderForm.??????_?????? ||
      !orderForm.??????_?????? ||
      (orderForm.?????????_?????? === "?????? ??????" && !orderForm.?????????_??????) ||
      (orderForm.???????????????_?????? === "?????? ??????" && !orderForm.???????????????_??????)
    ) {
      alert("????????? ?????? ????????? ?????????");
    } else {
      setOption((prev) => [...prev, orderForm]);
      dispatch({ type: "RESET_FORM" });
    }
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
                    <Delivery control={control} />
                    <Lettering control={control} />
                    <DesignTopper control={control} />
                    <CustomerRequest control={control} />

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
                                  <div className="me-2">
                                    ????????? ??? ????????? / {item.?????????_??????}
                                  </div>
                                ) : (
                                  <div className="disabled_text">
                                    ????????? ??? ????????? / ???????????? ??????
                                  </div>
                                )}

                                {item.???????????????_?????? === "?????? ??????" ? (
                                  <div className="me-2">
                                    ????????? ?????? ?????? / {item.???????????????_??????}
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
          </Container>
        </>
      )}
    </motion.div>
  );
};

export default OrderDetail;
