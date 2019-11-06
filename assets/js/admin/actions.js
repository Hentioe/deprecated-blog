import fetch from "cross-fetch";
import { CALL_API } from "./middleware/api";

export const NORMAL_STATUS = "/normal";
export const HIDDEN_STATUS = "/drafted";
export const RECYCLE_STATUS = "/recycled";
export const NON_NORMAL_STATUS = "/non_normal";
const ALL_STATUS = "ALL_STATUS";

export const PIN_OPERATION = "pin";
export const UNPIN_OPERATION = "unpin";
export const DRAFT_OPERATION = "draft";
export const RECYCLE_OPERATION = "recycle";
export const RESTORE_OPERATION = "restore";

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

import {
  failure as failedOnPushArticle,
  requestArticle,
  receiveArticle,
  pushingArticle,
  pushedArticle,
  requestPreview,
  receivePreview
} from "./slices/push-article";

import {
  failure as failedOnArticles,
  requestArticles,
  receiveArticles,
  changingArticles,
  changedArticles
} from "./slices/articles";

import {
  failure as failedOnRedirections,
  requestRedirections,
  receiveRedirections,
  changingRedirections,
  changedRedirections
} from "./slices/redirections";

const redirectionsDeleteCall = id => ({
  [CALL_API]: {
    types: [changingRedirections, changedRedirections, failedOnRedirections],
    endpoint: `redirections/${id}`,
    method: "DELETE"
  }
});

export function deleteRedirection(id) {
  return dispatch => dispatch(redirectionsDeleteCall(id));
}

const redirectionsUpdateCall = (id, data) => ({
  [CALL_API]: {
    types: [changingRedirections, changedRedirections, failedOnRedirections],
    endpoint: `redirections/${id}`,
    method: "PUT",
    data
  }
});

export function updateRedirection(data) {
  return dispatch => dispatch(redirectionsUpdateCall(data.id, data));
}

const redirectionsCreateCall = data => ({
  [CALL_API]: {
    types: [changingRedirections, changedRedirections, failedOnRedirections],
    endpoint: "redirections",
    method: "POST",
    data
  }
});

export function createRedirection(data) {
  return dispatch => dispatch(redirectionsCreateCall(data));
}

const articlesRedirecedCall = () => ({
  [CALL_API]: {
    types: [requestRedirections, receiveRedirections, failedOnRedirections],
    endpoint: "articles/redirected"
  }
});

export function fetchArticlesRedirected() {
  return dispatch => dispatch(articlesRedirecedCall());
}

const articlesDeleteCall = id => ({
  [CALL_API]: {
    types: [changingArticles, changedArticles, failedOnArticles],
    endpoint: `articles/${id}`,
    method: "DELETE"
  }
});

export function deleteArticle(id) {
  return dispatch => dispatch(articlesDeleteCall(id));
}

const articlesChangeCall = (id, operation) => ({
  [CALL_API]: {
    types: [changingArticles, changedArticles, failedOnArticles],
    endpoint: `articles/${id}/${operation}`,
    method: "PUT"
  }
});

export function changeArticle(id, operation) {
  return dispatch => dispatch(articlesChangeCall(id, operation));
}

const articlesPreviewCall = data => ({
  [CALL_API]: {
    types: [requestPreview, receivePreview, failedOnPushArticle],
    endpoint: "articles/preview",
    method: "POST",
    data
  }
});

export function previewArticle(data) {
  return dispatch => dispatch(articlesPreviewCall(data));
}

const articlesShowCall = id => ({
  [CALL_API]: {
    types: [requestArticle, receiveArticle, failedOnPushArticle],
    endpoint: `articles/${id}`
  }
});

export function fetchArticle(id) {
  return dispatch => dispatch(articlesShowCall(id));
}

const articlesListCall = status => {
  let endpoint = "articles";
  switch (status) {
    case NORMAL_STATUS:
    case HIDDEN_STATUS:
    case RECYCLE_STATUS:
    case NON_NORMAL_STATUS:
      endpoint += status;
  }
  return {
    [CALL_API]: {
      types: [requestArticles, receiveArticles, failedOnArticles],
      endpoint
    }
  };
};

export function fetchArticles(status = ALL_STATUS) {
  return dispatch => dispatch(articlesListCall(status));
}

const articleCreateCall = data => ({
  [CALL_API]: {
    types: [pushingArticle, pushedArticle, failedOnPushArticle],
    endpoint: "articles",
    method: "POST",
    data
  }
});

export function createArticle(data) {
  return dispatch => dispatch(articleCreateCall(data));
}

const articleUpdateCall = (id, data) => ({
  [CALL_API]: {
    types: [pushingArticle, pushedArticle, failedOnPushArticle],
    endpoint: `articles/${id}`,
    method: "PUT",
    data
  }
});

export function updateArticle(data) {
  return dispatch => dispatch(articleUpdateCall(data.id, data));
}

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
