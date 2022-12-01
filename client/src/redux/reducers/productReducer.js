let initialState = {
  loading: true,
  moreCakesLoading: false,
  ingredient: null,
  productsData: [],
  pageNum: 1,
  hasMore: false,
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_PRODUCTS_REQUEST":
      return { ...state };

    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        ingredient: payload.ingredient,
        productsData: [...payload.productsData],
        pageNum: payload.pageNum,
        hasMore: payload.hasMore,
      };

    case "GET_MORE_PRODUCTS_REQUEST":
      return { ...state };

    case "GET_MORE_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        ingredient: payload.ingredient,
        productsData: [...state.productsData, ...payload.productsData],
        pageNum: payload.pageNum,
        hasMore: payload.hasMore,
      };

    case "GET_FORSALE_PRODUCTS_REQUEST":
      return { ...state };

    case "GET_FORSALE_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        ingredient: payload.ingredient,
        productsData: [...payload.productsData],
        pageNum: payload.pageNum,
        hasMore: payload.hasMore,
      };

    default:
      return state;
  }
};

export default productReducer;
