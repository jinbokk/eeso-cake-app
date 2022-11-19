import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../redux/actions/userActions";

import "./css/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // react-redux
  const dispatch = useDispatch();
  const { loginResult } = useSelector((state) => state.user);

  // react-router-dom
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");

    let body = {
      email: email,
      password: password,
    };

    dispatch(userActions.loginUser(body)).then(() => {
      if (loginResult.loginSuccess) {
        navigate(-1);
      } else {
        alert(loginResult.message);
      }
    });
    // .then(async (res) => {
    //   console.log(res);
    // if (res.payload.loginResult.loginSuccess) {
    //   // history.push("/");
    // } else {
    //   alert("로그인 에러");
    // }
    // });
  };

  return (
    <Container className="login_container">
      <img className="login_logo" src="/images/banner_bgremoved.png" alt="" />
      <Form className="form_container" onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="이메일을 입력해 주세요."
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Row>
            <Col lg={6}>
              <Form.Check type="checkbox" label="이메일 기억하기" />
            </Col>
            <Col lg={6}>
              <div className="help_link">
                <a>비밀번호를 잊으셨나요?</a>
                <span className="mx-2">/</span>
                <a>회원가입</a>
              </div>
            </Col>
          </Row>
        </Form.Group>
        <Button className="login_button w-100" variant="primary" type="submit">
          로그인
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
