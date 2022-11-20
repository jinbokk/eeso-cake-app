import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { userActions } from "../redux/actions/userActions";

import "./css/login.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // react-redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerResult } = useSelector((state) => state.user);

  useEffect(() => {
    if (registerResult && registerResult.registerSuccess) {
      navigate("/login", { replace: true }); // 회원가입 후 뒤로가기 방지
      dispatch({ type: "REGISTER_DONE" });
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

    dispatch(userActions.registerUser(body));
  };

  const valueCheckHandler = (e) => {
    // {isNaN(name) === false ? "이름을 확인해 주세요" : null}
    console.log(e);
  };

  return (
    <Container className="login_container">
      <img className="login_logo" src="/images/banner_bgremoved.png" alt="" />
      <Form className="form_container" onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="Name">
          <Form.Label style={{ fontWeight: "bold" }}>
            이름
            <span
              style={{ color: "red", fontWeight: "lighter", marginLeft: "6px" }}
            >
              *
            </span>
          </Form.Label>
          <Form.Control
            type="name"
            placeholder="이름을 입력해 주세요."
            onChange={(e) => setName(e.target.value)}
          />
          <div onBlur={() => console.log("hi")}></div>
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
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password">
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
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="PasswordConfirm">
          <Form.Control
            type="password"
            placeholder="비밀번호 확인"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button className="login_button w-100" variant="primary" type="submit">
          회원가입
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
