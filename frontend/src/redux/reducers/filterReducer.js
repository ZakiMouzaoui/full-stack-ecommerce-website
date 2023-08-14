import {
  CHANGE_MAX_PRICE,
  CHANGE_MIN_PRICE,
  CHECK_BRAND,
  CHECK_CATEGORY,
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BRAND,
  GET_FILTERED_PRODUCTS,
  SEARCH_KEYWORD,
  SELECT_SORT,
} from "../type";

const searchParams = new URLSearchParams(window.location.search);
const initialState = {
  loading: false,
  products: null,
  searchKeyword: searchParams.get("keyword") || "",
  selectedCategory: searchParams.get("category") || null,
  categories: null,
  brands: null,
  checkedBrands: searchParams.getAll("brand") || [],
  brandsCount: {},
  minPrice: searchParams.get("minPrice"),
  maxPrice: searchParams.get("maxPrice"),
  sort: searchParams.get("sort") || "",
  pageCount: 0,
  currentPage: searchParams.get("page"),
  isBrandChecked: false,
};

const FilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_KEYWORD:
      return {
        ...state,
        searchKeyword: action.keyword,
        isBrandChecked: false,
      };

    case CHECK_CATEGORY:
      return {
        ...state,
        selectedCategory: action.category,
        isBrandChecked: false,
      };
    case CHECK_BRAND:
      return {
        ...state,
        checkedBrands: action.checkedBrands,
        isBrandChecked: true,
      };
    case CHANGE_MIN_PRICE:
      return {
        ...state,
        minPrice: action.price,
        isBrandChecked: false,
      };
    case CHANGE_MAX_PRICE:
      return {
        ...state,
        maxPrice: action.price,
        isBrandChecked: false,
      };
    case SELECT_SORT:
      return {
        ...state,
        sort: action.sort,
      };
    case "CHANGE_PAGE": {
      return { ...state, currentPage: action.page };
    }
    case GET_FILTERED_PRODUCTS:
      return {
        ...state,
        products: action.products,
        pageCount: action.pageCount,
        // currentPage: action.currentPage,
        categories: action.products
          .map((product) => product.category)
          .filter((v, i, a) => a.findIndex((v2) => v2._id === v._id) === i),

        brands:
          action.isBrandChecked === false
            ? action.filteredDocs
                .map((product) => product.brand)
                .filter(
                  (v, i, a) => a.findIndex((v2) => v2._id === v._id) === i
                )
            : state.brands,
        brandsCount:
          action.isBrandChecked === false
            ? action.filteredDocs.reduce((counts, product) => {
                const brandId = product.brand._id;
                counts[brandId] = (counts[brandId] || 0) + 1;
                return counts;
              }, {})
            : state.brandsCount,
      };
    case "LOADING":
      return {
        ...state,
        loading: false,
      };
    case FILTER_PRODUCTS_BRAND:
      return {
        ...state,
        products: action.products,
      };

    default:
      return { ...state };
  }
};
export default FilterReducer;
