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

    case "GET_ANOTHER_PRODUCTS_REQUEST":
      return { ...state, loading: true, productsData: [], pageNum: 1 };

    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        ingredient: payload.ingredient,
        productsData: [...state.productsData, ...payload.productsData],
        pageNum: payload.pageNum,
      };

    case "HAS_MORE_PRODUCTS":
      return {
        ...state,
        hasMore: payload.hasMore,
        moreCakesLoading: true,
      };

    case "NO_MORE_PRODUCT":
      return {
        ...state,
        hasMore: false,
        moreCakesLoading: false,
      };

    default:
      return { ...state };
  }
};

export default productReducer;
