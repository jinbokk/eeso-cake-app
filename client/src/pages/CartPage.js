import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Table } from "react-bootstrap";
import { userActions } from "../redux/actions/userActions";
import { Button, Checkbox } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { NavLink, useNavigate } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";
import PaymentNav from "../components/PaymentNav";
import format from "date-fns/format";
import { ko } from "date-fns/locale";

import "./css/cartPage.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUserData } = useSelector((state) => state.user);
  const { width } = useWindowDimensions();

  const removeFromCart = (checkedCartIds) => {
    dispatch(userActions.removeFromCart(checkedCartIds));
    alert("선택하신 상품이 장바구니에서 제거되었습니다");
    dispatch(userActions.auth());
  };

  // theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#de6061",
      },
    },
  });

  const QuantityButton = styled(Button)(() => ({
    width: width < 992 ? "15px" : "30px",
    minWidth: 0,
    height: width < 992 ? "15px" : "30px",
    fontSize: width < 992 ? "1rem" : "1.3rem",
    padding: "10px",
    boxShadow: "none",

    "&:hover": {
      backgroundColor: red[400],
      boxShadow: "none",
    },
  }));

  const ShoppingButton = styled(Button)(() => ({
    padding: "15px 20px",
    width: "100%",
    fontSize: width < 992 ? "1rem" : "1.2rem",
    boxShadow: "none",
    fontFamily: "inherit",

    "&:hover": {
      backgroundColor: "#de6061",
      color: "white",
      boxShadow: "none",
    },
  }));

  const OrderButton = styled(Button)(() => ({
    padding: "15px 20px",
    width: "100%",
    fontSize: width < 992 ? "1rem" : "1.2rem",
    boxShadow: "none",
    fontFamily: "inherit",

    "&:hover": {
      backgroundColor: red[400],
      boxShadow: "none",
    },
  }));

  const initialCartIds = authUserData.cart.map((item) => item._id);

  const [checkedCartIds, setCheckedCartIds] = useState([]);

  useLayoutEffect(() => {
    setCheckedCartIds(initialCartIds);
  }, []);

  const checkHandler = (event) => {
    const { value, checked } = event.target; // value는 개별 cartId

    if (value === "checkAll") {
      if (initialCartIds.length === checkedCartIds.length) {
        setCheckedCartIds([]);
      } else {
        setCheckedCartIds(initialCartIds);
      }
    } else {
      if (checked) {
        setCheckedCartIds((prev) => [...prev, value]);
      } else {
        setCheckedCartIds((prev) => {
          return [...prev.filter((item) => item !== value)];
        });
      }
    }
  };

  const checkedCartItems = authUserData.cart.filter((userCartItem) =>
    checkedCartIds.some((checkedCartId) => userCartItem._id === checkedCartId)
  );

  const [isOrderble, setIsOrderble] = useState(undefined);

  const orderVerification = () => {
    if (checkedCartItems.length === 0) {
      setIsOrderble(false);
      return false;
    } else {
      const isOrderbleCheck = checkedCartItems.every((compareItems) => {
        return (
          checkedCartItems[0].deliveryType === compareItems.deliveryType &&
          checkedCartItems[0].deliveryDateTime.stringType ===
            compareItems.deliveryDateTime.stringType
        );
      });

      if (isOrderbleCheck) {
        setIsOrderble(true);
      } else {
        setIsOrderble(false);
      }
    }
  };

  useEffect(() => {
    orderVerification();
  }, [checkedCartItems]);

  const handleOrderNavigate = useCallback(() => {
    if (!isOrderble) {
      window.alert(
        "상품의 수령방법 및 수령일시가\n동일한 제품에 한하여 일괄 주문이 가능합니다.\n\n상품을 재선택하여 주문 부탁드립니다 :-)"
      );
    } else {
      navigate("/payment", {
        state: {
          checkedCartItems: checkedCartItems,
        },
      });
    }
  }, [checkedCartItems]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {authUserData && authUserData.isAuth ? (
          <h1 className="cart_title">
            <span style={{ marginRight: "5px", color: "black" }}>
              {authUserData.name}
            </span>
            님의 장바구니
          </h1>
        ) : null}

        <Row className="mb-4">
          <Col className="order_navigation">
            <PaymentNav status="cart" />
          </Col>
        </Row>

        {authUserData && authUserData.isAuth && authUserData.cart.length > 0 ? (
          <>
            {width < 992 ? (
              <Table bordered responsive>
                <thead className="text-center">
                  <tr className="cart_table">
                    <th>
                      <Checkbox
                        value={"checkAll"}
                        checked={
                          initialCartIds.length === checkedCartIds.length
                        }
                        onChange={(event) => {
                          checkHandler(event);
                          orderVerification();
                        }}
                      />
                    </th>
                    <th>상품 정보</th>
                  </tr>
                </thead>

                <tbody className="text-center">
                  {authUserData.cart.map((item, index) => (
                    <tr key={index} className="cart_table">
                      <td>
                        <Checkbox
                          value={item._id}
                          checked={checkedCartIds.includes(item._id)}
                          onChange={(event) => {
                            checkHandler(event);
                            orderVerification();
                          }}
                        />
                      </td>

                      <td>
                        <Row className="d-flex justify-content-between align-items-center">
                          <Col lg={5} className="item_thumbnail_container mb-3">
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

                          <Col lg={7} className="text-center mb-3">
                            <div className="item_title border_bottom fw-bold text-center">
                              {item.title}
                            </div>

                            <div className="border_bottom">
                              <div className="option_text">
                                {item.deliveryType} /{" "}
                                {item.deliveryDateTime.stringType}
                              </div>
                            </div>

                            <div className="option_text border_bottom">
                              {item.letteringToggle === "추가 하기" ? (
                                <div>레터링 문구 : {item.letteringText}</div>
                              ) : null}

                              {item.designTopperToggle === "추가 하기" ? (
                                <div>
                                  디자인 토퍼 문구 : {item.designTopperText}{" "}
                                  <span className="disabled_text">
                                    (+
                                    {item.designTopperText.length <= 10
                                      ? "6,000"
                                      : "9,000"}
                                    원)
                                  </span>
                                </div>
                              ) : null}

                              {item.customerRequestText ? (
                                <div>
                                  요청 사항 : {item.customerRequestText}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                        </Row>

                        <Row className="justify-content-between">
                          <Col
                            xs={"auto"}
                            className="text-center d-flex justify-content-between align-items-center"
                          >
                            <div className="d-flex align-items-center mb-3">
                              <div>수량 :</div>
                              <div className="d-flex justify-content-center align-items-center ms-3">
                                <QuantityButton
                                  variant="contained"
                                  onClick={() => {
                                    if (item.quantity > 1) {
                                      dispatch(
                                        userActions.decreaseQuantity(item._id)
                                      );
                                    }
                                  }}
                                >
                                  <div>-</div>
                                </QuantityButton>
                                <div className="mx-2 user-select-none">
                                  {item.quantity}
                                </div>
                                <QuantityButton
                                  variant="contained"
                                  onClick={() => {
                                    dispatch(
                                      userActions.increaseQuantity(item._id)
                                    );
                                  }}
                                >
                                  <div>+</div>
                                </QuantityButton>
                              </div>
                            </div>
                          </Col>

                          <Col xs={"auto"} className="text-end">
                            금액 : ₩{" "}
                            {(item.quantity * item.price).toLocaleString(
                              "ko-KR"
                            )}
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Table bordered responsive>
                <thead className="text-center">
                  <tr className="cart_table">
                    <th>
                      <Checkbox
                        value={"checkAll"}
                        checked={
                          initialCartIds.length === checkedCartIds.length
                        }
                        onChange={(event) => {
                          checkHandler(event);
                          orderVerification();
                        }}
                      />
                    </th>
                    <th>상품 정보</th>
                    <th>수량</th>
                    <th colSpan={2}>주문 금액</th>
                  </tr>
                </thead>

                <tbody className="text-center">
                  {authUserData.cart.map((item, index) => (
                    <tr key={index} className="cart_table">
                      <td>
                        <Checkbox
                          value={item._id}
                          checked={checkedCartIds.includes(item._id)}
                          onChange={(event) => {
                            checkHandler(event);
                            orderVerification();
                          }}
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
                            <div className="item_title border_bottom fw-bold">
                              {item.title}
                            </div>

                            <div className="border_bottom">
                              <div className="option_text">
                                {item.deliveryType} /{" "}
                                {item.deliveryDateTime.stringType}
                              </div>
                            </div>

                            <div className="option_text">
                              {item.letteringToggle === "추가 하기" ? (
                                <div>
                                  케이크 판 레터링 : {item.letteringText}
                                </div>
                              ) : null}

                              {item.designTopperToggle === "추가 하기" ? (
                                <div>
                                  디자인 토퍼 문구 : {item.designTopperText}{" "}
                                  <span className="disabled_text">
                                    (+
                                    {item.designTopperText.length <= 10
                                      ? "6,000"
                                      : "9,000"}
                                    원)
                                  </span>
                                </div>
                              ) : null}

                              {item.customerRequestText ? (
                                <div>
                                  요청 사항 : {item.customerRequestText}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                      </td>

                      <td>
                        <div className="d-flex justify-content-center align-items-center">
                          <QuantityButton
                            variant="contained"
                            onClick={() => {
                              if (item.quantity > 1) {
                                dispatch(
                                  userActions.decreaseQuantity(item._id)
                                );
                              }
                            }}
                          >
                            <div>-</div>
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
                            <div>+</div>
                          </QuantityButton>
                        </div>
                      </td>

                      <td>
                        <div>
                          ₩{" "}
                          {(item.quantity * item.price).toLocaleString("ko-KR")}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <Row className="total_text_container justify-content-center mb-5">
              <Col lg={3} xs={5} className={width < 992 ? "pb-3" : null}>
                <div className="total_text">
                  <div>수령 방법</div>
                  <div style={{ fontSize: "1rem" }}>
                    {isOrderble && checkedCartItems.length > 0
                      ? checkedCartItems[0].deliveryType
                      : "-"}
                  </div>
                </div>
              </Col>

              <Col lg={3} xs={5} className={width < 992 ? "pb-3" : null}>
                <div className="total_text">
                  <div>수령 일시</div>
                  <div style={{ fontSize: "1rem" }}>
                    {isOrderble && checkedCartItems.length > 0 ? (
                      <Row className="justify-content-center">
                        <Col
                          lg={"auto"}
                          className={
                            width < 992
                              ? "text-center px-0"
                              : "text-center px-0 me-2"
                          }
                        >
                          {format(
                            new Date(
                              checkedCartItems[0].deliveryDateTime.dateType
                            ),
                            "yyyy-MM-dd (eee)",
                            { locale: ko }
                          )}
                        </Col>
                        <Col lg={"auto"} className="text-center px-0">
                          {format(
                            new Date(
                              checkedCartItems[0].deliveryDateTime.dateType
                            ),
                            "a hh:mm",
                            { locale: ko }
                          )}
                        </Col>
                      </Row>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
              </Col>

              <Col lg={3} xs={5}>
                <div className="total_text">
                  <div>주문 수량</div>
                  <div>
                    {checkedCartItems
                      .reduce((accumulator, item) => {
                        return accumulator + item.quantity;
                      }, 0)
                      .toLocaleString("ko-KR")}
                    개
                  </div>
                </div>
              </Col>

              <Col lg={3} xs={5}>
                <div className="total_text">
                  <div>주문 금액</div>
                  <div>
                    {checkedCartItems
                      .reduce((accumulator, item) => {
                        return accumulator + item.quantity * item.price;
                      }, 0)
                      .toLocaleString("ko-KR")}{" "}
                    원
                  </div>
                </div>
              </Col>
            </Row>

            <Container>
              <Row className="py-5 w-auto justify-content-center">
                <Col xs={3} className="text-center align-items-center">
                  <NavLink to="/order" style={{ width: "100%" }}>
                    <ShoppingButton variant="outlined">
                      쇼핑하러 가기
                    </ShoppingButton>
                  </NavLink>
                </Col>
                <Col xs={3} className="text-center align-items-center">
                  {checkedCartItems.length > 0 ? (
                    <ShoppingButton
                      variant="outlined"
                      onClick={() => {
                        if (
                          window.confirm(
                            "선택하신 상품을 장바구니에서 제거하시겠습니까?"
                          )
                        ) {
                          removeFromCart(checkedCartIds);
                        } else {
                          return;
                        }
                      }}
                    >
                      선택상품 제거
                    </ShoppingButton>
                  ) : (
                    <ShoppingButton disabled variant="outlined">
                      선택상품 제거
                    </ShoppingButton>
                  )}
                </Col>

                <Col xs={3} className="text-center align-items-center">
                  {checkedCartItems.length > 0 ? (
                    <OrderButton
                      variant="contained"
                      onClick={handleOrderNavigate}
                    >
                      선택상품 주문
                    </OrderButton>
                  ) : (
                    <OrderButton disabled variant="contained">
                      선택상품 주문
                    </OrderButton>
                  )}
                </Col>

                {/* <Col xs={3} className="text-center align-items-center">
                  {checkedCartItems.length > 0 ? (
                    <OrderButton
                      variant="contained"
                      onClick={handleOrderNavigate}
                    >
                      전체 주문
                    </OrderButton>
                  ) : (
                    <OrderButton disabled variant="contained">
                      전체 주문
                    </OrderButton>
                  )}
                </Col> */}
              </Row>
            </Container>
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

export default CartPage;

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
