import {
  CREATE_BRAND,
  DELETE_BRAND,
  FETCH_BRANDS,
  UPDATE_BRAND,
} from "../type";

export const fetchBrands = (data, paginationResult) => ({
  type: FETCH_BRANDS,
  brands: data,
  filtered: data,
  totalPages: paginationResult ? paginationResult.totalPages : 1,
});

export const createBrand = (payload) => {
  return {
    type: CREATE_BRAND,
    payload,
  };
};

export const updateBrand = (payload) => {
  return {
    type: UPDATE_BRAND,
    payload,
  };
};

export const deleteBrand = (payload) => ({
  type: DELETE_BRAND,
  payload,
});
