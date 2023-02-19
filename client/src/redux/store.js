import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import storageSession from "redux-persist/lib/storage/session";
import persistReducer from "redux-persist/es/persistReducer";

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const persistConfig = {
  key: "user",
  version: 1,
  // sessionStorage에 저장합니다.
  storage: storageSession,
  // reducer 중에 "특정" reducer만 sessionstorage에 저장합니다.
  // whitelist: ["특정"]
  whitelist: ["user"],
  // blacklist의 경우, 그것만 제외합니다
  // blacklist: ["product", "instagram"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(thunk))
    : composeEnhancers(applyMiddleware(thunk));

const store = createStore(persistedReducer, enhancer);

export default store;
