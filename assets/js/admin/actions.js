import fetch from "cross-fetch";

import {
  requestCategories,
  receiveCategories,
  creatingCategory,
  createdCategory
} from "./slices/categories";

export function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories());

    return fetch("/api/admin/categories")
      .then(resp => resp.json())
      .then(json => dispatch(receiveCategories(json)));
  };
}

export function createCategory(data) {
  return dispatch => {
    dispatch(creatingCategory());

    return fetch("/api/admin/categories", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch(createdCategory(json));
      });
  };
}
