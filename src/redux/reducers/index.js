import { combineReducers } from "redux";
import productReducer from "./productReducer";
import filteredProductReducer from "./filteredProductReducer";
import instagramReducer from "./instagramReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // reducer 중에 "특정" reducer만 localstorage에 저장합니다.
  // whitelist: ["특정"]
  // blacklist의 경우, 그것만 제외합니다
};

export const rootReducer = combineReducers({
  product: productReducer,
  filteredProduct: filteredProductReducer,
  instagram: instagramReducer,
});

export default persistReducer(persistConfig, rootReducer);
