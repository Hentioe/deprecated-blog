import { combineReducers } from "redux";
import {
  SHOW_GLOBAL_FAB,
  HIDDEN_GLOBAL_FAB,
  OPEN_GLOBAL_FAB,
  CLOSE_GLOBAL_FAB
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

export default combineReducers({ globalFAB });
