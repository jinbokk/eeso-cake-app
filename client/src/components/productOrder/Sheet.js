import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { brown } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { orderActions } from "../../redux/actions/orderActions";

const Sheet = ({ control, cartItems, setSheetPrice }) => {
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

  const [sheet, setSheet] = useState(undefined);

  useEffect(() => {
    if (sheet === "바닐라 시트") {
      setSheetPrice(0);
    }

    if (sheet === "초코 시트") {
      setSheetPrice(3000);
    }
  }, [sheet]);

  const sheetHandler = (value) => {
    dispatch(orderActions.setSheet(value));
    setSheet(value);
  };

  useEffect(() => {
    setSheet(undefined);
    setSheetPrice(0);
  }, [cartItems]);

  return (
    <>
      <div className="option_menu_section flex-column">
        <div>
          <div className="mb-3">케이크 시트</div>
        </div>

        <div className="controller_container w-100">
          <Controller
            control={control}
            name="케이크_시트"
            render={({ field: { onChange, value, ...field } }) => (
              <ToggleButtonGroup
                color="button"
                size="medium"
                value={sheet}
                // value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  sheetHandler(e.target.value);
                }}
                exclusive
                fullWidth
                style={{
                  whiteSpace: "nowrap",
                }}
                {...field}
              >
                <CustomToggleButton value="바닐라 시트">
                  <div className="image_button_container">
                    <img
                      className="sheet_image"
                      src="/images/bread_cake_sheet/vanila.png"
                      alt=""
                    />
                    <div>바닐라 시트</div>
                    <div className="diameter">기본</div>
                  </div>
                </CustomToggleButton>
                <CustomToggleButton value="초코 시트">
                  <div className="image_button_container">
                    <img
                      className="sheet_image"
                      src="/images/bread_cake_sheet/choco.png"
                      alt=""
                    />
                    <div>초코 시트</div>
                    <div className="diameter">(+3,000)</div>
                  </div>
                </CustomToggleButton>
              </ToggleButtonGroup>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default Sheet;
