let initialState = {
  registerResult: undefined,
  loginResult: undefined,
  authUserData: undefined,
  cart: undefined,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "REGISTER_USER":
      return { ...state, registerResult: payload };

    case "LOGIN_USER":
      return { ...state, loginResult: payload };

    case "AUTH_USER":
      return { ...state, authUserData: payload };

    case "ADD_TO_CART":
      return { ...state, cart: payload };

    default:
      return state;
  }
};

export default userReducer;
