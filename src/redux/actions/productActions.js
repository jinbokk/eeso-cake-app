import api_eesocake from "../api_eesocake";

function getProducts(ingredient, pageNum) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_PRODUCTS_REQUEST" });

      await api_eesocake
        .get(`/${ingredient}?page=${pageNum || 1}`)
        .then((res) => {
          dispatch({
            type: "GET_PRODUCTS_SUCCESS",
            payload: {
              ingredient: ingredient,
              productsData: res.data.results,
              pageNum: res.data.page,
            },
          });

          if (res.data.next) {
            dispatch({
              type: "HAS_MORE_PRODUCTS",
              payload: {
                hasMore: true,
              },
            });
          } else {
            dispatch({
              type: "NO_MORE_PRODUCT",
              payload: {
                hasMore: true,
              },
            });
          }
        });
    } catch (error) {
      console.log("error occurred : ", error);
    }
  };
}

export const productActions = {
  getProducts,
};
