import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Table } from "react-bootstrap";
import { userActions } from "../redux/actions/userActions";
import { Button, Checkbox } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import { AiOutlineClose, AiOutlineRight } from "react-icons/ai";
import { BsCheck2Circle, BsCartCheck } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { NavLink } from "react-router-dom";

import Payment from "../components/utils/Payment";
import "./css/cart.css";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Cart = () => {
  const dispatch = useDispatch();
  const { authUserData } = useSelector((state) => state.user);
  const { width } = useWindowDimensions();

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
    width: width < 992 ? "20px" : "30px",
    minWidth: 0,
    height: width < 992 ? "20px" : "30px",
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
    fontFamily: "inherit",

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
    fontFamily: "inherit",

    "&:hover": {
      backgroundColor: pink[400],
      boxShadow: "none",
    },
  }));

  const initialCartIds = authUserData.cart.map((item) => item._id);

  const [checkedCartIds, setCheckedCart] = useState([]);

  useLayoutEffect(() => {
    setCheckedCart(initialCartIds);
  }, [authUserData]);

  const checkHandler = (event) => {
    const { value, checked } = event.target; // value는 개별 cartId

    console.log(value);

    if (value === "checkAll") {
      if (initialCartIds.length === checkedCartIds.length) {
        setCheckedCart([]);
      } else {
        setCheckedCart(initialCartIds);
      }
    } else {
      if (checked) {
        setCheckedCart((prev) => [...prev, value]);
      } else {
        setCheckedCart((prev) => {
          return [...prev.filter((item) => item !== value)];
        });
      }
    }
  };

  const [authUserDataWithCheckedCart, setAuthUserDataWithCheckedCart] =
    useState(authUserData);

  const checkedCartList = authUserData.cart.filter((userCartItem) =>
    checkedCartIds.some((checkedCartId) => userCartItem._id === checkedCartId)
  );

  useEffect(() => {
    // checkedCartIds를 이용하여 authUserData.cart와 대조
    setAuthUserDataWithCheckedCart({ ...authUserData, cart: checkedCartList });
  }, [checkedCartIds]);

  console.log("authUserDataWithCheckedCart", authUserDataWithCheckedCart);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {authUserData && authUserData.isAuth ? (
          <h1 className="py-5 text-center">
            <span style={{ marginRight: "5px" }}>{authUserData.name}</span>
            님의 장바구니
          </h1>
        ) : null}

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
            <Table bordered responsive>
              <thead className="text-center">
                <tr className="cart_table">
                  <th>
                    <Checkbox
                      value={"checkAll"}
                      checked={initialCartIds.length === checkedCartIds.length}
                      onChange={checkHandler}
                    />
                  </th>
                  <th>상품정보</th>
                  <th>수량</th>
                  <th colSpan={2}>주문금액</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {authUserData.cart.map((item, index) => (
                  <tr key={index} className="cart_table">
                    <td>
                      <Checkbox
                        value={item._id}
                        checked={checkedCartIds.includes(item._id)}
                        onChange={checkHandler}
                      />
                    </td>

                    <td>
                      <Row className="d-flex justify-content-between align-items-center">
                        <Col lg={5} className="item_thumbnail_container">
                          <NavLink to={`/order/detail/${item.rootProductId}`}>
                            <div>
                              <img
                                src={item.image_url}
                                alt=""
                                className="item_thumbnail"
                              />
                            </div>
                          </NavLink>
                        </Col>

                        <Col lg={7} className="text-start">
                          <div className="item_title border-bottom">
                            {item.title}
                          </div>

                          <div className="border-bottom">
                            <div className="option_text">
                              {item.deliveryType} / {item.deliveryDate}{" "}
                              {item.deliveryTime}
                            </div>
                          </div>

                          {
                            item.letteringToggle === "추가 하기" ? (
                              <div className="option_text">
                                케이크 판 레터링 / {item.letteringText}
                              </div>
                            ) : null
                            // (
                            //   <div className="disabled_text">
                            //     케이크판 레터링 / 추가하지 않기
                            //   </div>
                            // )
                          }

                          {
                            item.designTopperToggle === "추가 하기" ? (
                              <div className="option_text">
                                디자인 토퍼 문구 (+
                                {item.designTopperText.length <= 10
                                  ? "6,000"
                                  : "9,000"}
                                {/* {item.디자인토퍼_추가금.toLocaleString("ko-KR")} */}
                                원) / {item.designTopperText}
                              </div>
                            ) : null
                            // (
                            //   <div className="disabled_text">
                            //     디자인 토퍼 / 추가하지 않기
                            //   </div>
                            // )
                          }

                          {item.customerRequestText ? (
                            <div className="option_text">
                              요청 사항 / {item.customerRequestText}
                            </div>
                          ) : null}
                        </Col>
                      </Row>
                    </td>

                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        <QuantityButton
                          variant="contained"
                          onClick={() => {
                            if (item.quantity > 1) {
                              dispatch(userActions.decreaseQuantity(item._id));
                            }
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
                            dispatch(userActions.increaseQuantity(item._id));
                          }}
                        >
                          <div style={{ fontSize: "1.5rem" }}>+</div>
                        </QuantityButton>
                      </div>
                    </td>

                    <td>
                      <div>
                        ₩ {(item.quantity * item.price).toLocaleString("ko-KR")}
                      </div>
                    </td>

                    <td>
                      <AiOutlineClose
                        className="delete_button"
                        onClick={() => {
                          if (
                            window.confirm(
                              "해당 상품을 카트에서 제거하시겠습니까?"
                            )
                          ) {
                            removeFromCart(item._id);
                          } else {
                            return;
                          }
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Row>
              <Col className="border-top p-5 justify-content-center align-items-center">
                <div className="total_text">
                  선택 수량 :{" "}
                  {authUserDataWithCheckedCart.cart
                    .reduce((accumulator, item) => {
                      return accumulator + item.quantity;
                    }, 0)
                    .toLocaleString("ko-KR")}
                  개
                </div>
                <div className="total_text">
                  주문 금액 : ₩{" "}
                  {authUserDataWithCheckedCart.cart
                    .reduce((accumulator, item) => {
                      return accumulator + item.quantity * item.price;
                    }, 0)
                    .toLocaleString("ko-KR")}
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
            </Row>

            <Payment authUserDataWithCheckedCart={authUserDataWithCheckedCart} pay_method="card" />
          </>
        ) : (
          <Row className="border-top empty_msg">
            <Col className="justify-content-center align-items-center">
              <div>장바구니가 비어있습니다</div>
            </Col>
          </Row>
        )}
      </Container>
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
