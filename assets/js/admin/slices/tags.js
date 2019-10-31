import { createSlice } from "redux-starter-kit";
import {apiError, failureAction} from "../lib/error";

const initialState = {
  isLoaded: true,
  isCreating: false,
  isUpdating: false,
  deletingAt: 0,
  apiError,
  items: []
};

const tags = createSlice({
  name: "tags",
  initialState,
  reducers: {
    requestTags: state =>
      Object.assign({}, state, {
        isLoaded: false,
        items: [
          {
            id: 0,
            name: "加载中……",
            slug: "loading…",
            description: "正在加载标签列表……"
          }
        ]
      }),
    receiveTags: (state, action) =>
      Object.assign({}, state, {
        isLoaded: true,
        items: action.payload
      }),
    failure: failureAction,
    creatingTag: state => Object.assign({}, state, { isCreating: true }),
    createdTag: (state, action) => {
      let items = [...state.items];
      items.push(action.payload);
      return Object.assign({}, state, { isCreating: false, items });
    },
    updatingTag: state => Object.assign({}, state, { isUpdating: true }),
    updatedTag: (state, action) => {
      let items = [...state.items];
      let index = 0;
      items.forEach((item, i) => {
        if (item.id === action.payload.id) {
          index = i;
        }
      });
      items[index] = action.payload;

      return Object.assign({}, state, { isCreating: false, items });
    },
    deletingTag: (state, action) =>
      Object.assign({}, state, { deletingAt: action.payload }),
    deletedTag: (state, action) => {
      let items = [...state.items];
      let index = 0;
      items.forEach((item, i) => {
        if (item.id === action.payload.id) {
          index = i;
        }
      });
      items.splice(index, 1);

      return Object.assign({}, state, { deletingAt: 0, items });
    }
  }
});

export const {
  requestTags,
  receiveTags,
  creatingTag,
  createdTag,
  updatingTag,
  updatedTag,
  deletingTag,
  deletedTag,
  failure
} = tags.actions;

export default tags.reducer;
