import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { ToggleButtonGroup, ToggleButton, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { brown } from "@mui/material/colors";

import { Controller } from "react-hook-form";
import { orderActions } from "../../redux/actions/orderActions";

const DesignTopper = ({ control, cartItems, setDesignTopperPrice }) => {
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

  // topper
  const [topperToggle, setTopperToggle] = useState(undefined);
  const topperToggleHandler = (value) => {
    setTopperToggle(value);
    console.log(value);
    dispatch(orderActions.setDesignTopperToggle(value));
  };

  const [topperText, setTopperText] = useState("");
  const topperTextHandler = (value) => {
    setTopperText(value);
    console.log(value);
    dispatch(orderActions.setDesignTopperText(value));
  };

  // lengthCheck
  const [topperLength, setTopperLength] = useState(0);
  const [topperLengthError, setTopperLengthError] = useState(false);
  const topperLengthHandler = (value) => {
    if (value.length > 15) {
      setTopperLengthError(true);
    } else {
      setTopperLengthError(false);
      setTopperLength(value.length);
      if (value.length !== 0) {
        if (value.length <= 10) {
          setDesignTopperPrice(6000);
        } else {
          setDesignTopperPrice(9000);
        }
      } else {
        setDesignTopperPrice(0);
      }
    }
  };

  useEffect(() => {
    setTopperToggle(false);
    setTopperText("");
    setTopperLength(0);
    topperLengthHandler("");
    setTopperLengthError(false);
  }, [cartItems]);

  return (
    <>
      <div className="d-block option_menu_section">
        <div className="d-flex justify-content-between align-items-center">
          <span className="option_menu_text">디자인 토퍼</span>
          <div className="controller_container">
            <Controller
              control={control}
              name="토퍼_추가"
              render={({ field: { onChange, value, ...field } }) => (
                <ToggleButtonGroup
                  color="button"
                  size="medium"
                  // defaultValue={false}
                  value={topperToggle}
                  onChange={(e) => {
                    onChange(e.target.value);
                    topperToggleHandler(e.target.value);
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
            topperToggle === "추가 하기" ? "input_visible" : "input_hide"
          }
        >
          <div className="d-flex justify-content-between">
            <div>토퍼 문구 {`(${topperLength}/15)`}</div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "red",
                marginBottom: "1rem",
              }}
            >
              * 10자 내 +6,000원 / 11자 ~ 15자 +9,000원
            </div>
          </div>

          <Controller
            control={control}
            name="토퍼_문구"
            defaultValue=""
            render={({ field: { onChange, value, ...field } }) => (
              <TextField
                // label="최대 15자 까지 입력 가능합니다"
                placeholder="최대 15자 까지 입력 가능합니다"
                inputProps={{ maxLength: 15 }}
                value={topperText}
                error={topperLengthError ? true : false}
                helperText={topperLengthError ? "문구를 확인해 주세요" : null}
                onChange={(e) => {
                  onChange(e.target.value);
                  topperTextHandler(e.target.value);
                  topperLengthHandler(e.target.value);
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

export default DesignTopper;
