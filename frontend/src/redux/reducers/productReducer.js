import {
  GET_FEATURED,
  GET_MOST_SELLINGS,
  CREATE_PRODUCT,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ERROR,
  FETCH_PRODUCTS,
  FILTER_PRODUCTS,
} from "../type";

const initailState = {
  products: null,
  filtered: null,
  product: null,
  featured: null,
  mostSellings: null,
  pageCount: 0,
  error: null,
  loading: true,
  currentPage: 1,
  selectedColor: null,
};

const productReducer = (state = initailState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.products,
        filtered: action.filtered,
        pageCount: action.paginationResult
          ? action.paginationResult.totalPages
          : 0,
        currentPage: action.currentPages,
      };
    case FILTER_PRODUCTS:
      return {
        ...state,
        filtered: action.filtered,
      };
    case GET_MOST_SELLINGS:
      return {
        ...state,
        mostSellings: action.payload.data,
        pageCount: action.payload.paginationResult.totalPages,
      };
    case GET_FEATURED:
      return {
        ...state,
        featured: action.payload.data,
        pageCount: action.payload.paginationResult.totalPages,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
        filtered: [action.payload, ...state.filtered],
        error: null,
      };

    case UPDATE_PRODUCT:
      let updatedProducts = state.products.map((product) => {
        if (product._id === action.payload._id) {
          return { ...product, ...action.payload };
        }
        return product;
      });
      return {
        ...state,
        products: updatedProducts,
        filtered: updatedProducts,
        error: null,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    case DELETE_PRODUCT:
      let updatedProductsData = state.products.filter(
        (product) => product._id !== action.payload._id
      );

      return {
        ...state,
        products: updatedProductsData,
        filtered: updatedProductsData,
        error: null,
      };
    case "SELECT_COLOR":
      return {
        ...state,
        selectedColor: action.selectedColor,
      };
    case "LOADING":
      return {
        ...state,
        loading: action.loading,
      };

    case GET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default productReducer;
