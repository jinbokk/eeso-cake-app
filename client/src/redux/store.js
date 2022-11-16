import * as actionCreators from "./actions/productActions";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 25,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

// ------- USING RTK..
// import { configureStore } from "@reduxjs/toolkit";

// import { getDefaultMiddleware } from "@reduxjs/toolkit";
// import rootReducer from "./reducers/index";

// const store = configureStore({
//   reducer: rootReducer,
//   // middleware: getDefaultMiddleware =>
//   // getDefaultMiddleware({
//   //   serializableCheck: false,
//   // }),
// });

// export default store;
