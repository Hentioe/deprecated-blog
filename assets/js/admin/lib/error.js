const apiError = {
  type: null,
  errors: null
};

export default (state, action) =>
  Object.assign({}, state, {
    apiError: {
      type: action.payload.sourceAction,
      errors: action.payload.errors
    }
  });
