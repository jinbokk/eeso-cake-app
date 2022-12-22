import axios from "axios";

function registerUser(dataToSubmit) {
  return async (dispatch) => {
    try {
      const registerResult = await axios
        .post("/api/users/register", dataToSubmit)
        .then((res) => res.data);

      dispatch({
        type: "REGISTER_USER",
        payload: registerResult,
      });
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function loginUser(dataToSubmit) {
  return async (dispatch) => {
    try {
      const loginResult = await axios
        .post("/api/users/login", dataToSubmit)
        .then((res) => res.data);

      dispatch({
        type: "LOGIN_USER",
        payload: loginResult,
      });
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

// function logoutUser() {
//   const req = axios.get(`${USER_SERVER}/logout`).then((res) => res.data);

//   return {
//     type: LOGOUT_USER,
//     payload: req,
//   };
// }

function auth() {
  return async (dispatch) => {
    try {
      const authUserData = await axios
        .get("/api/users/auth")
        .then((res) => res.data);

      dispatch({
        type: "AUTH_USER",
        payload: authUserData,
      });
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function addToCart(productId) {
  console.log("productId:::::", productId);

  let body = {
    productId: productId,
  };

  return async (dispatch) => {
    try {
      const request = await axios
        .post("/api/users/addToCart", body)
        .then((res) => res.data);

      console.log("request::::", request);

      dispatch({
        type: "ADD_TO_CART",
        payload: request,
      });
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

export const userActions = {
  registerUser,
  loginUser,
  //   logoutUser,
  auth,
  addToCart,
};
