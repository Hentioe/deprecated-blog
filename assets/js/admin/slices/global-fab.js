import { createSlice } from "redux-starter-kit";

const initialGFABState = {
  visibility: "visible",
  opened: false
};

export const globalFABSlice = createSlice({
  name: "globalFAB",
  initialState: initialGFABState,
  reducers: {
    showGFAB: state => Object.assign({}, state, { visibility: "visible" }),
    hiddenGFAB: state =>
      Object.assign({}, state, { visibility: "hidden", opened: false }),
    openGFAB: state =>
      Object.assign({}, state, { visibility: "visible", opened: true }),
    closeGFAB: state => Object.assign({}, state, { opened: false }),
    initGFAB: state => Object.assign({}, state, initialGFABState)
  }
});

export const {
  showGFAB,
  hiddenGFAB,
  closeGFAB,
  openGFAB,
  initGFAB
} = globalFABSlice.actions;

export default globalFABSlice.reducer;
