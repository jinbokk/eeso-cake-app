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
        console.log("res.data:::::", res.data);

        let hasMore;

        if (res.data.hasNextPage) {
          hasMore = true;
          console.log("hasMore!");
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
        console.log("res.data:::::", res.data);

        let hasMore;

        if (res.data.hasNextPage) {
          console.log("hasMore!");
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

// function getAllProducts() {
//   return async (dispatch) => {
//     try {
//       const getRiceCakeData = api_eesocake.get(`/rice?page=1`);
//       const getBreadCakeData = api_eesocake.get(`/bread?page=1`);
//       const getTartCakeData = api_eesocake.get(`/tart?page=1`);

//       const [riceCakeJson, breadCakeJson, tartCakeJson] = await Promise.all([
//         getRiceCakeData,
//         getBreadCakeData,
//         getTartCakeData,
//       ]);

//       dispatch({
//         type: "GET_ALL_PRODUCTS_SUCCESS",
//         payload: {
//           allProductsData: [
//             ...riceCakeJson.data.results,
//             ...breadCakeJson.data.results,
//             ...tartCakeJson.data.results,
//           ].sort(() => Math.random() - 0.5),
//         },
//       });
//     } catch (error) {
//       console.log("error occurred : ", error);
//     }
//   };
// }

// function getProducts({ options }) {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: "GET_PRODUCTS_REQUEST" });

//       await api_eesocake
//         .get(
//           `/${options.ingredient}?page=${options.pageNum || 1}${
//             options.designParams ? `&design=${options.designParams}` : ""
//           }`
//         )

//         .then((res) => {
//           dispatch({
//             type: "GET_PRODUCTS_SUCCESS",
//             payload: {
//               ingredient: options.ingredient,
//               productsData: res.data.results,
//               pageNum: res.data.page,
//               design: options.designParams,
//             },
//           });

//           if (res.data.next) {
//             dispatch({
//               type: "HAS_MORE_PRODUCTS",
//               payload: {
//                 hasMore: true,
//               },
//             });
//           } else {
//             dispatch({
//               type: "NO_MORE_PRODUCT",
//               payload: {
//                 hasMore: true,
//               },
//             });
//           }
//         });
//     } catch (error) {
//       console.log("error occurred : ", error);
//     }
//   };
// }

// function getAnotherProducts({ options }) {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: "GET_ANOTHER_PRODUCTS_REQUEST" });

//       await api_eesocake
//         .get(
//           `/${options.ingredient}?page=1${
//             options.designParams ? `&design=${options.designParams}` : ""
//           }`
//         )

//         .then((res) => {
//           dispatch({
//             type: "GET_ANOTHER_PRODUCTS_SUCCESS",
//             payload: {
//               ingredient: options.ingredient,
//               productsData: res.data.results,
//               pageNum: res.data.page,
//               design: options.designParams,
//             },
//           });

//           if (res.data.next) {
//             dispatch({
//               type: "HAS_MORE_PRODUCTS",
//               payload: {
//                 hasMore: true,
//               },
//             });
//           } else {
//             dispatch({
//               type: "NO_MORE_PRODUCT",
//               payload: {
//                 hasMore: true,
//               },
//             });
//           }
//         });
//     } catch (error) {
//       console.log("error occurred : ", error);
//     }
//   };
// }

export const productActions = {
  getProducts,
  getMoreProducts,
};
