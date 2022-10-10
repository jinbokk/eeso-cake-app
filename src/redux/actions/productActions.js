import api_eesocake from "../api_eesocake";

function getProducts() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_PRODUCTS_REQUEST" });

      const getAllProduct = api_eesocake.get();
      const getRiceProduct = api_eesocake.get("/rice");
      const getBreadProduct = api_eesocake.get("/bread");
      const getTartProduct = api_eesocake.get("/tart");

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
