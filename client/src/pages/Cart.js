import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { userActions } from "../redux/actions/userActions";
import { Button } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import { AiOutlineClose, AiOutlineRight } from "react-icons/ai";
import { BsCheck2Circle, BsCartCheck } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Loading from "../components/Loading";

import "./css/cart.css";
import Paypal from "../components/utils/Paypal";
import CartTable from "./CartTable";

const Cart = () => {
  const dispatch = useDispatch();
  const { authUserData } = useSelector((state) => state.user);
  // const { authUserData, cartDetail } = useSelector((state) => state.user);

  // useEffect(() => {
  //   let cartItems = [];

  //   if (authUserData && authUserData.cart) {
  //     if (authUserData.cart.length > 0) {
  //       authUserData.cart.forEach((item) => {
  //         cartItems.push(item.id);
  //       });
  //       dispatch(userActions.getCartItems(cartItems, authUserData.cart));
  //     }
  //   }
  // }, []);

  // const [totalPrice, setTotalPrice] = useState(0);
  // const [totalQuantity, setTotalQuantity] = useState(0);

  // const calculateTotal = (cartDetail) => {
  //   if (cartDetail && cartDetail.length > 0) {
  //     let totalPrice = 0;
  //     let totalQuantity = 0;

  //     cartDetail.forEach((item) => {
  //       totalPrice += parseInt(item.price) * item.quantity;
  //       totalQuantity += item.quantity;
  //     });

  //     setTotalPrice(totalPrice);
  //     setTotalQuantity(totalQuantity);
  //   } else {
  //     return;
  //   }
  // };

  // useEffect(() => {
  //   calculateTotal(cartDetail);
  // }, [cartDetail]);

  const removeFromCart = (productId) => {
    dispatch(userActions.removeFromCart(productId));
  };

  // theme
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

  const QuantityButton = styled(Button)(() => ({
    width: "30px",
    minWidth: 0,
    height: "30px",
    padding: "10px",
    boxShadow: "none",

    "&:hover": {
      backgroundColor: pink[400],
      boxShadow: "none",
    },
  }));

  const ShoppingButton = styled(Button)(() => ({
    padding: "10px",
    width: "200px",
    fontSize: "1.2rem",
    boxShadow: "none",

    "&:hover": {
      backgroundColor: pink[300],
      color: "white",
      boxShadow: "none",
    },
  }));

  const OrderButton = styled(Button)(() => ({
    padding: "10px",
    width: "200px",
    fontSize: "1.2rem",
    boxShadow: "none",

    "&:hover": {
      backgroundColor: pink[400],
      boxShadow: "none",
    },
  }));

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {authUserData && authUserData.isAuth ? (
          <h1 className="my-5 text-center">
            <span style={{ marginRight: "5px" }}>{authUserData.name}</span>
            ?????? ????????????
          </h1>
        ) : null}
      </Container>
      {/* {!cartDetail ? (
        <Loading text={"???????????? ???????????? ???..."} />
      ) : ( */}
      <Container>
        <Row className="my-4">
          <Col className="flex-row justify-content-end align-items-center">
            <BsCartCheck className="m-2 text-danger" />
            <span className="fw-bold text-danger">Cart</span>
            <AiOutlineRight className="m-2 text-danger" />
            <MdPayment className="m-2" /> <span>Payment</span>
            <AiOutlineRight className="m-2" />
            <BsCheck2Circle className="m-2" /> <span>Order Complete</span>
          </Col>
        </Row>
        {authUserData && authUserData.isAuth && authUserData.cart.length > 0 ? (
          <>
            {authUserData.cart.map((item, index) => (
              <Row key={index} className="border-top py-4">
                <Col className="flex-row justify-content-center align-items-center item_thumbnail_container">
                  <NavLink to={`/order/list/detail/${item.rootProductDoc._id}`}>
                    <div>
                      <img
                        src={item.rootProductDoc.image_url}
                        alt=""
                        className="item_thumbnail"
                      />
                    </div>
                  </NavLink>
                </Col>

                <Col className="justify-content-center align-items-center">
                  <div className="w-100">
                    <div className="item_title">
                      {item.rootProductDoc.title}
                    </div>

                    <div>
                      <div className="disabled_text">
                        {item.option.??????_??????}
                      </div>
                      <div className="disabled_text">
                        {item.option.??????_??????} {item.option.??????_??????}
                      </div>
                    </div>

                    {item.option.?????????_?????? === "?????? ??????" ? (
                      <div>
                        <span className="disabled_text">
                          ????????? ??? ????????? / {item.option.?????????_??????}
                        </span>
                      </div>
                    ) : (
                      <div className="disabled_text">
                        ???????????? ????????? / ???????????? ??????
                      </div>
                    )}

                    {item.option.??????_?????? === "?????? ??????" ? (
                      <div>
                        <span className="disabled_text">
                          ????????? ?????? ?????? / {item.option.??????_??????}
                        </span>
                      </div>
                    ) : (
                      <div className="disabled_text">
                        ????????? ?????? / ???????????? ??????
                      </div>
                    )}

                    {item.option.??????_?????? ? (
                      <div>
                        <span className="disabled_text">
                          ?????? ?????? / {item.option.??????_??????}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </Col>
                <Col className="flex-row justify-content-center align-items-center">
                  <QuantityButton variant="contained">
                    <div style={{ fontSize: "1.5rem" }}>-</div>
                  </QuantityButton>
                  <div className="mx-3 user-select-none">{item.quantity}</div>
                  <QuantityButton variant="contained">
                    <div style={{ fontSize: "1.5rem" }}>+</div>
                  </QuantityButton>
                </Col>
                <Col className="flex-row justify-content-center align-items-center user-select-none">
                  ???{" "}
                  {(item.rootProductDoc.price * item.quantity).toLocaleString(
                    "ko-KR"
                  )}
                </Col>
                <Col
                  className="flex-row justify-content-center align-items-center"
                  onClick={() => removeFromCart(item.id)}
                >
                  <AiOutlineClose className="delete_button" />
                </Col>
              </Row>
            ))}
            <Row>
              <Col className="border-top p-5 justify-content-center align-items-center">
                <div className="total_text">??? ?????? : test ???</div>
                {/* <div className="total_text">??? ?????? : {totalQuantity} ???</div> */}
                <div className="total_text">
                  ?????? ?????? : ??? test
                  {/* ?????? ?????? : ??? {totalPrice.toLocaleString("ko-KR")} */}
                </div>
              </Col>
            </Row>

            <Row className="py-5 border-top w-auto justify-content-center">
              <Col className="align-items-center">
                <ShoppingButton variant="outlined">
                  ???????????? ??????
                </ShoppingButton>
              </Col>
              <Col className="align-items-center">
                <OrderButton variant="contained">???????????? ??????</OrderButton>
              </Col>
              <Col className="align-items-center">
                <NavLink to="/user/payment">
                  <OrderButton variant="contained">?????? ??????</OrderButton>
                </NavLink>
              </Col>
              {/* <Col className="align-items-center">
                <Paypal />
              </Col> */}
            </Row>
          </>
        ) : (
          <Row className="border-top empty_msg">
            <Col className="justify-content-center align-items-center">
              <div>??????????????? ??????????????????</div>
              {/* <NavLink to="/">
                    <div>??????????????? ????????????</div>
                    </NavLink> */}
            </Col>
          </Row>
        )}
        {/* <CartTable /> */}
      </Container>
      {/* )} */}
    </ThemeProvider>
  );
};

export default Cart;

// ????????? Cors????????? ?????? ??????????????? ??? ????????? ???????????????

// ???????????? ??????????????? ??????????????? Proxy??? ??????????????? ????????? ????????? ????????? ??? ????????????.

// ?????? ???????????? ???????????? development ??????????????? ????????? ??????

// production ??????????????? (?????? ????????????) ??? createProxyMiddleware??? ?????? ???????????????..

// ????????? ???????????? ????????? ?????? ?????? request??? ????????? ?????????.

// ????????? ???????????? ???????????? ????????? ????????? ?????? ???????????? ?????????.

// ?????? ??? ??????????????? ??? createProxyMiddleware??? ????????????  ?????? ????????? ?????? ?????????????????? ????????????...

// ????????? ?????????  Boilerplate??? ????????? ????????? ???????????? ????????????.

// ????????? SSR ???????????????????????? ??????????????? ????????????  ???????????? ???????????? ????????? ?????? ????????? ?????????

// ??????????????? ???????????? ??????????????? ????????????

// ????????? ?????? ???????????? ??????????????? ???????????? ???????????? ???????????? ???????????? ^^
