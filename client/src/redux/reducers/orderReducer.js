let initialState = {
  deliveryType: undefined,
  deliveryDate: undefined,
  deliveryTime: undefined,
  letteringToggle: undefined,
  letteringText: undefined,
  designTopperToggle: undefined,
  designTopperText: undefined,
  customerRequestText: undefined,
};

const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // delivery
    case "SET_DELIVERY_TYPE":
      return { ...state, deliveryType: payload };

    case "SET_DELIVERY_DATE":
      return {
        ...state,
        deliveryDate: {
          dateType: payload.dateType,
          stringType: payload.stringType,
        },
      };

    case "SET_DELIVERY_TIME":
      return {
        ...state,
        deliveryTime: {
          dateType: payload.dateType,
          stringType: payload.stringType,
        },
      };

    // lettering
    case "SET_LETTERING_TOGGLE":
      return { ...state, letteringToggle: payload };
    case "SET_LETTERING_TEXT":
      return { ...state, letteringText: payload };

    // designTopper
    case "SET_DESIGN_TOPPER_TOGGLE":
      return { ...state, designTopperToggle: payload };
    case "SET_DESIGN_TOPPER_TEXT":
      return { ...state, designTopperText: payload };

    // customerRequest
    case "SET_CUSTOMER_REQUEST":
      return { ...state, customerRequestText: payload };

    case "RESET_FORM":
      return {
        ...state,
        deliveryType: undefined,
        deliveryDate: undefined,
        deliveryTime: undefined,
        letteringText: undefined,
        designTopperText: undefined,
        customerRequestText: undefined,
      };

    default:
      return state;
  }
};

export default orderReducer;
