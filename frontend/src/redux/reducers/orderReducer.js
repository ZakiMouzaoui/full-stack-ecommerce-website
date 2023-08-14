import { FILTER_ORDERS, GET_ORDER, GET_ORDERS } from "../type";

const initialState = { orders: null, filtered: null, order: null };

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_ORDERS:
      return {
        ...state,
        orders: action.orders,
        filtered: action.filtered,
      };
    case FILTER_ORDERS:
      console.log(action.filtered);
      return {
        ...state,
        filtered: action.filtered,
      };
    case GET_ORDER:
      return { ...state, order: action.order };
  }
};

export default orderReducer;
