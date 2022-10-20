import api_eesocake from "../api_eesocake";

function getProducts({ options }) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_PRODUCTS_REQUEST" });

      await api_eesocake
        .get(
          `/${options.ingredient}?page=${options.pageNum || 1}${
            options.designParams ? `&design=${options.designParams}` : ""
          }`
        )

        .then((res) => {
          dispatch({
            type: "GET_PRODUCTS_SUCCESS",
            payload: {
              ingredient: options.ingredient,
              productsData: res.data.results,
              pageNum: res.data.page,
              design: options.designParams,
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

function getAnotherProducts({ options }) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_ANOTHER_PRODUCTS_REQUEST" });

      await api_eesocake
        .get(
          `/${options.ingredient}?page=1${
            options.designParams ? `&design=${options.designParams}` : ""
          }`
        )

        .then((res) => {
          dispatch({
            type: "GET_ANOTHER_PRODUCTS_SUCCESS",
            payload: {
              ingredient: options.ingredient,
              productsData: res.data.results,
              pageNum: res.data.page,
              design: options.designParams,
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
  getAnotherProducts,
};
