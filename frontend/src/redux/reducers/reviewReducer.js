import { ADD_REVIEW, DELETE_REVIEW, GET_REVIEWS, UPDATE_REVIEW } from "../type";

const initailState = {
  reviews: null,
};

const reviewReducer = (state = initailState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.reviews,
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.review],
      };
    case UPDATE_REVIEW:
      let updatedReviews = state.reviews.map((review) => {
        if (review._id === action.review._id) {
          return { ...review, ...action.review };
        }
        return review;
      });
      return {
        ...state,
        reviews: updatedReviews,
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(
          (review) => review._id !== action.review._id
        ),
      };
    default:
      return state;
  }
};

export default reviewReducer;
