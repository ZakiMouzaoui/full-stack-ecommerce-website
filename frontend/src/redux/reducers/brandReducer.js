import {
  FETCH_BRANDS,
  CREATE_BRAND,
  DELETE_BRAND,
  GET_ERROR,
  GET_BRAND,
  UPDATE_BRAND,
  FILTER_BRANDS,
} from "../type";

const initailState = {
  brands: null,
  filtered: null,
  brand: null,
  createdBrand: null,
  pageCount: 0,
  currentPage: 0,
  error: null,
  loading: false,
};

const brandReducer = (state = initailState, action) => {
  switch (action.type) {
    case FETCH_BRANDS:
      return {
        brands: action.brands,
        filtered: action.filtered,
        brand: null,
        pageCount: action.paginationResult || 0,
        currentPage: action.currentPage || 0,
        loading: false,
        error: null,
      };

    case FILTER_BRANDS:
      return {
        ...state,
        filtered: action.filtered,
      };

    case CREATE_BRAND:
      return {
        ...state,
        brands: [action.payload, ...state.brands],
        filtered: [action.payload, ...state.brands],
        loading: false,
        error: null,
      };

    case UPDATE_BRAND:
      let updatedBrands = state.brands.map((brand) => {
        if (brand._id === action.payload._id) {
          return { ...brand, ...action.payload };
        }
        return brand;
      });
      return {
        ...state,
        brands: updatedBrands,
        filtered: updatedBrands,
        error: null,
      };
    case GET_BRAND:
      return {
        ...state,
        brand: action.brand,
      };
    case DELETE_BRAND:
      let updatedBrandsData = state.brands.filter(
        (brand) => brand._id !== action.payload._id
      );

      return {
        ...state,
        brands: updatedBrandsData,
        filtered: updatedBrandsData,
        error: null,
      };
    case GET_ERROR:
      return {
        ...state,

        error: action.payload,
      };
    default:
      return state;
  }
};

export default brandReducer;
