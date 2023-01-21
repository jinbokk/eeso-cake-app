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

      if (!unregisterResult.unregisterResult) {
        alert(unregisterResult.message);
      } else {
        dispatch({
          type: "UNREGISTER_USER",
          payload: unregisterResult,
        });
      }
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
          window.location.assign("/");
          return;
        }
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
      const addToCartResult = await axios
        .post("/api/users/addToCart", body)
        .then((res) => {
          console.log("res:::::::::::;", res);
          return res.data;
        });

      dispatch({
        type: "ADD_TO_CART",
      });
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
          // // productDetail과 cart 정보를 조합하여 cartDetail을 만든다
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

// function getCartItems(cartItems, userCart) {
//   return async (dispatch) => {
//     try {
//       const getCartItemsResult = await axios
//         .get(`/api/products/products-by-id?id=${cartItems}`)
//         .then((res) => {
//           // 1.cartItems들에 해당하는 정보들을 Product Collection에서 가져온다
//           userCart.forEach((cartItem) => {
//             res.data.forEach((productDetail, index) => {
//               if (cartItem.id === productDetail._id) {
//                 // 2. Quantity 정보를 넣어준다.
//                 res.data[index].quantity = cartItem.quantity;
//               }
//             });
//           });

//           console.log(res.data);
//           return res.data;
//         });

//       dispatch({
//         type: "GET_CART_ITEMS",
//         payload: getCartItemsResult,
//       });
//     } catch (error) {
//       console.log("error occurred : ", error);
//     }
//   };
// }

function increaseQuantity(cartId) {
  return async (dispatch) => {
    try {
      const increaseQuantityResult = await axios
        .post(`/api/users/increaseQuantity?id=${cartId}`)
        .then((res) => {
          return res.data;
        });

      dispatch({
        type: "MODIFY_CART_QUANTITY",
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
          console.log(res.data);
          return res.data;
        });

      dispatch({
        type: "MODIFY_CART_QUANTITY",
        payload: decreaseQuantityResult,
      });
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

export const userActions = {
  registerUser,
  unregisterUser,
  duplicateEmailCheck,
  duplicatePhoneNumberCheck,
  loginUser,
  logoutUser,
  auth,
  addToCart,
  removeFromCart,
  // getCartItems,
  increaseQuantity,
  decreaseQuantity,
};
