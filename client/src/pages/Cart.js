import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { userActions } from "../redux/actions/userActions";
import { Button } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Loading from "../components/Loading";

import "./css/cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { loading, authUserData, cartDetail } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    let cartItems = [];

    if (authUserData && authUserData.cart) {
      if (authUserData.cart.length > 0) {
        authUserData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(userActions.getCartItems(cartItems, authUserData.cart));
      }
    }
  }, []);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  let calculateTotal = (cartDetail) => {
    if (cartDetail.length > 0) {
      let totalPrice = 0;
      let totalQuantity = 0;

      cartDetail.map((item) => {
        totalPrice += parseInt(item.price) * item.quantity;
        totalQuantity += item.quantity;
      });

      setTotalPrice(totalPrice);
      setTotalQuantity(totalQuantity);
    }
  };

  useEffect(() => {
    calculateTotal(cartDetail);
  }, [cartDetail]);

  let removeFromCart = (productId) => {
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

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <h1 className="my-4 mx-5">
          <span style={{ marginRight: "5px" }}>{authUserData.name}</span>
          님의 장바구니
        </h1>
      </Container>
      {loading ? (
        <Loading text={"장바구니 가져오는 중..."} />
      ) : (
        <>
          <Container>
            {cartDetail.length > 0 ? (
              <>
                {cartDetail.map((item, index) => (
                  <Row key={index} className="border-top py-4">
                    <Col className="flex-row justify-content-center align-items-center">
                      <NavLink to={`/order/list/detail/${item._id}`}>
                        <img
                          src={item.image_url}
                          alt=""
                          className="item_thumbnail"
                        />
                      </NavLink>
                    </Col>
                    <Col className="flex-row justify-content-center align-items-center">
                      <NavLink
                        to={`/order/list/detail/${item._id}`}
                        className="item_title"
                      >
                        {item.title}
                      </NavLink>
                    </Col>
                    <Col className="flex-row justify-content-center align-items-center">
                      <QuantityButton variant="contained">
                        <div style={{ fontSize: "1.5rem" }}>-</div>
                      </QuantityButton>
                      <div className="mx-3 user-select-none">
                        {item.quantity}
                      </div>
                      <QuantityButton variant="contained">
                        <div style={{ fontSize: "1.5rem" }}>+</div>
                      </QuantityButton>
                    </Col>
                    <Col className="flex-row justify-content-center align-items-center user-select-none">
                      ₩ {(item.price * item.quantity).toLocaleString("ko-KR")}
                    </Col>
                    <Col
                      className="flex-row justify-content-center align-items-center"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <AiOutlineClose className="delete_button" />
                    </Col>
                  </Row>
                ))}
                <Row>
                  <Col className="border-top p-5 justify-content-center align-items-end">
                    <div className="total_text">
                      총 수량 : {totalQuantity} 개
                    </div>
                    <div className="total_text">
                      결제 금액 : ₩ {totalPrice.toLocaleString("ko-KR")}
                    </div>
                  </Col>
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
          </Container>
        </>
      )}
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
