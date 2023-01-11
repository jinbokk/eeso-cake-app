import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { orderActions } from "../../redux/actions/orderActions";

const CustomerRequest = ({ control }) => {
  const dispatch = useDispatch();

  // request
  const [request, setRequest] = useState("");
  const requestHandler = (value) => {
    setRequest(value);
    dispatch(orderActions.setCustomerRequestText(value));
  };

  return (
    <>
      <div className="d-block border-0 option_menu_section">
        <div className="d-flex justify-content-between">
          <div>요청 사항</div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "red",
              marginBottom: "1rem",
            }}
          >
            * 레터링 추가 요청은 반영되지 않습니다
          </div>
        </div>

        <Controller
          control={control}
          name="요청_사항"
          defaultValue=""
          render={({ field: { onChange, value, ...field } }) => (
            <TextField
              {...field}
              // multiline
              // label="레터링 추가 요청은 반영되지 않습니다"
              fullWidth
              variant="outlined"
              style={{ width: "100%" }}
              value={request}
              onChange={(e) => {
                onChange(e.target.value);
                requestHandler(e.target.value);
              }}
            />
          )}
        />
      </div>
    </>
  );
};

export default CustomerRequest;
