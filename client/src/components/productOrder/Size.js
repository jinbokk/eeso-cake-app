import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { brown } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { orderActions } from "../../redux/actions/orderActions";

const Size = ({ control, cartItems, setSizePrice }) => {
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

  const [size, setSize] = useState(undefined);

  useEffect(() => {
    if (size === "1호") {
      setSizePrice(0);
    } else if (size === "2호") {
      setSizePrice(15000);
    } else if (size === "3호") {
      setSizePrice(30000);
    } else if (size === "2단 (1호+3호)") {
      setSizePrice(45000);
    } else {
      setSizePrice(0);
    }
  }, [size]);

  const sizeHandler = (value) => {
    dispatch(orderActions.setSize(value));
    setSize(value);
  };

  useEffect(() => {
    setSize(undefined);
    setSizePrice(0);
  }, [cartItems]);

  return (
    <>
      <div className="option_menu_section flex-column">
        <div>
          <div className="mb-3">케이크 사이즈</div>
        </div>

        <div className="controller_container w-100">
          <Controller
            control={control}
            name="케이크_사이즈"
            render={({ field: { onChange, value, ...field } }) => (
              <ToggleButtonGroup
                color="button"
                size="medium"
                value={size}
                // value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  sizeHandler(e.target.value);
                }}
                exclusive
                fullWidth
                style={{
                  whiteSpace: "nowrap",
                }}
                {...field}
              >
                <CustomToggleButton value="1호">
                  <div className="image_button_container">
                    <img
                      className="size_image"
                      src="/images/bread_cake_size/no_1.png"
                      alt=""
                    />
                    <div>1호</div>
                    <div className="diameter">ø 16cm</div>
                    <div className="diameter">기본</div>
                  </div>
                </CustomToggleButton>
                <CustomToggleButton value="2호">
                  <div className="image_button_container">
                    <img
                      className="size_image"
                      src="/images/bread_cake_size/no_2.png"
                      alt=""
                    />
                    <div>2호</div>
                    <div className="diameter">ø 19cm</div>
                    <div className="diameter">(+15,000)</div>
                  </div>
                </CustomToggleButton>
                <CustomToggleButton value="3호">
                  <div className="image_button_container">
                    <img
                      className="size_image"
                      src="/images/bread_cake_size/no_3.png"
                      alt=""
                    />
                    <div>3호</div>
                    <div className="diameter">ø 21cm</div>
                    <div className="diameter">(+30,000)</div>
                  </div>
                </CustomToggleButton>
                <CustomToggleButton value="2단 (1호+3호)">
                  <div className="image_button_container">
                    <img
                      className="size_image"
                      src="/images/bread_cake_size/two_layer.png"
                      alt=""
                    />
                    <div>2단</div>
                    <div className="diameter">1호 + 3호</div>
                    <div className="diameter">(+45,000)</div>
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

export default Size;
