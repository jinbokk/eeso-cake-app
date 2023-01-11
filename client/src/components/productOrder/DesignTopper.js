import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { ToggleButtonGroup, ToggleButton, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { brown } from "@mui/material/colors";

import { Controller } from "react-hook-form";
import { orderActions } from "../../redux/actions/orderActions";

const DesignTopper = ({ control }) => {
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
  const [topper, setTopper] = useState(false);
  const topperHandler = (value) => {
    setTopper(value);
    console.log(value);
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
    }
  };

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
                  value={topper}
                  onChange={(e) => {
                    onChange(e.target.value);
                    topperHandler(e.target.value);
                  }}
                  exclusive
                  fullWidth
                  style={{
                    whiteSpace: "nowrap",
                  }}
                  {...field}
                >
                  <CustomToggleButton value="Y">
                    <div
                      style={{
                        fontSize: "1rem",
                        pointerEvents: "none",
                      }}
                    >
                      추가 하기
                    </div>
                  </CustomToggleButton>
                  <CustomToggleButton value="N">
                    <div
                      style={{
                        fontSize: "1rem",
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

        <div className={topper === "Y" ? "input_visible" : "input_hide"}>
          <div className="d-flex justify-content-between">
            <div>토퍼 문구 {`(${topperLength}/15)`}</div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "red",
                marginBottom: "1rem",
              }}
            >
              * 10자 내 +6,000원 / 15자 내 +9,000원
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
