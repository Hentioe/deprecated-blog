import { createSlice } from "redux-starter-kit";

const initialState = {
  isCompleted: true,
  isCreating: false,
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
    creatingCategory: state => Object.assign({}, state, { isCreating: true }),
    createdCategory: (state, action) => {
      let items = [...state.items]
      items.push(action.payload);
      return Object.assign({}, state, { isCreating: false, items });
    }
  }
});

export const {
  requestCategories,
  receiveCategories,
  creatingCategory,
  createdCategory
} = categories.actions;

export default categories.reducer;
