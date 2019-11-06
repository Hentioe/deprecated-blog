import { createSlice } from "redux-starter-kit";
import { apiError, failureAction } from "../lib/error";

const initialState = {
  isLoaded: true,
  isChanging: false,
  apiError,
  items: []
};

const redirections = createSlice({
  name: "redirections",
  initialState,
  reducers: {
    failure: failureAction,
    requestRedirections: state =>
      Object.assign({}, state, {
        isLoaded: false,
        items: [
          {
            id: 0,
            title: "加载中……",
            redirections: []
          }
        ]
      }),
    receiveRedirections: (state, action) =>
      Object.assign({}, state, {
        isLoaded: true,
        items: action.payload
      }),
    changingRedirections: state =>
      Object.assign({}, state, { isChanging: true }),
    changedRedirections: state =>
      Object.assign({}, state, { isChanging: false })
  }
});

export const {
  failure,
  requestRedirections,
  receiveRedirections,
  changingRedirections,
  changedRedirections
} = redirections.actions;

export default redirections.reducer;
