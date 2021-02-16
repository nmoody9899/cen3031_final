//we'll have multiple reducers and redux can help combine them
import { combineReducers } from "redux";

import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
