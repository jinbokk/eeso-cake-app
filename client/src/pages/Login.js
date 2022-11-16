import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./css/login.css";

function Login() {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Container className="login_container">
      <img className="login_logo" src="/images/banner_bgremoved.png" alt="" />
      <Form className="form_container" onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail">
          {/* <Form.Label>ID</Form.Label> */}
          <Form.Control type="email" placeholder="이메일을 입력해 주세요." />
          {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력해 주세요."
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
