import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_REVIEWS } from "../../redux/type";

const GetReviewsHook = (id) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.Review.reviews);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getData(`products/${id}/reviews`);
        dispatch({ type: GET_REVIEWS, reviews: res.data });
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [dispatch, id]);

  return { reviews };
};

export default GetReviewsHook;
