import axios from "axios";

function getProducts(option) {
  return async (dispatch) => {
    dispatch({ type: "GET_PRODUCTS_REQUEST" });

    axios
      .get(
        `/api/products/cakes/${option.ingredient}${
          option.design ? `?design=${option.design}` : ""
        }`
      )
      .then((res) => {

        let hasMore;

        if (res.data.hasNextPage) {
          hasMore = true;
        }

        dispatch({
          type: "GET_PRODUCTS_SUCCESS",
          payload: {
            productsData: res.data.docs,
            hasMore: hasMore,
          },
        });
      });
  };
}

function getMoreProducts(option) {
  return async (dispatch) => {
    dispatch({ type: "GET_MORE_PRODUCTS_REQUEST" });

    axios
      .get(
        `/api/products/cakes/${option.ingredient}${
          option.design ? `?design=${option.design}` : ""
        }${
          option.design && option.page
            ? `&page=${option.page}`
            : `?page=${option.page}`
        }`
      )
      .then((res) => {
        let hasMore;

        if (res.data.hasNextPage) {
          hasMore = true;
        }

        dispatch({
          type: "GET_MORE_PRODUCTS_SUCCESS",
          payload: {
            productsData: res.data.docs,
            hasMore: hasMore,
          },
        });
      });
  };
}

export const productActions = {
  getProducts,
  getMoreProducts,
};
