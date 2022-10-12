let initialState = {
  loading: true,
  allProductsData: {},
  riceProductsData: {},
  breadProductsData: {},
  tartProductsData: {},
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_PRODUCTS_REQUEST":
      return { ...state };

    case "GET_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        allProductsData: payload.allProductJson.data,
        riceProductsData: payload.riceProductJson.data,
        breadProductsData: payload.breadProductJson.data,
        tartProductsData: payload.tartProductJson.data,
      };

    default:
      return { ...state };
  }
};

export default productReducer;

// ------- USING RTK..
// import { createSlice } from "@reduxjs/toolkit";

// let initialState = {
//   AllProductsData: {},
// };

// const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     getAllProducts(state, action) {
//       state.AllProductsData = action.payload.data;
//     },
//   },
// });
// /// NO MORE "return , ...state" !!!

// export const productActions = productSlice.actions;

// export default productSlice.reducer;
