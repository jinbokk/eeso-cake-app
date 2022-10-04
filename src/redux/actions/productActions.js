import api from "../api";

function getProducts() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_PRODUCTS_REQUEST" });

      const getAllProduct = api.get();
      const getRiceProduct = api.get("/rice");
      const getBreadProduct = api.get("/bread");
      const getTartProduct = api.get("/tart");

      const [
        allProductJson,
        riceProductJson,
        breadProductJson,
        tartProductJson,
      ] = await Promise.all([
        getAllProduct,
        getRiceProduct,
        getBreadProduct,
        getTartProduct,
      ]);

      dispatch({
        type: "GET_PRODUCT_SUCCESS",
        payload: {
          allProductJson: allProductJson,
          riceProductJson: riceProductJson,
          breadProductJson: breadProductJson,
          tartProductJson: tartProductJson,
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
