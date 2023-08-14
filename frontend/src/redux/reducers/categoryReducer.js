import {
  FETCH_CATEGORIES,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_ERROR,
  GET_CATEGORY,
  UPDATE_CATEGORY,
  FILTER_CATEGORIES,
} from "../type";

const initailState = {
  categories: null,
  filtered: null,
  category: null,
  createdCategory: null,
  pageCount: 0,
  currentPage: 0,
  error: null,
  loading: false,
};

const categoryReducer = (state = initailState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        categories: action.categories,
        filtered: action.filtered,
        category: null,
        pageCount: action.paginationResult || 0,
        currentPage: action.currentPage || 0,
        loading: false,
        error: null,
      };

    case FILTER_CATEGORIES:
      return {
        ...state,
        filtered: action.filtered,
      };

    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [action.payload, ...state.categories],
        filtered: [action.payload, ...state.categories],
        loading: false,
        error: null,
      };

    case UPDATE_CATEGORY:
      let updatedCategories = state.categories.map((category) => {
        if (category._id === action.payload._id) {
          return { ...category, ...action.payload };
        }
        return category;
      });
      return {
        ...state,
        categories: updatedCategories,
        filtered: updatedCategories,
        error: null,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    case DELETE_CATEGORY:
      let updatedCategoriesData = state.categories.filter(
        (category) => category._id !== action.payload._id
      );

      return {
        ...state,
        categories: updatedCategoriesData,
        filtered: updatedCategoriesData,
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

export default categoryReducer;
