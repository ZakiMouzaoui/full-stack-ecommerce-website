import { useEffect, useState } from "react";
import { getData, getDataWithToken } from "../../hooks/useGetData";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRODUCT, GET_REVIEWS, GET_WISHLIST } from "../../redux/type";

const ViewProductDetailsHook = (id) => {
  const [loading, setLoading] = useState(false);
  // const [product, setProduct] = useState(null);
  // const [relatedLoading, setRelatedLoading] = useState(false);
  // const [relatedProd, setRelatedPro] = useState(null);

  // const reviews = useSelector((state) => state.Review.reviews);

  const dispatch = useDispatch();
  const product = useSelector((state) => state.Product.product);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const res = await getData(`/products/${id}`);
        dispatch({ type: GET_PRODUCT, product: res.data });
        // if(!wishlist){
        //   const wishRes = await getData("/wishlist")
        //   dispatch({type: GET_WISHLIST, payload: wishRes.data})
        // }
      } catch (err) {}
      setLoading(false);
      // setLoading(true);
      // try {
      //   if (!product) {
      //     const res = await getData(`/products/${id}`);

      //     dispatch({ type: GET_PRODUCT, product: res.data });
      //     setLoading(false);
      //     const related = await getData(
      //       `/products?category=${res.data.category._id}&brand=${res.data.brand._id}`
      //     );
      //     setRelatedPro(related.data);
      //     const reviews = await getDataWithToken(`/products/${id}/reviews`);
      //     dispatch({ type: GET_REVIEWS, reviews: reviews.data });
      //   } else {
      //     const related = await getData(
      //       `/products?category=${product.category._id}&brand=${product.brand._id}`
      //     );
      //     setRelatedPro(related.data);
      //     const reviews = await getDataWithToken(`/products/${id}/reviews`);
      //     dispatch({ type: GET_REVIEWS, reviews: reviews.data });
      //   }

      //   setRelatedLoading(false);
      // } catch (err) {
      //   console.log(err);
      //   setLoading(false);
      //   setRelatedLoading(false);
      // }
    };

    if (!product) {
      getProduct();
    }
  }, [id, dispatch, product]);

  return { loading, product };
};

export default ViewProductDetailsHook;
