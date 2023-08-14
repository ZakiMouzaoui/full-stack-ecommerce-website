import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedProducts } from "../../redux/actions/productAction";
import { getData } from "../../hooks/useGetData";

const ViewFeaturedProductsHook = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const products = useSelector((state) => state.Product.featured);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getData(`/products?sort=-avgRating`);
        dispatch(fetchFeaturedProducts(response));
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  return [products, loading];
};

export default ViewFeaturedProductsHook;
