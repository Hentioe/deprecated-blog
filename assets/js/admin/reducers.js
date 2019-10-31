import { combineReducers } from "redux";

import globalFABReducer from "./slices/global-fab";
import categoriesReducer from "./slices/categories";
import tagsReducer from "./slices/tags";

export default combineReducers({
  globalFAB: globalFABReducer,
  categories: categoriesReducer,
  tags: tagsReducer
});
