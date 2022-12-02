let initialState = {
  loading: true,
  forSale_productsData: [],
  productDetail: {},
};

const forSaleProductReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_FORSALE_PRODUCTS_REQUEST":
      return { ...state };

    case "GET_FORSALE_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        forSale_productsData: [...payload.forSale_productsData],
      };

    case "GET_DETAIL_REQUEST":
      return { ...state };

    case "GET_DETAIL_SUCCESS":
      return {
        ...state,
        loading: false,
        productDetail: payload.productDetail,
      };

    default:
      return state;
  }
};

export default forSaleProductReducer;
