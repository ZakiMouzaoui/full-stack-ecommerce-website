import { APPLY_COUPON, GET_CART } from "../type";

const initialState = {
  cartItems: [],
  totalCartPrice: null,
  totalItems: 0,
  totalPriceAfterDiscount: null,
  discount: null,
  coupon: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cartItems: action.data,
        totalItems: action.totalItems,
        totalCartPrice: action.totalCartPrice,
        totalPriceAfterDiscount: action.totalPriceAfterDiscount,
      };
    case APPLY_COUPON:
      return {
        ...state,
        totalPriceAfterDiscount: action.totalPriceAfterDiscount,
        discount: action.discount,
        coupon: action.coupon,
      };
    default:
      return state;
  }
};

export default cartReducer;
