import { combineReducers } from "redux";
import {
  SHOW_GLOBAL_FAB,
  HIDDEN_GLOBAL_FAB,
  OPEN_GLOBAL_FAB,
  CLOSE_GLOBAL_FAB,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  CREATING_CATEGORY,
  CREATED_CATEGORY
} from "./actions";

const initialFABState = {
  visibility: "visible",
  opened: false
};

function globalFAB(state = initialFABState, action) {
  switch (action.type) {
    case SHOW_GLOBAL_FAB:
      return Object.assign({}, state, { visibility: "visible" });
    case HIDDEN_GLOBAL_FAB:
      return Object.assign({}, state, { visibility: "hidden", opened: false });
    case OPEN_GLOBAL_FAB:
      return Object.assign({}, state, { visibility: "visible", opened: true });
    case CLOSE_GLOBAL_FAB:
      return Object.assign({}, state, { visibility: "hidden", opened: false });
    default:
      return state;
  }
}

const initialCateogriesState = {
  isCompleted: true,
  isCreating: false,
  items: []
};

function category(state = initialCateogriesState, action) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return Object.assign({}, state, {
        isCompleted: false,
        items: [
          {
            id: 0,
            name: "加载中……",
            slug: "loading…",
            description: "正在加载类别列表……"
          }
        ]
      });
    case RECEIVE_CATEGORIES:
      return Object.assign({}, state, {
        isCompleted: true,
        items: action.data
      });
    case CREATING_CATEGORY:
      return Object.assign({}, state, { isCreating: true });
    case CREATED_CATEGORY:
      let {items} = Object.assign({}, {items: state.items});
      items.push(action.data);
      return Object.assign({}, state, { isCreating: false, items });
    default:
      return state;
  }
}

export default combineReducers({ globalFAB, category });
