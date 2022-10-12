let initialState = {
  loading: true,
  filteredRiceProductsData: {},
  filteredBreadProductsData: {},
  filteredTartProductsData: {},
};

const filteredProductReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_FILTERED_PRODUCTS_REQUEST":
      return { ...state };

    case "GET_FILTERED_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        filteredRiceProductsData: payload.filteredRiceProductJson.data,
        filteredBreadProductsData: payload.filteredBreadProductJson.data,
        filteredTartProductsData: payload.filteredTartProductJson.data,
      };

    default:
      return { ...state };
  }
};

export default filteredProductReducer;

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
