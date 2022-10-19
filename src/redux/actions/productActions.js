import api_eesocake from "../api_eesocake";

function getProducts(ingredient, pageNum) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_PRODUCTS_REQUEST" });

      const productsJson = await api_eesocake.get(
        `/${ingredient}?page=${pageNum || 1}`
      );

      dispatch({
        type: "GET_PRODUCT_SUCCESS",
        payload: {
          productsData: productsJson.data.results,
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
