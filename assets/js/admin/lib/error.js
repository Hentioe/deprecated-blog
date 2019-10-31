export const apiError = {
  type: null,
  errors: null
};

export const failureAction = (state, action) =>
  Object.assign({}, state, {
    apiError: {
      type: action.payload.sourceAction,
      errors: action.payload.errors
    }
  });
