import api from "../api";

function getProducts() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_PRODUCTS_REQUEST" });

      const getAllProduct = await api.get();

      console.log("getAllProductData", getAllProduct);

      dispatch({
        type: "GET_PRODUCT_SUCCESS",
        payload: {
          AllProductJson: getAllProduct,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_PRODUCTS_FAILURE", payload: { error } });
    }
  };
}

export const productAction = {
  getProducts,
};

// ------- USING RTK..
// import api from "../api";
// import { productActions } from "../reducers/productReducer";

// function getProducts() {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: "GET_PRODUCTS_REQUEST" });

//       const data = await api.get().data;

//       dispatch(productActions.getAllProducts({ data }));
//       // dispatch({
//       //   type: "GET_PRODUCT_SUCCESS",
//       //   payload: {
//       //     AllProductJson: getAllProduct,
//       //   },
//       // });
//     } catch (error) {
//       // dispatch({ type: "GET_PRODUCTS_FAILURE", payload: { error } });
//     }
//   };
// }

// export const productAction = {
//   getProducts,
// };
