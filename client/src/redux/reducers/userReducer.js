let initialState = {
  registerResult: undefined,
  loginResult: undefined,
  authUserData: undefined,
  cart: undefined,
  cartDetail: undefined,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "REGISTER_USER":
      return { ...state, registerResult: payload };

    case "LOGIN_USER":
      return { ...state, loginResult: payload };

    case "LOGOUT_USER":
      return { ...state, loginResult: payload };

    case "AUTH_USER":
      return { ...state, authUserData: payload };

    case "ADD_TO_CART":
      return { ...state, cart: payload };

    case "GET_CART_ITEMS_REQUEST":
      return { ...state, loading: true };

    case "GET_CART_ITEMS_SUCCESS":
      return { ...state, loading: false, cartDetail: payload };

    case "REMOVE_CART_ITEMS":
      return { ...state, cartDetail: payload };

    default:
      return state;
  }
};

export default userReducer;
