import { ADD_TO_WISHLIST, GET_WISHLIST, REMOVE_FROM_WISHLIST } from "../type";

const initialState = {
  wishlist: [],
};

const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WISHLIST: {
      return {
        ...state,
        wishlist: action.payload,
      };
    }
    case ADD_TO_WISHLIST: {
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    }
    case REMOVE_FROM_WISHLIST: {
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default wishListReducer;
