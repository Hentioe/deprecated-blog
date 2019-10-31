import { combineReducers } from "redux";

import globalFABReducer from "./slices/global-fab";
import categoriesReducer from "./slices/categories";

export default combineReducers({ globalFAB: globalFABReducer, categories: categoriesReducer });
