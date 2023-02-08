let initialState = {
  registerResult: undefined,
  unregisterResult: undefined,
  loginResult: undefined,
  authUserData: undefined,
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

    case "MODIFY_CART_QUANTITY":
      return {
        ...state,
        authUserData: { ...state.authUserData, cart: payload },
      };

    case "MODIFY_SELECTED_CART":
      return {
        ...state,
        authUserData: {
          ...state.authUserData,
          checkedCartIds: payload,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
