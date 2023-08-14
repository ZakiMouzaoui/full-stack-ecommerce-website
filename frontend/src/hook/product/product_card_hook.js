import { useDispatch } from "react-redux";
import {
  ADD_TO_WISHLIST,
  LOGIN_USER,
  REMOVE_FROM_WISHLIST,
} from "../../redux/type";
import { insertData } from "../../hooks/useInsertData";
import { toast } from "react-toastify";
import deleteData from "../../hooks/useDeleteData";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

const ProductCardHook = (item, wishlist) => {
  const isFav =
    wishlist && wishlist.some((productId) => productId === item._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFav = () => {
    if (isFav) {
      removeFromWishlist();
    } else {
      addToWishlist();
    }
  };

  const queryClient = useQueryClient();

  const addToWishlist = async () => {
    try {
      toast.dismiss();
      await insertData("/wishlist", { productId: item._id });
      dispatch({
        type: ADD_TO_WISHLIST,
        payload: item._id,
      });
      queryClient.setQueriesData("wishlist-items", (oldQuery) => {
        return {
          data: [...oldQuery.data, item],
        };
      });
      toast.success("Product added to wishlist successfully!");
    } catch (err) {
      if (err.response.status === 401) {
        dispatch({ type: LOGIN_USER, user: null });
        navigate("/login");
      } else {
        toast.error("Something went wrong. Please try again");
      }
    }
  };

  const removeFromWishlist = async () => {
    try {
      toast.dismiss();
      await deleteData(`/wishlist/${item._id}`);
      dispatch({
        type: REMOVE_FROM_WISHLIST,
        payload: item._id,
      });

      queryClient.setQueriesData("wishlist-items", (oldQuery) => {
        return {
          data: oldQuery.data.filter((obj) => obj._id !== item._id),
        };
      });

      toast.success("Product removed from wishlist successfully!");
    } catch (err) {
      if (err.response.status === 401) {
        dispatch({ type: LOGIN_USER, user: null });
        navigate("/login");
      } else {
        toast.error("Something went wrong. Please try again");
      }
    }
  };

  return { isFav, handleFav };
};

export default ProductCardHook;
