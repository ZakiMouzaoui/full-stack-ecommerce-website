import { GET_WISHLIST } from "../type";

export const getWishlist = (payload) => {
  return {
    type: GET_WISHLIST,
    payload,
  };
};
