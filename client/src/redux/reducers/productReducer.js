let initialState = {
  loading: true,
  moreCakesLoading: false,
  ingredient: null,
  productsData: [],
  forSale_productsData: [],
  pageNum: 1,
  hasMore: false,
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_PRODUCTS_REQUEST":
      return { ...state, loading: true, productsData: [] };

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
      return { ...state, moreCakesLoading: true };

    case "GET_MORE_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        ingredient: payload.ingredient,
        productsData: [...state.productsData, ...payload.productsData],
        pageNum: payload.pageNum,
        hasMore: payload.hasMore,
        moreCakesLoading: false,
      };

    default:
      return state;
  }
};

export default productReducer;
