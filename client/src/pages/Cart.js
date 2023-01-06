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
            님의 장바구니
          </h1>
        ) : null}
      </Container>
      {/* {!cartDetail ? (
        <Loading text={"장바구니 가져오는 중..."} />
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
                        {item.option.수령_방법}
                      </div>
                      <div className="disabled_text">
                        {item.option.수령_날짜} {item.option.수령_시간}
                      </div>
                    </div>

                    {item.option.레터링_추가 === "Y" ? (
                      <div>
                        <span className="disabled_text">
                          케이크 판 레터링 / {item.option.레터링_문구}
                        </span>
                      </div>
                    ) : (
                      <div className="disabled_text">
                        케이크판 레터링 / 추가하지 않기
                      </div>
                    )}

                    {item.option.토퍼_추가 === "Y" ? (
                      <div>
                        <span className="disabled_text">
                          디자인 토퍼 문구 / {item.option.토퍼_문구}
                        </span>
                      </div>
                    ) : (
                      <div className="disabled_text">
                        디자인 토퍼 / 추가하지 않기
                      </div>
                    )}

                    {item.option.요청_사항 ? (
                      <div>
                        <span className="disabled_text">
                          요청 사항 / {item.option.요청_사항}
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
                  ₩{" "}
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
                <div className="total_text">총 수량 : test 개</div>
                {/* <div className="total_text">총 수량 : {totalQuantity} 개</div> */}
                <div className="total_text">
                  주문 금액 : ₩ test
                  {/* 주문 금액 : ₩ {totalPrice.toLocaleString("ko-KR")} */}
                </div>
              </Col>
            </Row>

            <Row className="py-5 border-top w-auto justify-content-center">
              <Col className="align-items-center">
                <ShoppingButton variant="outlined">
                  쇼핑하러 가기
                </ShoppingButton>
              </Col>
              <Col className="align-items-center">
                <OrderButton variant="contained">선택상품 주문</OrderButton>
              </Col>
              <Col className="align-items-center">
                <NavLink to="/user/payment">
                  <OrderButton variant="contained">전체 주문</OrderButton>
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
              <div>장바구니가 비어있습니다</div>
              {/* <NavLink to="/">
                    <div>이소케이크 둘러보기</div>
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

// 저희가 Cors이슈를 쉽게 해결하려고 이 부분을 이용한건데

// 개인적인 생각으로는 이부분에서 Proxy를 이용하는게 속도를 느리게 만드는 것 같습니다.

// 근데 이부분은 개발할때 development 모드에서만 사용을 하고

// production 모드에서는 (배포 이후에는) 이 createProxyMiddleware를 쓰지 못하거든요..

// 그래서 백서버와 통신을 할때 직접 request를 보내게 됩니다.

// 그래서 이부분을 사용하지 않으면 속도가 훨씬 빨라지게 됩니다.

// 저도 이 강의에서만 이 createProxyMiddleware만 쓰다보니  이게 속도를 많이 저하시키는지 몰랐네요...

// 이부분 때문에  Boilerplate도 개선을 하려고 생각하고 있습니다.

// 그리고 SSR 서버사이드렌더링 같은경우는 아무래도  운영하는 사이트가 검색이 정말 잘되야 한다면

// 서버사이드 렌더링을 이용하는게 맞습니다

// 하지만 실제 운영에서 클라이언트 렌더링을 사용하는 사이트도 많습니다 ^^
