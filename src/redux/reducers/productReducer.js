let initialState = {
  loading: true,
  productsData: [],
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_PRODUCTS_REQUEST":
      return { ...state };

    case "GET_ANOTHER_PRODUCTS_REQUEST":
      return { ...state, loading: true };

    case "GET_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        productsData: [...state.productsData, ...payload.productsData],
      };

    default:
      return { ...state };
  }
};

export default productReducer;