import React, { useState, useEffect, useLayoutEffect } from "react";
import { Container, Form, InputGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/userActions";
import { useNavigate } from "react-router";
import { useOutletContext } from "react-router";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";

const UnregisterPage = () => {
  const [title, setTitle] = useOutletContext();

  useLayoutEffect(() => {
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

  const unregisterHandler = (e) => {
    e.preventDefault();
    const confirm = window.confirm(
      "탈퇴 후 회원 정보는 모두 사라지며\n관련 내용은 복구할 수 없습니다\n회원탈퇴를 진행 하시겠습니까?"
    );
    if (confirm) {
      let body = {
        email: authUserData.email,
        password: password,
      };
      dispatch(userActions.unregisterUser(body)).then((unregisterResult) => {
        if (unregisterResult.unregisterSuccess) {
          window.alert("회원 탈퇴가 완료되었습니다.\n홈 화면으로 이동합니다.");
          navigate("/", { replace: true });
        } else {
          window.alert(unregisterResult.message);
          return;
        }
      });
    } else {
      return;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "20px" }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
    >
      <Container className="d-flex justify-content-center align-items-center">
        <Form className="form_container" onSubmit={unregisterHandler}>
          <div>아이디 (이메일)</div>
          <Form.Group
            className="mb-3 d-flex align-items-center"
            controlId="Email"
          >
            <InputGroup
              style={{ width: "300px", borderRight: "1px solid pink" }}
            >
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
    </motion.div>
  );
};

export default UnregisterPage;
