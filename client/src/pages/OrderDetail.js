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

  const { handleSubmit, control } = useForm();

  const [cartItems, setCartItems] = useState([]);
  const [designTopperPrice, setDesignTopperPrice] = useState(0);

  let createdCart = {
    rootProductId: productDetail._id,
    title: productDetail.title,
    image_url: productDetail.image_url,
    deliveryType: deliveryType,
    deliveryDate: deliveryDate,
    deliveryTime: deliveryTime,
    letteringToggle: letteringToggle,
    letteringText: letteringText,
    designTopperToggle: designTopperToggle,
    designTopperText: designTopperText,
    customerRequestText: customerRequestText,
    quantity: 1,
    price: parseInt(productDetail.price) + parseInt(designTopperPrice),
  };
  // let createdCart = {
  //   rootProductId: productDetail._id,
  //   title: productDetail.title,
  //   image_url: productDetail.image_url,
  //   option: {
  //     deliveryType: deliveryType,
  //     deliveryDate: deliveryDate,
  //     deliveryTime: deliveryTime,
  //     letteringToggle: letteringToggle,
  //     letteringText: letteringText,
  //     designTopperToggle: designTopperToggle,
  //     designTopperText: designTopperText,
  //     customerRequestText: customerRequestText,
  //   },
  //   quantity: 1,
  //   price: parseInt(productDetail.price) + parseInt(designTopperPrice),
  // };

  const optionConfirmHandler = () => {
    if (
      !createdCart.deliveryType ||
      !createdCart.deliveryDate ||
      !createdCart.deliveryTime ||
      (createdCart.letteringToggle === "추가 하기" &&
        !createdCart.letteringText) ||
      (createdCart.designTopperToggle === "추가 하기" &&
        !createdCart.designTopperText)
    ) {
      alert("옵션을 다시 확인해 주세요");
    } else {
      setCartItems((prev) => [...prev, createdCart]);
      dispatch({ type: "RESET_FORM" });
    }
  };

  const optionRemoveHandler = (optionIndex) => {
    const confirm = window.confirm("해당 옵션을 지우시겠습니까?");

    if (confirm) {
      setCartItems(cartItems.filter((item, index) => index !== optionIndex));
    } else {
      return;
    }
  };

  const addToCartHandler = () => {
    dispatch(userActions.addToCart(cartItems));
  };

  const onSubmit = (data) => {
    console.log("submit 완료::::", data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "20px" }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
    >
      {loading || !productDetail.image_url ? (
        <Loading text="상품 세부정보 가져오는 중" />
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
                      ₩ {productDetail.price.toLocaleString("ko-KR")}
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
                    수작업 케이크 특성상 위 이미지와 다소 차이가 있을 수
                    있습니다
                  </div>

                  {/* <Row>
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
                  </Row> */}
                </Col>

                <Col lg={5} className="px-5">
                  {width > 992 ? (
                    <>
                      <h1 className="mb-3 fw-bold">{productDetail.title}</h1>
                      <h5 className="mb-4">{productDetail.description}</h5>
                      <h1 className="mb-4">
                        ₩ {Number(productDetail.price).toLocaleString("ko-KR")}
                      </h1>
                    </>
                  ) : null}

                  <ThemeProvider theme={theme}>
                    <Delivery control={control} cartItems={cartItems} />
                    <Lettering control={control} cartItems={cartItems} />
                    <DesignTopper
                      control={control}
                      cartItems={cartItems}
                      setDesignTopperPrice={setDesignTopperPrice}
                    />
                    <CustomerRequest control={control} cartItems={cartItems} />

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
                        옵션선택 완료
                      </div>
                    </Button>

                    {cartItems.length > 0 ? (
                      <>
                        {cartItems.map((item, index) => {
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
                                    onClick={() => {
                                      if (item.quantity > 1) {
                                        item.quantity = item.quantity - 1;
                                      }
                                      setCartItems((prev) => [...prev]);
                                    }}
                                  >
                                    <div style={{ fontSize: "1.5rem" }}>-</div>
                                  </QuantityButton>
                                  <div className="mx-3 user-select-none">
                                    {item.quantity}
                                  </div>
                                  <QuantityButton
                                    variant="contained"
                                    onClick={() => {
                                      item.quantity = item.quantity + 1;
                                      setCartItems((prev) => [...prev]);
                                    }}
                                  >
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
                                    {item.deliveryType} /{" "}
                                    {item.deliveryDate} /{" "}
                                    {item.deliveryTime}
                                  </span>
                                </div>
                              </Col>

                              <Col>
                                {item.letteringToggle === "추가 하기" ? (
                                  <div className="me-2">
                                    케이크 판 레터링 /{" "}
                                    {item.letteringText}
                                  </div>
                                ) : (
                                  <div className="disabled_text">
                                    케이크 판 레터링 / 추가하지 않기
                                  </div>
                                )}

                                {item.designTopperToggle ===
                                "추가 하기" ? (
                                  <div className="me-2">
                                    디자인 토퍼 문구 (+
                                    {designTopperPrice.toLocaleString("ko-KR")}
                                    원) / {item.designTopperText}
                                  </div>
                                ) : (
                                  <div className="disabled_text">
                                    디자인 토퍼 / 추가하지 않기
                                  </div>
                                )}

                                {item.customerRequestText ? (
                                  <div>
                                    <span className="me-2">
                                      요청 사항 /{" "}
                                      {item.customerRequestText}
                                    </span>
                                  </div>
                                ) : null}

                                <div style={{ textAlign: "end" }}>
                                  ₩{" "}
                                  {(item.quantity * item.price).toLocaleString(
                                    "ko-KR"
                                  )}
                                </div>
                              </Col>
                            </Row>
                          );
                        })}

                        <Row
                          className="p-5"
                          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                        >
                          <Col className="justify-content-center align-items-center">
                            주문 금액
                          </Col>
                          <Col className="align-items-center">
                            <span
                              style={{ fontSize: "1.1rem", opacity: "0.6" }}
                            >
                              총 수량
                              <span style={{ margin: "0 5px" }}>
                                {cartItems
                                  .reduce((accumulator, option) => {
                                    return accumulator + option.quantity;
                                  }, 0)
                                  .toLocaleString("ko-KR")}
                              </span>
                              개
                            </span>
                            <span>
                              ₩{" "}
                              {cartItems
                                .reduce((accumulator, option) => {
                                  return (
                                    accumulator + option.quantity * option.price
                                  );
                                }, 0)
                                .toLocaleString("ko-KR")}
                            </span>
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
                                주문하기
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
                                장바구니
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
