import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../redux/actions/userActions";

import { BsFillCheckCircleFill } from "react-icons/bs";
import "./css/login.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // register regular expression
  const nameRegex = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/; //공백은 히+ㅎ 이다. 폰트 깨짐.
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // 영어 대문자, 소문자, 숫자, 특수문자를 조합한 8자리 이상의 문자
  // const phoneNumberRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  const nameValueCheck = nameRegex.test(name);
  const emailValueCheck = emailRegex.test(email);
  const passwordValueCheck = passwordRegex.test(password);
  // const phoneNumberValueCheck = phoneNumberRegex.test(phoneNumber);

  // state for value check
  const [isNameWrong, setIsNameWrong] = useState({
    result: false,
    checkMark: false,
  });
  const [isEmailWrong, setIsEmailWrong] = useState({
    result: false,
    checkMark: false,
  });
  const [isPasswordWrong, setIsPasswordWrong] = useState({
    result: false,
    checkMark: false,
  });
  const [isCPasswordWrong, setIsCPasswordWrong] = useState({
    result: false,
    checkMark: false,
  });

  const nameCheckHandler = () => {
    if (nameValueCheck === false) {
      return setIsNameWrong({ result: true, checkMark: false });
    } else {
      return setIsNameWrong({ result: false, checkMark: true });
    }
  };

  const emailCheckHandler = () => {
    if (emailValueCheck === false) {
      return setIsEmailWrong({ result: true, checkMark: false });
    } else {
      return setIsEmailWrong({ result: false, checkMark: true });
    }
  };

  const passwordCheckHandler = () => {
    if (passwordValueCheck === false) {
      return setIsPasswordWrong({ result: true, checkMark: false });
    } else {
      return setIsPasswordWrong({ result: false, checkMark: true });
    }
  };

  const cpasswordCheckHandler = (e) => {
    if (e.target.value !== password) {
      return setIsCPasswordWrong({ result: true, checkMark: false });
    } else {
      return setIsCPasswordWrong({ result: false, checkMark: true });
    }
  };

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

    let body = {
      name: name,
      email: email,
      password: password,
    };

    if (
      isNameWrong.result ||
      isEmailWrong.result ||
      isPasswordWrong.result ||
      isCPasswordWrong.result
    ) {
      alert("회원정보를 다시 확인 해 주세요");
    } else {
      dispatch(userActions.registerUser(body));
    }
  };

  return (
    <Container className="login_container">
      <img className="login_logo" src="/images/banner_bgremoved.png" alt="" />
      <Form className="form_container" onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="Name">
          <Form.Label style={{ fontWeight: "bold" }}>
            성함
            <span
              style={{ color: "red", fontWeight: "lighter", marginLeft: "6px" }}
            >
              *
            </span>
          </Form.Label>
          <Form.Control
            type="name"
            placeholder="성함을 입력해 주세요."
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            onBlur={nameCheckHandler}
          />

          {isNameWrong.result ? (
            <div style={{ color: "red" }}>성함을 확인해 주세요</div>
          ) : isNameWrong.checkMark ? (
            <span className="checked">
              <BsFillCheckCircleFill />
            </span>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="Email">
          <Form.Label style={{ fontWeight: "bold" }}>
            이메일
            <span
              style={{ color: "red", fontWeight: "lighter", marginLeft: "6px" }}
            >
              *
            </span>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일을 입력해 주세요."
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            onBlur={emailCheckHandler}
          />
          {isEmailWrong.result ? (
            <div style={{ color: "red" }}>이메일을 확인해 주세요</div>
          ) : isEmailWrong.checkMark ? (
            <span className="checked">
              <BsFillCheckCircleFill />
            </span>
          ) : null}
        </Form.Group>

        <Form.Group controlId="Password">
          <Form.Label style={{ fontWeight: "bold" }}>
            비밀번호
            <span
              style={{ color: "red", fontWeight: "lighter", marginLeft: "6px" }}
            >
              *
            </span>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            onBlur={passwordCheckHandler}
          />
          {isPasswordWrong.result ? (
            <div style={{ color: "red" }}>비밀번호를 확인해 주세요</div>
          ) : isPasswordWrong.checkMark ? (
            <span className="checked">
              <BsFillCheckCircleFill />
            </span>
          ) : null}
        </Form.Group>
        <div style={{ opacity: "0.7", fontSize: "0.7rem" }}>
          8자리 이상의 영어 대문자, 소문자, 숫자, 특수문자 조합
        </div>

        <Form.Group className="my-2" controlId="PasswordConfirm">
          <Form.Control
            type="password"
            placeholder="비밀번호 확인"
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            onBlur={cpasswordCheckHandler}
          />
          {isCPasswordWrong.result ? (
            <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다</div>
          ) : isCPasswordWrong.checkMark ? (
            <span className="checked">
              <BsFillCheckCircleFill />
            </span>
          ) : null}
        </Form.Group>

        <Button
          className="login_button mt-4 w-100"
          variant="primary"
          type="submit"
        >
          회원가입
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
