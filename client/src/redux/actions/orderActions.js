// delivery
function setDeliveryType(deliveryType) {
  return async (dispatch) => {
    dispatch({
      type: "SET_DELIVERY_TYPE",
      payload: deliveryType,
    });
  };
}
function setDeliveryDate(deliveryDate) {
  return async (dispatch) => {
    dispatch({
      type: "SET_DELIVERY_DATE",
      payload: deliveryDate,
    });
  };
}
function setDeliveryTime(deliveryTime) {
  return async (dispatch) => {
    dispatch({
      type: "SET_DELIVERY_TIME",
      payload: deliveryTime,
    });
  };
}

// lettering
function setLetteringText(letteringText) {
  return async (dispatch) => {
    dispatch({
      type: "SET_LETTERING",
      payload: letteringText,
    });
  };
}

// designTopper
function setDesignTopperText(designTopperText) {
  return async (dispatch) => {
    dispatch({
      type: "SET_DESIGN_TOPPER",
      payload: designTopperText,
    });
  };
}

// customerRequest
function setCustomerRequestText(customerRequestText) {
  return async (dispatch) => {
    dispatch({
      type: "SET_CUSTOMER_REQUEST",
      payload: customerRequestText,
    });
  };
}

export const orderActions = {
  setDeliveryType,
  setDeliveryDate,
  setDeliveryTime,
  setLetteringText,
  setDesignTopperText,
  setCustomerRequestText,
};
