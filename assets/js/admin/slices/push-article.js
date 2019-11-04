import { createSlice } from "redux-starter-kit";
import { apiError, buildFailure } from "../lib/error";

const initialState = {
  isLoaded: true,
  isPushing: false,
  isPreviewing: false,
  apiError,
  article: {
    title: "",
    slug: "",
    content: "",
    tags: [],
    category_id: 0,
    comment_permissions: 0
  },
  preview: ""
};

const pushArticle = createSlice({
  name: "pushArticle",
  initialState,
  reducers: {
    failure: buildFailure({ isPushing: false }),
    requestArticle: state =>
      Object.assign({}, state, {
        isLoaded: false,
        isPushing: false,
        apiError,
        article: {
          title: "加载中……",
          slug: "loading...",
          content: "文字内容加载中……",
          tags: [],
          category_id: 0,
          comment_permissions: 0
        }
      }),
    receiveArticle: (state, action) =>
      Object.assign({}, state, {
        isLoaded: true,
        article: action.payload
      }),
    pushingArticle: state => Object.assign({}, state, { isPushing: true }),
    pushedArticle: (state, action) =>
      Object.assign({}, state, { isPushing: false, article: action.payload }),
    requestPreview: state => Object.assign({}, state, { isPreviewing: true }),
    receivePreview: (state, action) =>
      Object.assign({}, state, {
        isPreviewing: false,
        preview: action.payload.html
      })
  }
});

export const {
  failure,
  requestArticle,
  receiveArticle,
  pushingArticle,
  pushedArticle,
  requestPreview,
  receivePreview
} = pushArticle.actions;

export default pushArticle.reducer;
