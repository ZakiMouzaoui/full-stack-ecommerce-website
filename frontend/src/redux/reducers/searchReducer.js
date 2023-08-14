const initailState = {
  keyword: "",
  minPrice: "",
  maxPrice: "",
};

const searchReducer = (state = initailState, action) => {
  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        keyword: action.keyword,
      };
    default:
      return state;
  }
};

export default searchReducer;
