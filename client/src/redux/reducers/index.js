import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import forSaleProductReducer from "./forSaleProductReducer";
import instagramReducer from "./instagramReducer";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  forSaleProduct: forSaleProductReducer,
  instagram: instagramReducer,
});

export default rootReducer;
