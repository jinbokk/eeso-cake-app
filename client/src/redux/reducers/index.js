import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import forSaleProductReducer from "./forSaleProductReducer";
import instagramReducer from "./instagramReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  forSaleProduct: forSaleProductReducer,
  order: orderReducer,
  instagram: instagramReducer,
});

export default rootReducer;
