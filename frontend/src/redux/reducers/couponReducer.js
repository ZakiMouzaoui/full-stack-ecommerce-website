import { EDIT_COUPON, FILTER_COUPONS, GET_COUPON, GET_COUPONS } from "../type";

const initialState = {
  coupons: null,
  filtered: null,
  coupon: null,
};

const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUPONS:
      return {
        ...state,
        coupons: action.coupons,
        filtered: action.filtered,
        coupon: null,
      };
    case FILTER_COUPONS:
      return {
        ...state,
        filtered: action.filtered,
      };
    case GET_COUPON:
      return {
        ...state,
        coupon: action.coupon,
      };
    case EDIT_COUPON:
      let updatedCoupons = state.coupons.map((coupon) => {
        if (coupon._id === action.payload._id) {
          return { ...coupon, ...action.payload };
        }
        return coupon;
      });
      return {
        ...state,
        coupons: updatedCoupons,
        filtered: updatedCoupons,
        error: null,
      };
    default:
      return state;
  }
};

export default couponReducer;
