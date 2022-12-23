import axios from "axios";

function getForSaleProducts() {
  return async (dispatch) => {
    dispatch({ type: "GET_FORSALE_PRODUCTS_REQUEST" });

    axios.get(`/api/products/order/list`).then((res) => {
      dispatch({
        type: "GET_FORSALE_PRODUCTS_SUCCESS",
        payload: {
          forSale_productsData: res.data.docs,
        },
      });
    });
  };
}

function getDetail(productId) {
  return async (dispatch) => {
    dispatch({ type: "GET_DETAIL_REQUEST" });

    axios.get(`/api/products/order/list/detail/${productId}`).then((res) => {
      if (!res.data) {
        return alert("상품 정보를 가져오는데 실패하였습니다.");
      }

      dispatch({
        type: "GET_DETAIL_SUCCESS",
        payload: {
          productDetail: res.data,
        },
      });
    });
  };
}

export const forSaleProductActions = {
  getForSaleProducts,
  getDetail,
};
