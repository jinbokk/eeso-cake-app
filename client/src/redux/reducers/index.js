import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import instagramReducer from "./instagramReducer";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  instagram: instagramReducer,
});

export default rootReducer;

