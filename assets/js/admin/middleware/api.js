import fetch from "cross-fetch";
const API_ROOT = "/api/admin/";

const callApi = (endpoint, options) => {
  const fullUrl =
    endpoint.indexOf(API_ROOT) < 0 ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl, options).then(resp => {
    if (!resp.ok) {
      if (![401, 422, 404].includes(resp.status)) {
        return Promise.reject({ message: "未知错误。" });
      } else {
        return resp.json().then(json => Promise.reject(json.errors));
      }
    } else {
      return resp.json().then(json => json);
    }
  });
};

export const CALL_API = "Call API";

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === "undefined") {
    return next(action);
  }

  let { endpoint, types } = callAPI;

  if (typeof endpoint === "function") {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== "string") {
    throw new Error("Specify a string endpoint URL.");
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  types = types.map(t => (typeof t === "string" ? t : t.type));
  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  let options = {};
  if (callAPI.method) {
    options.method = callAPI.method;
    if (callAPI.data) {
      options.headers = {
        "Content-Type": "application/json"
      };
      options.body = JSON.stringify(callAPI.data);
    }
  }

  return callApi(endpoint, options).then(
    payload => {
      next(
        actionWith({
          payload,
          type: successType
        })
      );
    },

    errors =>
      next(
        actionWith({
          payload: { sourceAction: requestType, errors: errors },
          type: failureType
        })
      )
  );
};
