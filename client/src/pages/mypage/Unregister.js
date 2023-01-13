import React, { useState, useEffect } from "react";
import { Container, Form, InputGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/userActions";
import { useNavigate } from "react-router";
import { useOutletContext } from "react-router";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const Unregister = () => {
  const [title, setTitle] = useOutletContext();

  useEffect(() => {
    setTitle("회원정보");
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUserData } = useSelector((state) => state.user);

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

  const unregisterHandler = () => {
    const confirm = window.confirm("회원 탈퇴 하시겠습니까?");
    if (confirm) {
      let body = {
        email: authUserData.email,
        password: password,
      };
      navigate("/login");
      dispatch(userActions.unregisterUser(body));
    } else {
      return;
    }
  };

  return (
    <Container>
      <Form className="form_container" onSubmit={unregisterHandler}>
        <div>아이디 (이메일)</div>
        <Form.Group
          className="mb-3 d-flex align-items-center"
          controlId="Email"
        >
          <InputGroup style={{ width: "300px", borderRight: "1px solid pink" }}>
            <Form.Control
              value={authUserData && authUserData.email}
              readOnly
              disabled
            />
          </InputGroup>
        </Form.Group>

        <div>비밀번호</div>
        <Form.Group
          className="mb-3 d-flex align-items-center"
          controlId="Password"
        >
          <InputGroup style={{ width: "300px" }}>
            <Form.Control
              type={passwordType}
              autoComplete="on"
              className="input_area_password"
              placeholder="비밀번호를 입력해 주세요."
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroup.Text
              className="input_area_button"
              onClick={togglePasswordVisibility}
            >
              {password !== "" ? (
                visible ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )
              ) : null}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Button
          className="login_button mt-5"
          style={{ width: "300px" }}
          type="submit"
        >
          회원 탈퇴
        </Button>
      </Form>
    </Container>
  );
};

export default Unregister;
