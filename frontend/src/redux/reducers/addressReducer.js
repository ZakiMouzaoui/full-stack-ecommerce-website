import { GET_ADDRESSES, SET_SHIPPING } from "../type";

const initialState = {
  addresses: [],
  shippingAddress: null,
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESSES:
      return {
        ...state,
        addresses: action.addresses,
        shippingAddress: action.shippingAddress,
      };
    case SET_SHIPPING:
      return {
        ...state,
        shippingAddress: action.shippingAddress,
      };

    default:
      return state;
  }
};

export default addressReducer;
