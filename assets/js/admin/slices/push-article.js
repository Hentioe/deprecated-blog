import { createSlice } from "redux-starter-kit";
import {apiError, failureAction} from "../lib/error";

const initialState = {
  isLoaded: true,
  isPushing: false,
  apiError,
  article: {
    title: "",
    slug: "",
    content: "",
    category_id: 0,
    comment_permissions: 0
  }
};

const pushArticle = createSlice({
  name: "pushArticle",
  initialState,
  reducers: {
    failure: failureAction,
    requestArticle: state =>
      Object.assign({}, state, {
        isLoaded: false,
        isPushing: false,
        apiError,
        article: {
          title: "加载中……",
          slug: "loading...",
          content: "文字内容加载中……",
          category_id: 0
        }
      }),
    receiveArticle: (state, action) =>
      Object.assign({}, state, {
        isLoaded: true,
        article: action.payload
      }),
    pushingArticle: state => Object.assign({}, state, { isPushing: true }),
    pushedArticle: (state, action) =>
      Object.assign({}, state, { isPushing: false, article: action.payload })
  }
});

export const {
  failure,
  requestArticle,
  receiveArticle,
  pushingArticle,
  pushedArticle
} = pushArticle.actions;

export default pushArticle.reducer;
