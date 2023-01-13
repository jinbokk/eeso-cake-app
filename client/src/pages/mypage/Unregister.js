import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/userActions";
import { useNavigate } from "react-router";
import { useOutletContext } from "react-router";

const Unregister = () => {
  const [title, setTitle] = useOutletContext();

  useEffect(() => {
    setTitle("회원정보");
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUserData } = useSelector((state) => state.user);

  const unregisterHandler = () => {
    const confirm = window.confirm("회원 탈퇴 하시겠습니까?");
    if (confirm) {
      navigate("/login");
      dispatch(userActions.unregisterUser(authUserData.email));
    } else {
      return;
    }
  };

  return (
    <div>
      <div>아이디 (이메일)</div>
      <div>{authUserData && authUserData.email}</div>
      <div>비밀번호</div>
      {/* <Form.Group controlId="Password">
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
            value={password}
            autoComplete="on"
            className="input_area_password"
            placeholder="비밀번호를 입력해 주세요"
            onChange={(e) => {
              setPassword(e.target.value);
              setConfirmPassword("");
            }}
            onKeyDown={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            onBlur={(e) => passwordCheckHandler(e.target.value)}
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
      </Form.Group> */}

      <div onClick={unregisterHandler}>회원 탈퇴</div>
    </div>
  );
};

export default Unregister;
