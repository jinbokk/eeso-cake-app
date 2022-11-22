let initialState = {
  registerResult: undefined,
  loginResult: undefined,
  authUserData: undefined,
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

    default:
      return state;
  }
};

export default userReducer;
