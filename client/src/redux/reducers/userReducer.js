let initialState = {
  registerResult: undefined,
  unregisterResult: undefined,
  loginResult: undefined,
  authUserData: undefined,
  // loading: true,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "REGISTER_USER":
      return { ...state, registerResult: payload };

    case "UNREGISTER_USER":
      return { ...state, loginResult: undefined, unregisterResult: payload };

    // case "LOGIN_USER":
    //   return { ...state, loginResult: payload };

    // case "LOGOUT_USER":
    //   return {
    //     ...state,
    //     loginResult: payload.loginResult,
    //     authUserData: payload.authUserData,
    //   };

    case "TOKEN_EXPIRED":
      return {
        ...state,
        authUserData: {
          isAuth: false,
          err: null,
        },
      };

    case "AUTH_USER":
      return {
        ...state,
        loginResult: undefined,
        // loading: false,
        authUserData: payload,
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
