import {
  CREATE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  FETCH_SUBCATEGORIES,
  UPDATE_SUBCATEGORY,
} from "../type";

export const fetchSubCategories = (subcategories, totalPages, currentPage) => {
  return {
    type: FETCH_SUBCATEGORIES,
    subcategories: subcategories,
    filtered: subcategories,
    totalPages: totalPages || 1,
    currentPage: currentPage || 0,
  };
};

export const createSubCategory = (payload) => {
  return {
    type: CREATE_SUBCATEGORY,
    payload,
  };
};

export const updateSubCategory = (payload) => {
  console.log(payload);
  return {
    type: UPDATE_SUBCATEGORY,
    payload,
  };
};

export const deleteSubCategory = (payload) => ({
  type: DELETE_SUBCATEGORY,
  payload,
});
