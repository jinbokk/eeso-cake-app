import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import instagramReducer from "./instagramReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // reducer 중에 "특정" reducer만 localstorage에 저장합니다.
  // whitelist: ["특정"]
  whitelist: ["userReducer"],
  // blacklist의 경우, 그것만 제외합니다
  blacklist: ["productReducer", "instagramReducer"],
};

export const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  instagram: instagramReducer,
});

export default persistReducer(persistConfig, rootReducer);
