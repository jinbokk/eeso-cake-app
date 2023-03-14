import axios from "axios";

function registerUser(body) {
  return async (dispatch) => {
    try {
      const registerResult = await axios
        .post("/api/users/register", body)
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

function unregisterUser(body) {
  return async (dispatch) => {
    try {
      const unregisterResult = await axios
        .post("/api/users/unregister", body)
        .then((res) => res.data);

      console.log("unregisterResult", unregisterResult);

      return unregisterResult;

      // if (!unregisterResult.unregisterResult) {
      //   alert(unregisterResult.message);
      //   return unregisterResult;
      // } else {
      //   alert("회원 탈퇴에 성공하였습니다");
      //   return unregisterResult;
      // dispatch({
      //   type: "UNREGISTER_USER",
      //   payload: unregisterResult,
      // });
      // }
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function editUser(body) {
  return async (dispatch) => {
    try {
      const registerResult = await axios
        .post("/api/users/edit", body)
        .then((res) => res.data);

      dispatch({
        type: "EDIT_USER",
        payload: registerResult,
      });

      return registerResult;
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function duplicateEmailCheck(email) {
  let body = {
    email: email,
  };

  return async (dispatch) => {
    try {
      const emailCheckResult = await axios
        .get(`/api/users/register/email-check/${email}`, body)
        .then((res) => res.data);

      return emailCheckResult;
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function duplicatePhoneNumberCheck(phoneNumber) {
  let body = {
    phoneNumber: phoneNumber,
  };

  return async (dispatch) => {
    try {
      const phoneNumberCheckResult = await axios
        .get(`/api/users/register/phoneNumber-check/${phoneNumber}`, body)
        .then((res) => res.data);

      return phoneNumberCheckResult;
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function loginUser(body) {
  return async (dispatch) => {
    try {
      const loginResult = await axios
        .post("/api/users/login", body)
        .then((res) => {
          if (res.data.loginSuccess === false) {
            return res.data;
          } else {
            if (body.rememberMe.activeRememberMe) {
              window.localStorage.setItem(
                "rememberEmail",
                body.rememberMe.email
              );
              return res.data;
            } else {
              window.localStorage.removeItem("rememberEmail");
              return res.data;
            }
          }
        });

      return loginResult;
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function logoutUser(confirm) {
  return async (dispatch) => {
    try {
      if (confirm) {
        const logoutResult = await axios
          .get("/api/users/logout")
          .then((res) => {
            return res.data;
          });

        return logoutResult;
      } else {
        return;
      }
    } catch (error) {
      alert("로그아웃에 실패하였습니다");
      console.log("error occurred : ", error);
    }
  };
}

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

      return authUserData;
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function addToCart(createdOption) {
  let body = {
    createdOption: createdOption,
  };

  return async (dispatch) => {
    try {
      return await axios.post("/api/users/addToCart", body).then((res) => {
        return res.data;
      });
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function removeFromCart(checkedCartIds) {
  let body = {
    checkedCartIds: checkedCartIds,
  };

  return async () => {
    try {
      await axios.post(`/api/users/remove-from-cart`, body);
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function increaseQuantity(cartId) {
  return async (dispatch) => {
    try {
      const increaseQuantityResult = await axios
        .post(`/api/users/increaseQuantity?id=${cartId}`)
        .then((res) => {
          return res.data;
        });

      dispatch({
        type: "MODIFY_CART",
        payload: increaseQuantityResult,
      });
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function decreaseQuantity(cartId) {
  return async (dispatch) => {
    try {
      const decreaseQuantityResult = await axios
        .post(`/api/users/decreaseQuantity?id=${cartId}`)
        .then((res) => {
          return res.data;
        });

      dispatch({
        type: "MODIFY_CART",
        payload: decreaseQuantityResult,
      });
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function orderComplete(body) {
  return async (dispatch) => {
    try {
      const orderCompleteResult = await axios
        .post("/api/users/order-complete", body)
        .then((res) => {
          return res.data;
        });

      return orderCompleteResult;
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function orderCancel(body) {
  return async (dispatch) => {
    try {
      const orderCancelResult = await axios
        .post("/api/users/order-cancel", body)
        .then((res) => {
          return res.data;
        });

      return orderCancelResult;
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function searchHistory(dateRange) {
  return async (dispatch) => {
    try {
      const searchHistoryResult = await axios.get(
        `/api/users/search-history?start=${dateRange.start}&end=${dateRange.end}`
      );

      return searchHistoryResult;
    } catch (error) {}
  };
}

export const userActions = {
  registerUser,
  unregisterUser,
  editUser,
  duplicateEmailCheck,
  duplicatePhoneNumberCheck,
  loginUser,
  logoutUser,
  auth,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  orderComplete,
  orderCancel,
  searchHistory,
  // paymentWebhook,
};
