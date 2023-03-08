// delivery
function setDeliveryType(deliveryType) {
  return async (dispatch) => {
    dispatch({
      type: "SET_DELIVERY_TYPE",
      payload: deliveryType,
    });
  };
}

function setDeliveryDate(body) {
  return async (dispatch) => {
    dispatch({
      type: "SET_DELIVERY_DATE",
      payload: body,
    });
  };
}

function setDeliveryTime(body) {
  return async (dispatch) => {
    dispatch({
      type: "SET_DELIVERY_TIME",
      payload: body,
    });
  };
}

// size
function setSize(size) {
  return async (dispatch) => {
    dispatch({
      type: "SET_SIZE",
      payload: size,
    });
  };
}

// sheet
function setSheet(sheet) {
  return async (dispatch) => {
    dispatch({
      type: "SET_SHEET",
      payload: sheet,
    });
  };
}

// lettering
function setLetteringToggle(letteringToggle) {
  return async (dispatch) => {
    dispatch({
      type: "SET_LETTERING_TOGGLE",
      payload: letteringToggle,
    });
  };
}
function setLetteringText(letteringText) {
  return async (dispatch) => {
    dispatch({
      type: "SET_LETTERING_TEXT",
      payload: letteringText,
    });
  };
}

// designTopper
function setDesignTopperToggle(designTopperToggle) {
  return async (dispatch) => {
    dispatch({
      type: "SET_DESIGN_TOPPER_TOGGLE",
      payload: designTopperToggle,
    });
  };
}
function setDesignTopperText(DesignTopperText) {
  return async (dispatch) => {
    dispatch({
      type: "SET_DESIGN_TOPPER_TEXT",
      payload: DesignTopperText,
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
  setSize,
  setSheet,
  setLetteringToggle,
  setLetteringText,
  setDesignTopperToggle,
  setDesignTopperText,
  setCustomerRequestText,
};
