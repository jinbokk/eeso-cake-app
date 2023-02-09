import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/userActions";
import { Button } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Col, Row } from "react-bootstrap";

const Payment = ({ pay_method, authUserDataWithCheckedCart, pickupInfo }) => {
  const dispatch = useDispatch();

  console.log("pickupInfo", pickupInfo);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#de6061",
      },
    },
  });

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

  const { width } = useWindowDimensions();

  let name =
    authUserDataWithCheckedCart.cart.length > 1
      ? `${authUserDataWithCheckedCart.cart[0].title} 외 ${
          authUserDataWithCheckedCart.cart.length - 1
        }건`
      : `${authUserDataWithCheckedCart.cart[0].title}`;

  let buyer_name = authUserDataWithCheckedCart.name;
  let amount = authUserDataWithCheckedCart.cart.reduce((accumulator, item) => {
    return accumulator + item.quantity * item.price;
  }, 0);
  let buyer_tel = authUserDataWithCheckedCart.phoneNumber;
  let buyer_email = authUserDataWithCheckedCart.email;
  let buyer_addr = authUserDataWithCheckedCart.address.address;
  let buyer_postcode = authUserDataWithCheckedCart.address.postcode;

  const onClickPayment = () => {
    const confirm = window.confirm(
      "결제 진행 전, 주문 정보를 다시 한번 확인 해 주세요!\n* 주문 실수로 인한 교환 및 환불은 불가합니다\n\n결제를 진행 하시려면 확인을 눌러주세요"
    );

    if (!confirm) {
      return;
    } else {
      /* 1. 가맹점 식별하기 */
      const IMP = window.IMP;
      const store_id = process.env.REACT_APP_IAMPORT_STORE_ID;
      IMP.init(store_id);

      /* 4. 결제 창 호출하기 */
      IMP.request_pay(
        /* 2. 결제 데이터 정의하기 */
        {
          pg: "nice", // PG사
          pay_method: pay_method, // 결제수단
          merchant_uid: `${new Date().getTime()}`, // 주문번호
          name: name, // 주문명
          amount: amount, // 결제금액
          buyer_name: buyer_name, // 구매자 이름
          buyer_tel: buyer_tel, // 구매자 전화번호
          buyer_email: buyer_email, // 구매자 이메일
          buyer_addr: buyer_addr, // 구매자 주소
          buyer_postcode: buyer_postcode, // 구매자 우편번호
        },
        (res) => {
          /* 3. 콜백 함수 정의하기 */
          const { success, error_msg } = res;
          if (success) {
            alert("결제가 완료 되었습니다");
            console.log(res);

            let body = {
              imp_uid: res.imp_uid, // 아임포트 `unique key`(환불 요청시 `unique key`로 사용)
              merchant_uid: res.merchant_uid, // 주문번호 (결제정보 조회시 사용)
              name: name, // 주문명
              amount: amount, // 결제금액
              products: authUserDataWithCheckedCart.cart, // array type
              // orderProducts : authUserData.cart
              // 특정 상품 구매시, 해당 상품만 보내도록 할 수 있어야 한다.
            };

            dispatch(userActions.orderComplete(body));
          } else {
            alert(`결제에 실패하였습니다\n${error_msg}`);
          }
        }
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Row className="p-0 mx-auto">
        <Col>
          <NavLink to="/user/cart">
            <ShoppingButton variant="outlined">장바구니 가기</ShoppingButton>
          </NavLink>
        </Col>

        <Col>
          <OrderButton variant="contained" onClick={onClickPayment}>
            결제하기
          </OrderButton>
        </Col>
      </Row>
    </ThemeProvider>
  );
};

export default Payment;
