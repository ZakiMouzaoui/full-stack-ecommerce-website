import {
  FETCH_SUBCATEGORIES,
  CREATE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  GET_ERROR,
  GET_SUBCATEGORY,
  UPDATE_SUBCATEGORY,
  FILTER_SUBCATEGORIES,
} from "../type";

const initailState = {
  subcategories: null,
  filtered: null,
  subcategory: null,
  createdCategory: null,
  pageCount: 0,
  currentPage: 0,
  error: null,
  loading: false,
};

const subCategoryReducer = (state = initailState, action) => {
  switch (action.type) {
    case FETCH_SUBCATEGORIES:
      return {
        subcategories: action.subcategories,
        filtered: action.filtered,
        subcategory: null,
        pageCount: action.paginationResult || 0,
        currentPage: action.currentPage || 0,
        loading: false,
        error: null,
      };

    case FILTER_SUBCATEGORIES:
      return {
        ...state,
        filtered: action.filtered,
      };

    case CREATE_SUBCATEGORY:
      return {
        ...state,
        subcategories: [action.payload, ...state.subcategories],
        filtered: [action.payload, ...state.subcategories],
        loading: false,
        error: null,
      };

    case UPDATE_SUBCATEGORY:
      let updatedSubCategories = state.subcategories.map((subcategory) => {
        if (subcategory._id === action.payload._id) {
          return { ...subcategory, ...action.payload };
        }
        return subcategory;
      });
      return {
        ...state,
        subcategories: updatedSubCategories,
        filtered: updatedSubCategories,
        error: null,
      };
    case GET_SUBCATEGORY:
      return {
        ...state,
        subcategory: action.subcategory,
      };
    case DELETE_SUBCATEGORY:
      let updatedSubCategoriesData = state.subcategories.filter(
        (subcategory) => subcategory._id !== action.payload._id
      );

      return {
        ...state,
        subcategories: updatedSubCategoriesData,
        filtered: updatedSubCategoriesData,
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

export default subCategoryReducer;
