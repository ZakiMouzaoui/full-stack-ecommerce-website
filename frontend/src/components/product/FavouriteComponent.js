import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getDataWithToken } from "../../hooks/useGetData";
import {
  ADD_TO_WISHLIST,
  LOGIN_USER,
  REMOVE_FROM_WISHLIST,
} from "../../redux/type";
// import { Spinner } from "react-bootstrap";
// import ServerError500 from "../error/ServerError500";
import { toast } from "react-toastify";
import { insertData } from "../../hooks/useInsertData";
import { useNavigate } from "react-router-dom";
import deleteData from "../../hooks/useDeleteData";

const FavoriteComponent = ({ id }) => {
  const wishlist = useSelector((state) => state.Wishlist.wishlist);
  const dispatch = useDispatch();

  const isFav = wishlist.some((itemId) => itemId === id);
  const navigate = useNavigate();

  const handleFav = () => {
    if (isFav) {
      removeFromWishlist();
    } else {
      addToWishlist();
    }
  };

  const addToWishlist = async () => {
    try {
      toast.dismiss();
      await insertData("/wishlist", { productId: id });
      dispatch({
        type: ADD_TO_WISHLIST,
        payload: id,
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
      await deleteData(`/wishlist/${id}`);
      dispatch({
        type: REMOVE_FROM_WISHLIST,
        payload: id,
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

  //   const dispatch = useDispatch();
  //   const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     const getWishlist = async () => {
  //       setLoading(true);
  //       try {
  //         const res = await getDataWithToken("/wishlist");

  //         dispatch({ type: GET_WISHLIST, payload: res.data });
  //         setLoading(false);
  //       } catch (err) {
  //         setLoading(false);
  //       }
  //     };

  //     if (!wishlist) {
  //       getWishlist();
  //     }
  //   }, [dispatch, wishlist]);

  return (
    // <div>
    //   {wishlist ? (
    //     <i
    //       className={`fa  ${
    //         wishlist.some((itemObj) => itemObj._id === item._id)
    //           ? "fa-heart"
    //           : "fa-heart-o"
    //       } ms-3 mb-3`}
    //       style={{ fontSize: " 1.7rem" }}
    //     ></i>
    //   ) : loading === true ? (
    //     <Spinner
    //       style={{ height: "1.7rem", width: "1.7rem" }}
    //       className="ms-3"
    //     ></Spinner>
    //   ) : (
    //     <i
    //       className="fa fa-heart-o ms-3 mb-3"
    //       style={{ fontSize: " 1.7rem" }}
    //     ></i>
    //   )}
    // </div>

    <Fragment>
      <i
        className={`fa ${isFav ? "fa-heart" : "fa-heart-o"} ms-3 mb-2`}
        style={{ fontSize: " 1.7rem", cursor: "pointer" }}
        onClick={handleFav}
      ></i>
    </Fragment>
  );
};

export default FavoriteComponent;
