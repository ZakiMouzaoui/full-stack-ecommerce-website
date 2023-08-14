import { getData } from "../../hooks/useGetData";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCTS,
  GET_FEATURED,
  GET_MOST_SELLINGS,
  UPDATE_PRODUCT,
} from "../type";

export const fetchProducts = (payload) => {
  return {
    type: FETCH_PRODUCTS,
    products: payload.data,
    filtered: payload.data,
  };
};

export const createProduct = (payload) => {
  return {
    type: CREATE_PRODUCT,
    payload,
  };
};

export const updateProduct = (payload) => {
  return {
    type: UPDATE_PRODUCT,
    payload,
  };
};

export const deleteProduct = (payload) => {
  return {
    type: DELETE_PRODUCT,
    payload,
  };
};

export const fetchMostSellingsProducts = (payload) => {
  return {
    type: GET_MOST_SELLINGS,
    payload,
  };
};

export const fetchFeaturedProducts = (payload) => {
  return {
    type: GET_FEATURED,
    payload,
  };
};

export const fetchProductsByCategory = (payload, currentPage) => {
  return {
    type: FETCH_PRODUCTS,
    products: payload.data,
    paginationResult: payload.paginationResult,
    currentPage,
  };
};

export const fetchProductsByBrand = (payload) => {
  return {
    type: FETCH_PRODUCTS,
    products: payload.data,
    paginationResult: payload.paginationResult,
  };
};

// export const getProductsByCategory =
//   (limit, page, categoryID) => async (dispatch) => {
//     try {
//       const res = await getData(
//         `/products?limit=${limit}&category=${categoryID}&page=${page}`
//       );

//       dispatch({
//         type: FETCH_PRODUCTS,
//         payload: res,
//       });
//     } catch (e) {
//       dispatch({
//         type: GET_ERROR,
//         payload: e,
//       });
//     }
//   };

// export const getProductsByBrand =
//   (limit, page, brandID) => async (dispatch) => {
//     try {
//       const res = await getData(
//         `/products?limit=${limit}&brand=${brandID}&page=${page}`
//       );

//       dispatch({
//         type: FETCH_PRODUCTS,
//         payload: res,
//       });
//     } catch (e) {
//       dispatch({
//         type: GET_ERROR,
//         payload: e,
//       });
//     }
//   };

export const getAllProductsSearch = (keywords) => async (dispatch) => {
  const res = await getData(`/products?keyword=${keywords}`);

  dispatch({
    type: FETCH_PRODUCTS,
    payload: res,
  });
};
