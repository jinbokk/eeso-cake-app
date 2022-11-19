import axios from "axios";
// import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types";
// import { USER_SERVER } from "../components/Config.js";

// function registerUser(dataToSubmit) {
//   const req = axios
//     .post(`${USER_SERVER}/register`, dataToSubmit)
//     .then((res) => res.data);

//   return {
//     type: REGISTER_USER,
//     payload: req,
//   };
// }

function loginUser(dataToSubmit) {
  return async (dispatch) => {
    try {
      const login_result = await axios
        .post("/api/users/login", dataToSubmit)
        .then((res) => res.data);

      dispatch({
        type: "LOGIN_USER",
        payload: login_result,
      });
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

// redux-promise middleware를 사용해야 하는데, redux-thunk로 Promise 객체 비동기처리 다 가능하여 필요 없을 듯?
// function loginUser(dataToSubmit) {
//   try {
//     console.log(dataToSubmit);

//     const req = axios
//       .post("/api/users/login", dataToSubmit)
//       .then((res) => res.data);

//     console.log(req);

//     return {
//       type: "LOGIN_USER",
//       payload: req,
//     };
//   } catch (error) {
//     console.log("error occurred : ", error);
//   }
// }

// function auth() {
//   const req = axios.get(`${USER_SERVER}/auth`).then((res) => res.data);

//   return {
//     type: AUTH_USER,
//     payload: req,
//   };
// }

// function logoutUser() {
//   const req = axios.get(`${USER_SERVER}/logout`).then((res) => res.data);

//   return {
//     type: LOGOUT_USER,
//     payload: req,
//   };
// }

export const userActions = {
  //   registerUser,
  loginUser,
  //   auth,
  //   logoutUser,
};
