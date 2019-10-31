import fetch from "cross-fetch";
import { CALL_API } from "./middleware/api";

import {
  requestCategories,
  receiveCategories,
  creatingCategory,
  createdCategory,
  updatingCategory,
  updatedCategory,
  deletingCategory,
  deletedCategory,
  failure as failedOnCategories
} from "./slices/categories";

const categoriesIndexCall = () => ({
  [CALL_API]: {
    types: [requestCategories, receiveCategories, failedOnCategories],
    endpoint: "categories"
  }
});

export function fetchCategories() {
  return dispatch => {
    dispatch(categoriesIndexCall());
  };
}

const categoriesCreateCall = data => ({
  [CALL_API]: {
    types: [creatingCategory, createdCategory, failedOnCategories],
    endpoint: "categories",
    method: "POST",
    data
  }
});

const categoriesUpdateCall = (id, data) => ({
  [CALL_API]: {
    types: [updatingCategory, updatedCategory, failedOnCategories],
    endpoint: `categories/${id}`,
    method: "PUT",
    data
  }
});

export function createCategory(data) {
  return dispatch => {
    dispatch(categoriesCreateCall(data));
  };
}

export function updateCategory(data) {
  return dispatch => {
    dispatch(categoriesUpdateCall(data.id, data));
  };
}

const categoriesDeleteCall = id => ({
  [CALL_API]: {
    types: [deletingCategory, deletedCategory, failedOnCategories],
    endpoint: `categories/${id}`,
    method: "DELETE",
    parameter: id
  }
});

export function deleteCategory(id) {
  return dispatch => {
    dispatch(categoriesDeleteCall(id));
  };
}
