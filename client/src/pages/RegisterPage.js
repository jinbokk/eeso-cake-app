import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Form,
  InputGroup,
  ButtonGroup,
  ToggleButton,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../redux/actions/userActions";
import { motion } from "framer-motion";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import Postcode from "../components/utils/Postcode";

import Terms from "../components/Terms";
import PrivacyPolicy from "../components/PrivacyPolicy";
import "./css/registerPage.css";

function RegisterPage() {
  //name
  const [name, setName] = useState("");

  const nameRegex = /^[가-힣]{2,5}$/; //공백은 히+ㅎ 이다. 폰트 깨짐.
  const nameVerifyCheck = nameRegex.test(name);

  const [isNameWrong, setIsNameWrong] = useState({
    error: false,
    checkMark: false,
  });

  const nameCheckHandler = (name) => {
    if (nameVerifyCheck === false) {
      if (name === "") {
        return setIsNameWrong({ error: false, checkMark: false });
      }
      return setIsNameWrong({ error: true, checkMark: false });
    } else {
      return setIsNameWrong({ error: false, checkMark: true });
    }
  };

  // email
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [isDuplicateEmail, setIsDuplicateEmail] = useState(undefined);

  const emailRegex =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  const emailVerifyCheck = emailRegex.test(email.trim());

  const [isEmailWrong, setIsEmailWrong] = useState({
    error: false,
    checkMark: false,
  });

  const emailCheckHandler = (email) => {
    if (emailVerifyCheck === false) {
      if (email === "") {
        return setIsEmailWrong({ error: false, checkMark: false });
      }
      return setIsEmailWrong({ error: true, checkMark: false });
    } else {
      return setIsEmailWrong({ error: false, checkMark: true });
    }
  };

  const duplicateEmailCheck = () => {
    if (email === "") {
      return;
    } else {
      if (isEmailWrong.error) {
        return;
      } else {
        dispatch(userActions.duplicateEmailCheck(email.trim())).then(
          (isDuplicateEmail) => {
            setIsDuplicateEmail(isDuplicateEmail);
            if (isDuplicateEmail) {
              setEmailVerify(false);
            } else {
              setEmailVerify(true);
            }
          }
        );
      }
    }
  };

  // password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  useEffect(() => {
    if (visible) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }, [visible]);

  const togglePasswordVisibility = () => {
    setVisible((prev) => !prev);
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // 영어 대문자, 소문자, 숫자, 특수문자를 조합한 8자리 이상의 문자
  const passwordVerifyCheck = passwordRegex.test(password.trim());

  const [isPasswordWrong, setIsPasswordWrong] = useState({
    error: false,
    checkMark: false,
  });
  const [isConfirmPasswordWrong, setIsConfirmPasswordWrong] = useState({
    error: false,
    checkMark: false,
  });

  const passwordCheckHandler = (password) => {
    if (passwordVerifyCheck === false) {
      if (password === "") {
        return setIsPasswordWrong({ error: false, checkMark: false });
      }
      return setIsPasswordWrong({ error: true, checkMark: false });
    } else {
      return setIsPasswordWrong({ error: false, checkMark: true });
    }
  };

  const confirmPasswordCheckHandler = (confirmPassword) => {
    if (confirmPassword === password) {
      if (confirmPassword === "") {
        return setIsConfirmPasswordWrong({ error: false, checkMark: false });
      }
      return setIsConfirmPasswordWrong({ error: false, checkMark: true });
    } else {
      return setIsConfirmPasswordWrong({ error: true, checkMark: false });
    }
  };

  // phoneNumber
  const [phoneNumber, setPhoneNumber] = useState("");

  const phoneNumberRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const phoneNumberVerifyCheck = phoneNumberRegex.test(phoneNumber);

  const [isPhoneNumberWrong, setIsPhoneNumberWrong] = useState({
    error: false,
    checkMark: false,
  });

  const [phoneNumberVerify, setPhoneNumberVerify] = useState(false);
  const [isDuplicatePhoneNumber, setIsDuplicatePhoneNumber] =
    useState(undefined);

  const phoneNumberCheckHandler = (phoneNumber) => {
    if (phoneNumberVerifyCheck === false) {
      if (phoneNumber === "") {
        return setIsPhoneNumberWrong({ error: false, checkMark: false });
      }
      return setIsPhoneNumberWrong({ error: true, checkMark: false });
    } else {
      return setIsPhoneNumberWrong({ error: false, checkMark: true });
    }
  };

  const duplicatePhoneNumberCheck = () => {
    if (phoneNumber === "") {
      return;
    } else {
      if (isPhoneNumberWrong.error) {
        return;
      } else {
        dispatch(userActions.duplicatePhoneNumberCheck(phoneNumber.trim())).then(
          (isDuplicatePhoneNumber) => {
            setIsDuplicatePhoneNumber(isDuplicatePhoneNumber);
            if (isDuplicatePhoneNumber) {
              setPhoneNumberVerify(false);
            } else {
              setPhoneNumberVerify(true);
            }
          }
        );
      }
    }
  };

  // address
  const [address, setAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");

  const extraAddressHandler = (extraAddress) => {
    setExtraAddress(extraAddress);
  };

  // gender
  const [gender, setGender] = useState("");

  const genders = [
    { name: "남성", value: "남성" },
    { name: "여성", value: "여성" },
  ];

  //ToS

  // 이용약관 정보
  const [terms, setTerms] = useState(false);
  const [termsShow, setTermsShow] = useState(false);

  const handleTermsClose = () => setTermsShow(false);
  const handleTermsShow = () => setTermsShow(true);

  // 개인정보 수집 및 이용 정보
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [privacyPolicyShow, setPrivacyPolicyShow] = useState(false);

  const handlePrivacyPolicyClose = () => {
    setPrivacyPolicyShow(false);
  };
  const handlePrivacyPolicyShow = () => {
    setPrivacyPolicyShow(true);
  };

  // 이벤트 및 할인 소식 알림 동의
  const [marketing, setMarketing] = useState(false);

  // react-redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerResult } = useSelector((state) => state.user);

  useEffect(() => {
    if (registerResult && registerResult.registerSuccess) {
      navigate("/login", { replace: true }); // 회원가입 후 뒤로가기 방지
      dispatch({ type: "REGISTER_USER", payload: undefined });
      alert("회원가입이 완료되었습니다.");
    } else if (registerResult && !registerResult.registerSuccess) {
      alert(registerResult.message);
    }
  }, [registerResult]);

  // react-router-dom
  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("비밀번호를 확인해 주세요");
    }

    let registerForm = {
      email: email,
      password: password,
      name: name,
      gender: gender,
      phoneNumber: phoneNumber,
      address: {
        postcode: address.postcode,
        fullAddress: address.fullAddress + " " + extraAddress,
      },
      marketing: marketing,
    };

    if (
      isEmailWrong.error ||
      emailVerify === false ||
      isDuplicateEmail === true ||
      isPasswordWrong.error ||
      isConfirmPasswordWrong.error ||
      isNameWrong.error ||
      gender === "" ||
      phoneNumberVerify === false ||
      isDuplicatePhoneNumber === true ||
      isPhoneNumberWrong.error ||
      address === "" ||
      terms === false ||
      privacyPolicy === false
    ) {
      alert("회원정보를 다시 확인 해 주세요");
    } else {
      dispatch(userActions.registerUser(registerForm));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "20px" }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
    >
      <Container className="register_container">
        <img className="login_logo" src="/images/banner_bgremoved.png" alt="" />
        <Form className="form_container" onSubmit={submitHandler}>
          <Form.Group className="mb-5" controlId="Email">
            <Form.Label style={{ fontWeight: "bold" }}>
              <span>아이디 (이메일)</span>
              <span
                style={{
                  color: "red",
                  fontWeight: "normal",
                  marginLeft: "6px",
                }}
              >
                *
              </span>
            </Form.Label>

            <InputGroup>
              <Form.Control
                type="email"
                name="register_email"
                autoComplete="new-email"
                value={email}
                placeholder="이메일을 입력해 주세요"
                onChange={(e) => {
                  setEmail(e.target.value.trim());
                  setEmailVerify(false);
                  setIsDuplicateEmail(false);
                  setIsEmailWrong({
                    error: false,
                    checkMark: false,
                  });
                }}
                onKeyDown={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
                onBlur={(e) => emailCheckHandler(e.target.value.trim())}
              />
              <InputGroup.Text className="input_area_button">
                {!emailVerify ? (
                  <div
                    onClick={duplicateEmailCheck}
                    className={
                      isEmailWrong.error || email === ""
                        ? "check_btn disabled"
                        : "check_btn"
                    }
                  >
                    중복확인
                  </div>
                ) : isEmailWrong.checkMark && !isDuplicateEmail ? (
                  <BsFillCheckCircleFill className="checked" />
                ) : null}
              </InputGroup.Text>
            </InputGroup>

            {isEmailWrong.error ? (
              <div style={{ color: "red", fontSize: "13px" }}>
                아이디를 확인해 주세요
              </div>
            ) : null}

            <div>
              {isDuplicateEmail ? (
                <div style={{ color: "red", fontSize: "13px" }}>
                  이미 가입되어 있는 아이디 입니다
                </div>
              ) : null}
            </div>
          </Form.Group>

          <Form.Group controlId="Password">
            <Form.Label style={{ fontWeight: "bold", width: "100%" }}>
              <div className="d-flex justify-content-between">
                <div>
                  <span>비밀번호</span>
                  <span
                    style={{
                      color: "red",
                      fontWeight: "normal",
                      marginLeft: "6px",
                    }}
                  >
                    *
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: "normal",
                    fontSize: "13px",
                  }}
                >
                  8자리 이상의 영어 대문자, 소문자, 숫자, 특수문자 조합
                </div>
              </div>
            </Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordType}
                name="register_password"
                value={password}
                autoComplete="new-password"
                className="input_area_password"
                placeholder="비밀번호를 입력해 주세요"
                onChange={(e) => {
                  setPassword(e.target.value.trim());
                  setConfirmPassword("");
                }}
                onKeyDown={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
                onBlur={(e) => passwordCheckHandler(e.target.value.trim())}
              />
              <InputGroup.Text
                className="input_area_button"
                onClick={togglePasswordVisibility}
              >
                {password !== "" ? (
                  visible ? (
                    <AiOutlineEyeInvisible className="mx-2" />
                  ) : (
                    <AiOutlineEye className="mx-2" />
                  )
                ) : null}
                {isPasswordWrong.checkMark ? (
                  <BsFillCheckCircleFill className="checked" />
                ) : null}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          {isPasswordWrong.error ? (
            <div style={{ color: "red", margin: "5px 0", fontSize: "13px" }}>
              8자리 이상의 영어 대문자, 소문자, 숫자, 특수문자 조합이어야 합니다
            </div>
          ) : null}

          <Form.Group
            className="d-flex mt-2 align-items-center"
            controlId="ConfirmPassword"
          >
            <InputGroup>
              <Form.Control
                type={passwordType}
                name="register_confirm_password"
                value={confirmPassword}
                autoComplete="new-confirm-password"
                className="input_area_password"
                placeholder="비밀번호 확인"
                onChange={(e) => setConfirmPassword(e.target.value.trim())}
                onKeyDown={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
                onBlur={(e) => confirmPasswordCheckHandler(e.target.value.trim())}
              />
              <InputGroup.Text
                className="input_area_button"
                onClick={togglePasswordVisibility}
              >
                {password !== "" ? (
                  visible ? (
                    <AiOutlineEyeInvisible className="mx-2" />
                  ) : (
                    <AiOutlineEye className="mx-2" />
                  )
                ) : null}
                {isConfirmPasswordWrong.checkMark ? (
                  <BsFillCheckCircleFill className="checked" />
                ) : null}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          {isConfirmPasswordWrong.error && confirmPassword !== "" ? (
            <div style={{ color: "red", margin: "5px 0", fontSize: "13px" }}>
              비밀번호가 일치하지 않습니다
            </div>
          ) : null}

          <Form.Group className="my-5" controlId="Name">
            <Form.Label style={{ fontWeight: "bold", width: "100%" }}>
              <div className="d-flex justify-content-between">
                <div>
                  <span>이름</span>
                  <span
                    style={{
                      color: "red",
                      fontWeight: "normal",
                      marginLeft: "6px",
                    }}
                  >
                    *
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: "normal",
                    fontSize: "13px",
                  }}
                >
                  5자 이하의 한글
                </div>
              </div>
            </Form.Label>

            <InputGroup>
              <Form.Control
                type="text"
                value={name}
                placeholder="이름을 입력해 주세요"
                onChange={(e) => {
                  setName(e.target.value.trim());
                  setIsNameWrong(false);
                }}
                onKeyDown={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
                onBlur={(e) => nameCheckHandler(e.target.value.trim())}
              />
              <InputGroup.Text className="input_area_button">
                {isNameWrong.checkMark ? (
                  <BsFillCheckCircleFill className="checked" />
                ) : null}
              </InputGroup.Text>
            </InputGroup>

            {isNameWrong.error ? (
              <div
                style={{
                  color: "red",
                  fontSize: "13px",
                }}
              >
                성함을 확인해 주세요
              </div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-5" controlId="Name">
            <div className="d-flex justify-content-between">
              <div>
                <Form.Label
                  style={{
                    fontWeight: "bold",
                    width: "100%",
                    margin: "0",
                  }}
                >
                  <span>성별</span>
                  <span
                    style={{
                      color: "red",
                      fontWeight: "normal",
                      marginLeft: "6px",
                    }}
                  >
                    *
                  </span>
                </Form.Label>
              </div>

              <div>
                <ButtonGroup>
                  {genders.map((radio, index) => (
                    <ToggleButton
                      key={index}
                      id={`radio-${index}`}
                      type="radio"
                      name="gender"
                      value={radio.value}
                      checked={gender === radio.value}
                      className="gender_btn"
                      onChange={(e) => setGender(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>
            </div>
          </Form.Group>

          <Form.Group className="mt-5 mb-5" controlId="PhoneNumber">
            <Form.Label style={{ fontWeight: "bold", width: "100%" }}>
              <span>휴대폰 번호</span>
              <span
                style={{
                  color: "red",
                  fontWeight: "normal",
                  marginLeft: "6px",
                }}
              >
                *
              </span>
            </Form.Label>

            <InputGroup>
              <Form.Control
                type="text"
                value={phoneNumber}
                maxLength={13}
                placeholder="'-' 을 제외한 숫자만 입력해 주세요"
                onChange={(e) => {
                  setPhoneNumber(
                    e.target.value
                      .replace(/[^0-9]/g, "")
                      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
                      .replace(/\-{1,2}$/g, "").trim()
                  );
                  setPhoneNumberVerify(false);
                  setIsDuplicatePhoneNumber(false);
                  setIsPhoneNumberWrong({
                    error: false,
                    checkMark: false,
                  });
                }}
                onKeyDown={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
                onBlur={(e) => {
                  phoneNumberCheckHandler(e.target.value.trim());
                }}
              />
              <InputGroup.Text className="input_area_button">
                {!phoneNumberVerify ? (
                  <div
                    onClick={duplicatePhoneNumberCheck}
                    className={
                      isPhoneNumberWrong.error || phoneNumber === ""
                        ? "check_btn disabled"
                        : "check_btn"
                    }
                  >
                    중복확인
                  </div>
                ) : isPhoneNumberWrong.checkMark && !isDuplicatePhoneNumber ? (
                  <BsFillCheckCircleFill className="checked" />
                ) : null}
              </InputGroup.Text>
            </InputGroup>

            {isPhoneNumberWrong.error ? (
              <div
                style={{
                  color: "red",
                  fontSize: "13px",
                }}
              >
                휴대폰 번호를 확인해 주세요
              </div>
            ) : null}

            {isDuplicatePhoneNumber ? (
              <div
                style={{
                  color: "red",
                  fontSize: "13px",
                }}
              >
                이미 가입되어 있는 휴대폰 번호입니다
              </div>
            ) : null}
          </Form.Group>

          <Form.Group>
            <Form.Label style={{ fontWeight: "bold", width: "100%" }}>
              <span>주소</span>
              <span
                style={{
                  color: "red",
                  fontWeight: "normal",
                  marginLeft: "6px",
                }}
              >
                *
              </span>
            </Form.Label>
            <InputGroup className="mb-2">
              <Form.Control
                type="text"
                value={address.postcode}
                readOnly
                placeholder="우편번호"
                style={{ userSelect: "none", cursor: "default" }}
              />
              <InputGroup.Text className="input_area_button">
                <Postcode setAddress={setAddress} />
              </InputGroup.Text>
            </InputGroup>

            <InputGroup
              style={{ borderRight: "1px solid pink" }}
              className="mb-2"
            >
              <Form.Control
                type="text"
                value={address.fullAddress}
                readOnly
                placeholder="기본 주소"
                style={{ userSelect: "none", cursor: "default" }}
              />
            </InputGroup>

            <InputGroup
              style={{ borderRight: "1px solid pink" }}
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="상세 주소"
                value={extraAddress}
                onChange={(e) => extraAddressHandler(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <div key={`ToS`} className="mb-3">
            <div className="ToS_label_container">
              <Form.Check
                type={"checkbox"}
                id={`terms`}
                label={`(필수) 이용약관 동의`}
                onChange={(e) => {
                  setTerms(e.target.checked);
                }}
              />
              <div className="ToS_button" onClick={handleTermsShow}>
                전문 보기
              </div>
            </div>

            <div className="ToS_label_container">
              <Form.Check
                type={"checkbox"}
                label={`(필수) 개인정보 처리방침 동의`}
                id={`privacyPolicy`}
                onChange={(e) => {
                  setPrivacyPolicy(e.target.checked);
                }}
              />
              <div className="ToS_button" onClick={handlePrivacyPolicyShow}>
                전문 보기
                {/* url 형식으로 해야한다. 타 사이트등에 인증용 등으로 활용하기 위해 */}
              </div>
            </div>

            <div className="ToS_label_container">
              <Form.Check
                type={"checkbox"}
                label={`(선택) 이벤트 및 할인 소식 알림 동의`}
                id={`marketing`}
                onChange={(e) => {
                  setMarketing(e.target.checked);
                }}
              />
            </div>
          </div>

          <>
            <Modal
              show={termsShow}
              onHide={handleTermsClose}
              centered
              size="lg"
              contentClassName="register_modal"
            >
              <Modal.Header closeButton>
                <Modal.Title>이용약관</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Terms />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleTermsClose}>
                  닫기
                </Button>
              </Modal.Footer>
            </Modal>
          </>

          <>
            <Modal
              show={privacyPolicyShow}
              onHide={handlePrivacyPolicyClose}
              centered
              size="lg"
              contentClassName="register_modal"
            >
              <Modal.Header closeButton>
                <Modal.Title>개인정보 수집 및 이용</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <PrivacyPolicy />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handlePrivacyPolicyClose}>
                  닫기
                </Button>
              </Modal.Footer>
            </Modal>
          </>

          <Button className="login_button mt-5 w-100" type="submit">
            회원가입
          </Button>
        </Form>
      </Container>
    </motion.div>
  );
}

export default RegisterPage;
