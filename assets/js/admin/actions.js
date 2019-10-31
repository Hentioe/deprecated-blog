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


import {
  requestTags,
  receiveTags,
  creatingTag,
  createdTag,
  updatingTag,
  updatedTag,
  deletingTag,
  deletedTag,
  failure as failedOnTags
} from "./slices/tags";

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

export function createCategory(data) {
  return dispatch => {
    dispatch(categoriesCreateCall(data));
  };
}

const categoriesUpdateCall = (id, data) => ({
  [CALL_API]: {
    types: [updatingCategory, updatedCategory, failedOnCategories],
    endpoint: `categories/${id}`,
    method: "PUT",
    data
  }
});

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

const tagsIndexCall = () => ({
  [CALL_API]: {
    types: [requestTags, receiveTags, failedOnTags],
    endpoint: "tags"
  }
});

export function fetchTags() {
  return dispatch => {
    dispatch(tagsIndexCall());
  };
}

const tagsCreateCall = data => ({
  [CALL_API]: {
    types: [creatingTag, createdTag, failedOnTags],
    endpoint: "tags",
    method: "POST",
    data
  }
});

export function createTag(data) {
  return dispatch => {
    dispatch(tagsCreateCall(data));
  };
}

const tagsUpdateCall = (id, data) => ({
  [CALL_API]: {
    types: [updatingTag, updatedTag, failedOnTags],
    endpoint: `tags/${id}`,
    method: "PUT",
    data
  }
});

export function updateTag(data) {
  return dispatch => {
    dispatch(tagsUpdateCall(data.id, data));
  };
}

const tagsDeleteCall = id => ({
  [CALL_API]: {
    types: [deletingTag, deletedTag, failedOnTags],
    endpoint: `tags/${id}`,
    method: "DELETE",
    parameter: id
  }
});

export function deleteTag(id) {
  return dispatch => {
    dispatch(tagsDeleteCall(id));
  };
}
