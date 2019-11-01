import { createSlice } from "redux-starter-kit";
import { apiError, failureAction } from "../lib/error";

const initialState = {
  isLoaded: true,
  isChanging: false,
  apiError,
  items: []
};

const articles = createSlice({
  name: "articles",
  initialState,
  reducers: {
    failure: failureAction,
    requestArticles: state =>
      Object.assign({}, state, {
        isLoaded: false,
        items: [
          {
            id: 0,
            title: "加载中……",
            slug: "loading...",
            content: "",
            category_id: 0,
            comment_permissions: 0,
            category: { name: "加载中…" }
          }
        ]
      }),
    receiveArticles: (state, action) =>
      Object.assign({}, state, {
        isLoaded: true,
        items: action.payload
      }),
    changingArticles: state => Object.assign({}, state, { isChanging: true }),
    changedArticles: state => Object.assign({}, state, { isChanging: false })
  }
});

export const {
  failure,
  requestArticles,
  receiveArticles,
  changingArticles,
  changedArticles
} = articles.actions;

export default articles.reducer;
