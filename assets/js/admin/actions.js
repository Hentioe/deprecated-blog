import fetch from "cross-fetch";

export const SHOW_GLOBAL_FAB = "SHOW_GLOBAL_FAB";
export const HIDDEN_GLOBAL_FAB = "HIDDEN_GLOBAL_FAB";
export const OPEN_GLOBAL_FAB = "OPEN_GLOBAL_FAB";
export const CLOSE_GLOBAL_FAB = "CLOSE_GLOBAL_FAB";
export const REQUEST_CATEGORIES = "REQUEST_CATEGORIES";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const CREATING_CATEGORY = "CREATING_CATEGORY";
export const CREATED_CATEGORY = "CREATED_CATEGORY";

export function showGlobalFAB() {
  return { type: SHOW_GLOBAL_FAB };
}

export function hiddenGlobalFAB() {
  return { type: HIDDEN_GLOBAL_FAB };
}

export function openGlobalFAB() {
  return { type: OPEN_GLOBAL_FAB };
}

export function closeGlobalFAB() {
  return { type: CLOSE_GLOBAL_FAB };
}

function requestCategories() {
  return { type: REQUEST_CATEGORIES };
}

function creatingCategory() {
  return { type: CREATING_CATEGORY };
}

function createdCategory(category) {
  return { type: CREATED_CATEGORY, data: category };
}

export function receiveCategories(data) {
  return { type: RECEIVE_CATEGORIES, data: data };
}

export function fetchCategories() {
  return function(dispatch) {
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
