import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { userActions } from "../redux/actions/userActions";

import "./css/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // react-redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginResult } = useSelector((state) => state.user);

  useEffect(() => {
    if (loginResult && loginResult.loginSuccess) {
      navigate(-1);
    } else if (loginResult && !loginResult.loginSuccess) {
      alert(loginResult.message);
    }
  }, [loginResult]);

  // react-router-dom

  const submitHandler = (e) => {
    e.preventDefault();

    let body = {
      email: email,
      password: password,
    };

    dispatch(userActions.loginUser(body));
  };

  return (
    <Container className="login_container">
      <img className="login_logo" src="/images/banner_bgremoved.png" alt="" />
      <Form className="form_container" onSubmit={submitHandler}>
        <Form.Group controlId="Email">
          <Form.Control
            type="email"
            placeholder="이메일을 입력해 주세요."
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password">
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Checkbox">
          <Row>
            <Col lg={6}>
              <Form.Check type="checkbox" label="이메일 기억하기" />
            </Col>
            <Col lg={6}>
              <div className="help_link">
                <a>비밀번호를 잊으셨나요?</a>
                <span className="mx-2">/</span>
                <NavLink to="/register">회원가입</NavLink>
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
