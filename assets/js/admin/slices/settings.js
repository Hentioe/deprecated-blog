import { createSlice } from "redux-starter-kit";
import { apiError, failureAction } from "../lib/error";

const initialState = {
  isLoaded: true,
  isSyncingCounter: false,
  apiError,
  settings: {
    counter_sync_time: "1970-01-01T00:00:00"
  }
};

const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    failure: failureAction,
    requestSettings: state =>
      Object.assign({}, state, {
        isLoaded: false,
        settings: {
          counter_sync_time: "加载中……"
        }
      }),
    receiveSettings: (state, action) =>
      Object.assign({}, state, {
        isLoaded: true,
        settings: action.payload
      }),
    syncingCounter: state =>
      Object.assign({}, state, { isSyncingCounter: true }),
    syncedCounter: (state, action) =>
      Object.assign({}, state, {
        isSyncingCounter: false,
        settings: action.payload
      })
  }
});

export const {
  failure,
  requestSettings,
  receiveSettings,
  syncingCounter,
  syncedCounter
} = settings.actions;

export default settings.reducer;
