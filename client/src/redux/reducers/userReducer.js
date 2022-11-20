let initialState = {
  registerResult: undefined,
  loginResult: undefined,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "REGISTER_USER":
      return { ...state, registerResult: payload };

    case "REGISTER_DONE":
      return { ...state, registerResult: undefined };

    case "LOGIN_USER":
      return { ...state, loginResult: payload };

    default:
      return { ...state };
  }
};

export default userReducer;
