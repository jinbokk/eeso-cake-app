import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { userActions } from "../redux/actions/userActions";
import { motion } from "framer-motion";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

import "./css/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordVisibility = () => {
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    if (visible) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }, [visible]);

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

    if (body.email === "") {
      alert("이메일을 입력해주세요");
    } else if (body.password === "") {
      alert("비밀번호를 입력해주세요");
    } else {
      dispatch(userActions.loginUser(body));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "20px" }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
    >
      <Container className="login_container">
        <img className="login_logo" src="/images/banner_bgremoved.png" alt="" />
        <Form className="form_container" onSubmit={submitHandler}>
          <Form.Group controlId="Email">
            <Form.Control
              type="email"
              placeholder="이메일을 입력해 주세요."
              className="input_area_email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            className="mb-3 d-flex align-items-center"
            controlId="Password"
          >
            <InputGroup>
              <Form.Control
                type={passwordType}
                className="input_area_password"
                placeholder="비밀번호를 입력해 주세요."
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputGroup.Text
                className="input_area_button"
                onClick={togglePasswordVisibility}
              >
                {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Checkbox">
            <Row>
              <Col lg={6}>
                <Form.Check type="checkbox" label="이메일 기억하기" />
              </Col>
              <Col lg={6}>
                <div className="help_link">
                  <NavLink>비밀번호를 잊으셨나요?</NavLink>
                  <span className="mx-2">/</span>
                  <NavLink to="/register">회원가입</NavLink>
                </div>
              </Col>
            </Row>
          </Form.Group>
          <Button
            className="login_button w-100"
            variant="primary"
            type="submit"
          >
            로그인
          </Button>
        </Form>
      </Container>
    </motion.div>
  );
}

export default Login;
