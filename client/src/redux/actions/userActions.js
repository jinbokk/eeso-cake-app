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

function loginUser(body) {
  return async (dispatch) => {
    try {
      const loginResult = await axios
        .post("/api/users/login", body)
        .then((res) => {
          if (res.data.loginSuccess === false) {
            return alert(res.data.message);
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

      dispatch({
        type: "LOGIN_USER",
        payload: loginResult,
      });
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
            if (res.data.logoutSuccess === false) {
              return alert(res.data.message);
            } else {
              return res.data;
            }
          });

        if (logoutResult.logoutSuccess === true) {
          dispatch({
            type: "LOGOUT_USER",
            payload: {
              loginResult: undefined,
              authUserData: { isAuth: false },
            },
          });
          // window.location("/");
        }
      } else {
        return;
      }
    } catch (error) {
      alert("??????????????? ?????????????????????");
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
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function addToCart(productId, option) {
  let body = {
    productId: productId,
    option: option, //array ??????
    added: new Date().toLocaleString("ko-KR"),
  };

  return async (dispatch) => {
    try {
      // const addToCartResult = await axios
      await axios.post("/api/users/addToCart", body);
      //   .then((res) => {
      //     console.log("res:::::::::::", res);
      //     return res.data;
      //   });

      // dispatch({
      //   type: "ADD_TO_CART",
      //   payload: addToCartResult,
      // });
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function removeFromCart(productId) {
  return async (dispatch) => {
    try {
      const removeCartItemsResult = await axios
        .get(`/api/users/remove-from-cart?id=${productId}`)
        .then((res) => {
          // // productDetail??? cart ????????? ???????????? cartDetail??? ?????????
          // res.data.cart.forEach((cartItem) => {
          //   res.data.productDetail.forEach((productDetail, index) => {
          //     if (cartItem.id === productDetail._id) {
          //       res.data.productDetail[index].quantity = cartItem.quantity;
          //     }
          //   });
          // });
          return res.data;
        });

      dispatch({
        type: "REMOVE_CART_ITEMS",
        payload: removeCartItemsResult,
      });
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

function getCartItems(cartItems, userCart) {
  return async (dispatch) => {
    try {
      const getCartItemsResult = await axios
        .get(`/api/products/products-by-id?id=${cartItems}`)
        .then((res) => {
          // 1.cartItems?????? ???????????? ???????????? Product Collection?????? ????????????
          userCart.forEach((cartItem) => {
            res.data.forEach((productDetail, index) => {
              if (cartItem.id === productDetail._id) {
                // 2. Quantity ????????? ????????????.
                res.data[index].quantity = cartItem.quantity;
              }
            });
          });

          console.log(res.data);
          return res.data;
        });

      dispatch({
        type: "GET_CART_ITEMS",
        payload: getCartItemsResult,
      });
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

export const userActions = {
  registerUser,
  duplicateEmailCheck,
  loginUser,
  logoutUser,
  auth,
  addToCart,
  removeFromCart,
  getCartItems,
};
