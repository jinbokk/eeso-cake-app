let initialState = {
  registerResult: undefined,
  unregisterResult: undefined,
  loginResult: undefined,
  authUserData: undefined,
  // cartDetail: undefined,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "REGISTER_USER":
      return { ...state, registerResult: payload };

    case "UNREGISTER_USER":
      return { ...state, loginResult: undefined, unregisterResult: payload };

    case "LOGIN_USER":
      return { ...state, loginResult: payload };

    case "LOGOUT_USER":
      return {
        ...state,
        loginResult: payload.loginResult,
        authUserData: payload.authUserData,
      };

    case "AUTH_USER":
      return { ...state, loginResult: undefined, authUserData: payload };

    // case "ADD_TO_CART":
    //   return {
    //     ...state,
    //     authUserData: { ...state.authUserData, cart: payload },
    //   };

    // case "GET_CART_ITEMS":
    //   return { ...state, cartDetail: payload };

    case "REMOVE_CART_ITEMS":
      return {
        ...state,
        authUserData: { ...state.authUserData, cart: payload },
      };

    case "MODIFY_CART_QUANTITY":
      return {
        ...state,
        authUserData: { ...state.authUserData, cart: payload },
      };

    default:
      return state;
  }
};

export default userReducer;
