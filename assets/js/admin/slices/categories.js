import { createSlice } from "redux-starter-kit";
import failureAction from "../lib/error";

const apiError = {
  type: null,
  errors: null
};

const initialState = {
  isCompleted: true,
  isCreating: false,
  isUpdating: false,
  deletingAt: 0,
  apiError,
  items: []
};

const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    requestCategories: state =>
      Object.assign({}, state, {
        isCompleted: false,
        items: [
          {
            id: 0,
            name: "加载中……",
            slug: "loading…",
            description: "正在加载类别列表……"
          }
        ]
      }),
    receiveCategories: (state, action) =>
      Object.assign({}, state, {
        isCompleted: true,
        items: action.payload
      }),
    failure: failureAction,
    creatingCategory: state => Object.assign({}, state, { isCreating: true }),
    createdCategory: (state, action) => {
      let items = [...state.items];
      items.push(action.payload);
      return Object.assign({}, state, { isCreating: false, items });
    },
    updatingCategory: state => Object.assign({}, state, { isUpdating: true }),
    updatedCategory: (state, action) => {
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
    deletingCategory: state =>
      Object.assign({}, state, { deletingAt: 0 }),
    deletedCategory: (state, action) => {
      let items = [...state.items];
      let index = 0;
      items.forEach((item, i) => {
        if (item.id === action.payload.id) {
          index = i;
        }
      });
      delete items[index];

      return Object.assign({}, state, { deletingAt: 0, items });
    }
  }
});

export const {
  requestCategories,
  receiveCategories,
  creatingCategory,
  createdCategory,
  updatingCategory,
  updatedCategory,
  deletingCategory,
  deletedCategory,
  failure
} = categories.actions;

export default categories.reducer;
