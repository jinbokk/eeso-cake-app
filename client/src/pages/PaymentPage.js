import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Container, Row, Col, Table, Form, InputGroup } from "react-bootstrap";
import useWindowDimensions from "../hooks/useWindowDimensions";
import PaymentNav from "../components/PaymentNav";
import Payment from "../components/utils/Payment";
import { RxDragHandleDots2 } from "react-icons/rx";
import format from "date-fns/format";
import { ko } from "date-fns/locale";
import moment from "moment";
// import Postcode from "../components/utils/Postcode";

import dayjs from "dayjs";
import "dayjs/locale/ko";

import "./css/paymentPage.css";

dayjs.locale("ko");

const PaymentPage = () => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  const { state } = useLocation();
  const { authUserData } = useSelector((state) => state.user);
  const authUserDataWithCheckedCart = {
    ...authUserData,
    cart: state.checkedCartItems,
  };

  // useEffect(() => {
  //   if (!state) {
  //     window.alert("잘못된 접근입니다. 홈 화면으로 이동합니다.");
  //     navigate("/", { replace: true });
  //   }
  // }, []);

  // phoneNumber
  const [name, setName] = useState("");
  // phoneNumber
  const [phoneNumber, setPhoneNumber] = useState("");
  // phoneNumber
  const [email, setEmail] = useState("");

  // address
  // const [address, setAddress] = useState("");
  // const [extraAddress, setExtraAddress] = useState("");

  // const extraAddressHandler = (extraAddress) => {
  //   setExtraAddress(extraAddress);
  // };

  //isSame
  const [isSame, setIsSame] = useState(false);

  useEffect(() => {
    if (isSame) {
      setName(authUserData.name);
      setPhoneNumber(authUserData.phoneNumber);
      setEmail(authUserData.email);
    }
  }, [isSame]);

  return (
    state && (
      <>
        <h1 className="cart_title">주문서 작성</h1>

        <Container className="py-5">
          <Row className="mb-4">
            <Col className="order_navigation">
              <PaymentNav status={"payment"} />
            </Col>
          </Row>

          <Row>
            <div className="section_title">
              <RxDragHandleDots2 className="section_title_icon" />
              주문 정보
            </div>
          </Row>

          <Container className="py-4">
            {width < 992 ? (
              <Table bordered responsive>
                <thead className="text-center">
                  <tr className="cart_table">
                    <th>상품정보</th>
                  </tr>
                </thead>

                <tbody className="text-center">
                  {state.checkedCartItems.map((item, index) => (
                    <tr key={index} className="cart_table">
                      <td>
                        <Row className="d-flex justify-content-between align-items-center">
                          <Col lg={5} className="item_thumbnail_container mb-2">
                            <div>
                              <img
                                src={item.image_url}
                                alt=""
                                className="item_thumbnail"
                              />
                            </div>
                          </Col>

                          <Col lg={7} className="text-center mb-2">
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
                              {item.size ? (
                                <div>
                                  케이크 사이즈 : {item.size}{" "}
                                  <span className="disabled_text">
                                    {item.size === "2호"
                                      ? " (+15,000원)"
                                      : null}
                                    {item.size === "3호"
                                      ? " (+30,000원)"
                                      : null}
                                    {item.size === "2단 (1호+3호)"
                                      ? " (+45,000원)"
                                      : null}
                                  </span>
                                </div>
                              ) : null}

                              {item.sheet ? (
                                <div>
                                  케이크 시트 : {item.sheet}{" "}
                                  <span className="disabled_text">
                                    {item.sheet === "초코 시트"
                                      ? " (+3,000원)"
                                      : null}
                                  </span>
                                </div>
                              ) : null}

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

                        <Row>
                          <div className="option_text">
                            <div>주문 수량 : {item.quantity} 개</div>
                            <div>
                              주문 금액 : ₩{" "}
                              {(item.quantity * item.price).toLocaleString(
                                "ko-KR"
                              )}
                            </div>
                          </div>
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
                    <th>상품정보</th>
                    <th>수량</th>
                    <th>주문금액</th>
                  </tr>
                </thead>

                <tbody className="text-center">
                  {state.checkedCartItems.map((item, index) => (
                    <tr key={index} className="cart_table">
                      <td>
                        <Row className="d-flex justify-content-between align-items-center">
                          <Col lg={5} className="item_thumbnail_container">
                            <div>
                              <img
                                src={item.image_url}
                                alt=""
                                className="item_thumbnail"
                              />
                            </div>
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
                              {item.size ? (
                                <div>
                                  케이크 사이즈 : {item.size}{" "}
                                  <span className="disabled_text">
                                    {item.size === "2호"
                                      ? " (+15,000원)"
                                      : null}
                                    {item.size === "3호"
                                      ? " (+30,000원)"
                                      : null}
                                    {item.size === "2단 (1호+3호)"
                                      ? " (+45,000원)"
                                      : null}
                                  </span>
                                </div>
                              ) : null}

                              {item.sheet ? (
                                <div>
                                  케이크 시트 : {item.sheet}{" "}
                                  <span className="disabled_text">
                                    {item.sheet === "초코 시트"
                                      ? " (+3,000원)"
                                      : null}
                                  </span>
                                </div>
                              ) : null}

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
                        <div className="mx-3 text-center user-select-none">
                          {item.quantity} 개
                        </div>
                      </td>

                      <td>
                        <div className="text-center">
                          ₩{" "}
                          {(item.quantity * item.price).toLocaleString("ko-KR")}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Container>

          <Row>
            <div className="section_title">
              <RxDragHandleDots2 className="section_title_icon" />
              고객 정보
            </div>
          </Row>

          <Row className="px-5 py-5">
            <Col lg={6} className="px-5">
              <div style={{ marginBottom: "1rem", fontWeight: "bold" }}>
                주문자 정보
              </div>
              <Form.Group className="mb-2">
                <InputGroup className="d-flex justify-content-start align-items-center">
                  <Row className="w-100 align-items-center flex-fill">
                    <Col lg={"auto"} xs={12}>
                      <div className="payment_input_title">주문자 성함</div>
                    </Col>
                    <Col lg={"auto"} xs={12} className="flex-fill">
                      <Form.Control
                        readOnly
                        disabled
                        type="text"
                        value={authUserData.name}
                        className="payment_input"
                      />
                    </Col>
                  </Row>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-2">
                <InputGroup className="d-flex justify-content-start align-items-center">
                  <Row className="w-100 align-items-center flex-fill">
                    <Col lg={"auto"} xs={12}>
                      <div className="payment_input_title">휴대폰 번호</div>
                    </Col>
                    <Col lg={"auto"} xs={12} className="flex-fill">
                      <Form.Control
                        readOnly
                        disabled
                        type="text"
                        value={authUserData.phoneNumber}
                        className="payment_input"
                      />
                    </Col>
                  </Row>
                </InputGroup>
              </Form.Group>

              {/* <Form.Group className="mb-2">
              <InputGroup className="d-flex justify-content-start align-items-center">
                <Row className="w-100 align-items-center flex-fill">
                  <Col lg={"auto"} xs={12}>
                    <div className="payment_input_title">이메일</div>
                  </Col>
                  <Col lg={"auto"} xs={12} className="flex-fill">
                    <Form.Control
                      readOnly
                      disabled
                      type="email"
                      value={authUserData.email}
                      className="payment_input"
                    />
                  </Col>
                </Row>
              </InputGroup>
            </Form.Group> */}
            </Col>

            <Col lg={6} className="px-5">
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ marginBottom: "1rem" }}
              >
                <div className="fw-bold">수령자 정보</div>
                <Form.Check
                  type={"checkbox"}
                  id={`terms`}
                  label={`주문자 정보와 동일`}
                  defaultChecked={false}
                  onChange={(e) => {
                    setIsSame(e.target.checked);
                    setName("");
                    setPhoneNumber("");
                    setEmail("");
                  }}
                />
              </div>

              <Form.Group className="mb-2">
                <InputGroup className="d-flex justify-content-start align-items-center">
                  <Row className="w-100 align-items-center flex-fill">
                    <Col lg={"auto"} xs={12}>
                      <div className="payment_input_title">수령자 성함</div>
                    </Col>
                    <Col lg={"auto"} xs={12} className="flex-fill">
                      <Form.Control
                        type="text"
                        disabled={isSame ? true : false}
                        value={name}
                        placeholder="성함을 입력해 주세요"
                        className="payment_input"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-2">
                <InputGroup className="d-flex justify-content-start align-items-center">
                  <Row className="w-100 align-items-center flex-fill">
                    <Col lg={"auto"} xs={12}>
                      <div className="payment_input_title">휴대폰 번호</div>
                    </Col>
                    <Col lg={"auto"} xs={12} className="flex-fill">
                      <Form.Control
                        type="text"
                        disabled={isSame ? true : false}
                        value={phoneNumber}
                        maxLength={13}
                        placeholder="'-' 를 제외한 번호만 입력해 주세요"
                        className="payment_input"
                        onChange={(e) => {
                          setPhoneNumber(
                            e.target.value
                              .replace(/[^0-9]/g, "")
                              .replace(
                                /^(\d{0,3})(\d{0,4})(\d{0,4})$/g,
                                "$1-$2-$3"
                              )
                              .replace(/\-{1,2}$/g, "")
                          );
                        }}
                      />
                    </Col>
                  </Row>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row className="align-items-center">
            <div className="section_title">
              <RxDragHandleDots2 className="section_title_icon" />
              주문 결제
            </div>
          </Row>

          <Row className="total_text_container justify-content-center mb-5 py-5">
            <Col lg={3} xs={5} className={width < 992 ? "pb-3" : null}>
              <div className="total_text">
                <div>수령 방법</div>
                <div style={{ fontSize: "1rem" }}>
                  {authUserDataWithCheckedCart.cart.length > 0
                    ? authUserDataWithCheckedCart.cart[0].deliveryType
                    : "-"}
                </div>
              </div>
            </Col>

            <Col lg={3} xs={5} className={width < 992 ? "pb-3" : null}>
              <div className="total_text">
                <div>수령 일시</div>
                <div style={{ fontSize: "1rem" }}>
                  {authUserDataWithCheckedCart.cart.length > 0 ? (
                    <Row className="justify-content-center">
                      <Col
                        lg={"auto"}
                        className={
                          width < 992
                            ? "text-center px-0"
                            : "text-center px-0 me-2"
                        }
                      >
                        {authUserDataWithCheckedCart.cart[0].deliveryDateTime.stringType.split(
                          " "
                        )[0] +
                          " " +
                          authUserDataWithCheckedCart.cart[0].deliveryDateTime.stringType.split(
                            " "
                          )[1]}
                      </Col>
                      <Col
                        lg={"auto"}
                        className={
                          width < 992
                            ? "text-center px-0"
                            : "text-center px-0 me-2"
                        }
                      >
                        {authUserDataWithCheckedCart.cart[0].deliveryDateTime.stringType.split(
                          " "
                        )[2] +
                          " " +
                          authUserDataWithCheckedCart.cart[0].deliveryDateTime.stringType.split(
                            " "
                          )[3]}
                      </Col>
                      {/* <Col
                        lg={"auto"}
                        className={
                          width < 992
                            ? "text-center px-0"
                            : "text-center px-0 me-2"
                        }
                      >
                        {dayjs(
                          authUserDataWithCheckedCart.cart[0].deliveryDateTime
                            .dateType
                        ).format("YYYY-MM-DD (ddd)")}
                      </Col>
                      <Col lg={"auto"} className="text-center px-0">
                        {dayjs(
                          authUserDataWithCheckedCart.cart[0].deliveryDateTime
                            .dateType
                        ).format("a hh:mm")}
                      </Col> */}
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
                  {authUserDataWithCheckedCart.cart
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
                <div>최종 결제 금액</div>
                <div>
                  {authUserDataWithCheckedCart.cart
                    .reduce((accumulator, item) => {
                      return accumulator + item.quantity * item.price;
                    }, 0)
                    .toLocaleString("ko-KR")}{" "}
                  원
                </div>
              </div>
            </Col>
          </Row>

          <Row style={{ maxWidth: "700px", margin: "0 auto" }}>
            <Payment
              pay_method="card"
              authUserDataWithCheckedCart={authUserDataWithCheckedCart}
              pickupInfo={{
                pickup_name: name,
                pickup_phoneNumber: phoneNumber,
              }}
            />
          </Row>
        </Container>
      </>
    )
  );
};

export default PaymentPage;
