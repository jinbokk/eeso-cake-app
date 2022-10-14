import api_eesocake from "../api_eesocake";

function getProducts(ingredient, pageNum) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_PRODUCTS_REQUEST" });

      const ProductsJson = await api_eesocake.get(
        `/${ingredient}?page=${pageNum}`
      );

      dispatch({
        type: "GET_PRODUCT_SUCCESS",
        payload: {
          ProductsJson: ProductsJson,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_PRODUCTS_FAILURE", payload: { error } });
    }
  };
}

export const productActions = {
  getProducts,
};

// ------- USING RTK..
// import api_eesocake from "../api_eesocake";
// import { productActions } from "../reducers/productReducer";

// function getProducts() {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: "GET_PRODUCTS_REQUEST" });

//       const data = await api_eesocake.get().data;

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

// export const productActions = {
//   getProducts,
// };
