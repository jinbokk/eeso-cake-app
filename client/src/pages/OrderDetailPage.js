import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

import GuideBreadPage from "./GuideBreadPage";
import GuideRicePage from "./GuideRicePage";
import { BsCart4 } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";

import Delivery from "../components/productOrder/Delivery";
import Lettering from "../components/productOrder/Lettering";
import DesignTopper from "../components/productOrder/DesignTopper";
import CustomerRequest from "../components/productOrder/CustomerRequest";

import moment from "moment";
import "moment/locale/ko";

import "./css/orderDetailPage.css";

const OrderDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productId } = useParams();

  const { width } = useWindowDimensions();

  const { loading, productDetail } = useSelector(
    (state) => state.forSaleProduct
  );

  const { authUserData } = useSelector((state) => state.user);

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

  const combineDateWithTime = (date, time) => {
    // return new Date(
    //   date.getFullYear(),
    //   date.getMonth(),
    //   date.getDate(),
    //   time.getHours(),
    //   time.getMinutes(),
    //   time.getSeconds(),
    //   time.getMilliseconds()
    // );

    const dateForm = moment(date).format("YYYY-MM-DD");
    const timeForm = moment(time).format("hh:mm");

    return moment(dateForm + " " + timeForm, "YYYY-MM-DD a hh:mm (ddd)");
  };

  const optionConfirmHandler = () => {
    const deliveryDateTime = combineDateWithTime(
      deliveryDate.dateType,
      deliveryTime.dateType
    );

    let createdCart = {
      rootProductId: productDetail._id,
      title: productDetail.title,
      image_url: productDetail.image_url,
      deliveryType: deliveryType,
      deliveryDateTime: {
        stringType: deliveryDate.stringType + " " + deliveryTime.stringType,
        dateType: moment(deliveryDateTime).format(),
      },
      letteringToggle: letteringToggle,
      letteringText: letteringText !== undefined ? letteringText : null,
      designTopperToggle: designTopperToggle,
      designTopperText:
        designTopperText !== undefined ? designTopperText : null,
      customerRequestText:
        customerRequestText !== undefined ? customerRequestText : null,
      quantity: 1,
      price: parseInt(productDetail.price) + parseInt(designTopperPrice),
    };

    if (
      !createdCart.deliveryType ||
      !createdCart.deliveryDateTime ||
      (createdCart.letteringToggle === "추가 하기" &&
        !createdCart.letteringText) ||
      (createdCart.designTopperToggle === "추가 하기" &&
        !createdCart.designTopperText)
    ) {
      alert("선택하신 옵션을 다시 확인해 주세요");
    } else {
      setCartItems((prev) => [...prev, createdCart]);
      console.log("cartItems::::", cartItems);
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
    if (authUserData && !authUserData.isAuth) {
      const confirm = window.confirm(
        "장바구니에 상품을 담기 위해서는 로그인 해야합니다\n로그인 하시겠습니까?"
      );

      if (confirm) {
        navigate("/login");
      } else {
        return;
      }
    } else {
      dispatch(userActions.addToCart(cartItems));
      alert("장바구니에 상품이 담겼습니다");
      setCartItems([]);
      dispatch({ type: "RESET_FORM" });
      dispatch(userActions.auth());
    }
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
              <Row className="mb-5 mx-auto w-100">
                {width < 992 ? (
                  <div>
                    <h3 className="mb-3 fw-bold">{productDetail.title}</h3>
                    <h5 className="mb-4">{productDetail.description}</h5>
                    <h3 className="mb-4">
                      ₩ {productDetail.price.toLocaleString("ko-KR")}
                    </h3>
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
                </Col>

                <Col lg={5}>
                  {width > 992 ? (
                    <>
                      <h3 className="mb-3 fw-bold">{productDetail.title}</h3>
                      <h5 className="mb-4">{productDetail.description}</h5>
                      <h3 className="mb-4">
                        ₩ {Number(productDetail.price).toLocaleString("ko-KR")}
                      </h3>
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
                      <Container className="preview_container">
                        {cartItems.map((item, index) => {
                          return (
                            <Row
                              key={index}
                              className="order_preview align-items-center m-2 p-3"
                            >
                              <Col
                                lg={12}
                                className="d-flex align-items-center justify-content-between py-2"
                              >
                                <Col lg={"auto"} className="fw-bold">
                                  {productDetail.title}
                                </Col>

                                <Col
                                  lg={"auto"}
                                  className="remove_button"
                                  onClick={() => optionRemoveHandler(index)}
                                >
                                  X
                                </Col>
                              </Col>

                              <Col lg={12}>
                                <Row className="py-2 pb-3">
                                  <Col
                                    lg={"auto"}
                                    className="d-flex flex-row justify-content-between align-items-center"
                                  >
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
                                        <div style={{ fontSize: "1.5rem" }}>
                                          -
                                        </div>
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
                                        <div style={{ fontSize: "1.5rem" }}>
                                          +
                                        </div>
                                      </QuantityButton>
                                    </div>
                                  </Col>

                                  <Col style={{ textAlign: "end" }}>
                                    ₩{" "}
                                    {(
                                      item.quantity * item.price
                                    ).toLocaleString("ko-KR")}
                                  </Col>
                                </Row>
                              </Col>

                              <Col lg={12}>
                                <div className="preview_text fw-bold">
                                  {item.deliveryType} /{" "}
                                  {item.deliveryDateTime.stringType}
                                </div>
                              </Col>

                              <Col>
                                {item.letteringToggle === "추가 하기" ? (
                                  <div className="preview_text">
                                    케이크 판 레터링 / {item.letteringText}
                                  </div>
                                ) : null}

                                {item.designTopperToggle === "추가 하기" ? (
                                  <div className="preview_text">
                                    디자인 토퍼 문구 (+
                                    {designTopperPrice.toLocaleString("ko-KR")}
                                    원) / {item.designTopperText}
                                  </div>
                                ) : null}

                                {item.customerRequestText ? (
                                  <div className="preview_text">
                                    요청 사항 / {item.customerRequestText}
                                  </div>
                                ) : null}
                              </Col>
                            </Row>
                          );
                        })}

                        <Row
                          className="py-4"
                          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                        >
                          <Col lg={6} xs={6}>
                            <div className="total_text">
                              <div>주문 수량</div>
                              <div>
                                {cartItems
                                  .reduce((accumulator, item) => {
                                    return accumulator + item.quantity;
                                  }, 0)
                                  .toLocaleString("ko-KR")}
                                개
                              </div>
                            </div>
                          </Col>

                          <Col lg={6} xs={6}>
                            <div className="total_text">
                              <div>주문 금액</div>
                              <div>
                                {cartItems
                                  .reduce((accumulator, item) => {
                                    return (
                                      accumulator + item.quantity * item.price
                                    );
                                  }, 0)
                                  .toLocaleString("ko-KR")}{" "}
                                원
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <Row className="m-2">
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
                      </Container>
                    ) : null}
                  </ThemeProvider>
                </Col>
              </Row>
            </form>
          </Container>

          <Container>
            {productDetail.ingredient === "rice" ? <GuideRicePage /> : null}
            {productDetail.ingredient === "bread" || "event" ? (
              <GuideBreadPage />
            ) : null}
          </Container>
        </>
      )}
    </motion.div>
  );
};

export default OrderDetailPage;
