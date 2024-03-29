//we'll have multiple reducers and redux can help combine them
import { combineReducers } from "redux";

import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { couponReducer } from "./couponReducer";
import { cashOnDeliveryReducer } from "./cashOnDeliveryReducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  cashOnDelivery: cashOnDeliveryReducer,
});

export default rootReducer;
