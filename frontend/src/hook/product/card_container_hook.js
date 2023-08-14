import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataWithToken } from "../../hooks/useGetData";
import { getWishlist } from "../../redux/actions/wishlistAction";
import { useQuery } from "react-query";

const CardContainerHook = () => {
  // const [loading, setLoading] = useState(true);
  // const wishlist = useSelector((state) => state.Wishlist.wishlist);
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.Auth.user);

  // useEffect(() => {
  //   const getWishlistItems = async () => {
  //     try {
  //       setLoading(true);

  //       const res = await getDataWithToken("/wishlist");
  //       dispatch(getWishlist(res.data));

  //       setLoading(false);
  //     } catch (error) {
  //       dispatch(getWishlist([]));
  //       setLoading(false);
  //     }
  //   };

  //   getWishlistItems();
  // }, [dispatch]);
  const { isLoading, data } = useQuery("wishlist", () =>
    getDataWithToken("/wishlist")
  );
  return { isLoading, data };
};

export default CardContainerHook;
