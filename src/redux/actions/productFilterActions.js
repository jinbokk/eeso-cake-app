import api from "../api";

function getFilteredProducts(design) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_FILTERED_PRODUCTS_REQUEST" });

      const getFilteredRiceProduct = api.get(`/rice?design=${design}`);
      const getFilteredBreadProduct = api.get(`/bread?design=${design}`);
      const getFilteredTartProduct = api.get(`/tart?design=${design}`);

      const [
        filteredRiceProductJson,
        filteredBreadProductJson,
        filteredTartProductJson,
      ] = await Promise.all([
        getFilteredRiceProduct,
        getFilteredBreadProduct,
        getFilteredTartProduct,
      ]);

      dispatch({
        type: "GET_FILTERED_PRODUCT_SUCCESS",
        payload: {
          filteredRiceProductJson: filteredRiceProductJson,
          filteredBreadProductJson: filteredBreadProductJson,
          filteredTartProductJson: filteredTartProductJson,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_FILTERED_PRODUCTS_FAILURE", payload: { error } });
    }
  };
}

export const productFilterActions = {
  getFilteredProducts,
};
