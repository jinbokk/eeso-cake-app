let initialState = {
  loginResult: undefined,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN_USER":
      return { ...state, loginResult: payload };

    default:
      return { ...state };
  }
};

export default userReducer;
