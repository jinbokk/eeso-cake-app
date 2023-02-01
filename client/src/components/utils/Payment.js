import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/userActions";

const Payment = ({ authUserDataWithCheckedCart, pay_method }) => {
  const dispatch = useDispatch();
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
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
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
            orderUid: res.imp_uid,
            // orderProducts : authUserData.cart
            // 특정 상품 구매시, 해당 상품만 보내도록 할 수 있어야 한다.
          };

          dispatch(userActions.orderComplete(body));
        } else {
          alert(`결제에 실패하였습니다\n${error_msg}`);
        }
      }
    );
  };

  return (
    <>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  );
};

export default Payment;
