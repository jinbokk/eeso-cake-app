let initialState = {
  deliveryType: undefined,
  deliveryDate: undefined,
  deliveryTime: undefined,
  letteringText: undefined,
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
      return { ...state, deliveryDate: payload };

    case "SET_DELIVERY_TIME":
      return { ...state, deliveryTime: payload };

    // lettering
    case "SET_LETTERING":
      return { ...state, letteringText: payload };

    // designTopper
    case "SET_DESIGN_TOPPER":
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
