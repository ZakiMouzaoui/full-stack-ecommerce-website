import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  FETCH_CATEGORIES,
  UPDATE_CATEGORY,
} from "../type";

export const fetchCategories = (data, paginationResult) => {
  return {
    type: FETCH_CATEGORIES,
    categories: data,
    filtered: data,
    totalPages: paginationResult ? paginationResult.totalPages : 1,
  };
};

export const createCategory = (payload) => {
  return {
    type: CREATE_CATEGORY,
    payload,
  };
};

export const updateCategory = (payload) => {
  return {
    type: UPDATE_CATEGORY,
    payload,
  };
};

export const deleteCategory = (payload) => ({
  type: DELETE_CATEGORY,
  payload,
});
