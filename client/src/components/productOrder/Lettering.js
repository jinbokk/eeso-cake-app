import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { ToggleButtonGroup, ToggleButton, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { brown } from "@mui/material/colors";

import { Controller } from "react-hook-form";
import { orderActions } from "../../redux/actions/orderActions";

const Lettering = ({ control, cartItems }) => {
  const dispatch = useDispatch();

  const CustomToggleButton = styled(ToggleButton)(() => ({
    border: "1px solid",
    color: brown[400],
    borderColor: "rgba(0, 0, 0, 0.25)",
    boxShadow: "none",
    "&.Mui-disabled": {
      border: "1px solid",
      borderColor: "rgba(0, 0, 0, 0.25)",
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: brown[300],
    },

    "&:hover": {
      boxShadow: "none",
    },
  }));

  // lettering
  const [letteringToggle, setLetteringToggle] = useState(false);
  const letteringToggleHandler = (value) => {
    setLetteringToggle(value);
    console.log(value);
    dispatch(orderActions.setLetteringToggle(value));
  };

  const [letteringText, setLetteringText] = useState("");
  const letteringTextHandler = (value) => {
    setLetteringText(value);
    console.log(value);
    dispatch(orderActions.setLetteringText(value));
  };

  // lengthCheck
  const [letteringLength, setLetteringLength] = useState(0);
  const [letteringLengthError, setLetteringLengthError] = useState(false);

  const LetteringLengthHandler = (value) => {
    if (value.length > 15) {
      setLetteringLengthError(true);
    } else {
      setLetteringLengthError(false);
      setLetteringLength(value.length);
    }
  };

  useEffect(() => {
    setLetteringToggle(false);
    setLetteringText("");
    setLetteringLength(0);
    LetteringLengthHandler("");
    setLetteringLengthError(false);
  }, [cartItems]);

  return (
    <>
      <div className="d-block option_menu_section">
        <div className="d-flex justify-content-between align-items-center">
          <span className="option_menu_text">케이크 레터링</span>
          <div className="controller_container">
            <Controller
              control={control}
              name="레터링_추가"
              render={({ field: { onChange, value, ...field } }) => (
                <ToggleButtonGroup
                  color="button"
                  size="medium"
                  defaultValue={false}
                  value={letteringToggle}
                  onChange={(e) => {
                    onChange(e.target.value);
                    letteringToggleHandler(e.target.value);
                  }}
                  exclusive
                  fullWidth
                  style={{
                    whiteSpace: "nowrap",
                  }}
                  {...field}
                >
                  <CustomToggleButton value="추가 하기">
                    <div
                      style={{
                        fontSize: "0.9rem",
                        pointerEvents: "none",
                      }}
                    >
                      추가 하기
                    </div>
                  </CustomToggleButton>
                  <CustomToggleButton value="추가하지 않기">
                    <div
                      style={{
                        fontSize: "0.9rem",
                        pointerEvents: "none",
                      }}
                    >
                      추가하지 않기
                    </div>
                  </CustomToggleButton>
                </ToggleButtonGroup>
              )}
            />
          </div>
        </div>

        <div
          className={
            letteringToggle === "추가 하기" ? "input_visible" : "input_hide"
          }
        >
          <div className="d-flex justify-content-between">
            <div>레터링 문구 {`(${letteringLength}/15)`}</div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "red",
                marginBottom: "1rem",
              }}
            >
              * 레터링 문구는 간결할수록 예쁘게 작업 됩니다
            </div>
          </div>
          <Controller
            control={control}
            name="레터링_문구"
            defaultValue=""
            render={({ field: { onChange, value, ...field } }) => (
              <TextField
                // label="최대 15자 까지 입력 가능합니다"
                placeholder="최대 15자 까지 입력 가능합니다"
                inputProps={{ maxLength: 15 }}
                value={letteringText}
                error={letteringLengthError ? true : false}
                helperText={
                  letteringLengthError ? "문구를 확인해 주세요" : null
                }
                onChange={(e) => {
                  onChange(e.target.value);
                  letteringTextHandler(e.target.value);
                  LetteringLengthHandler(e.target.value);
                }}
                variant="outlined"
                fullWidth
                {...field}
              />
            )}
          />
        </div>
      </div>
    </>
  );
};

export default Lettering;
