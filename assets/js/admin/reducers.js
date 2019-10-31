import { combineReducers } from "redux";

import globalFABReducer from "./slices/global-fab";
import categoriesReducer from "./slices/categories";
import tagsReducer from "./slices/tags";
import pushArticleReducer from "./slices/push-article";
import articlesReducer from "./slices/articles";

export default combineReducers({
  globalFAB: globalFABReducer,
  categories: categoriesReducer,
  tags: tagsReducer,
  pushArticle: pushArticleReducer,
  articles: articlesReducer
});
