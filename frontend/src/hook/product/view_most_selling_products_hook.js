import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMostSellingsProducts } from "../../redux/actions/productAction";
import { getData } from "../../hooks/useGetData";

const ViewMostSellingProductsHook = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.Product.mostSellings);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getData(`/products?sort=-sold`);

        dispatch(fetchMostSellingsProducts(response));
      } catch (error) {}
      setLoading(false);
    };

    if (!products) {
      fetchData();
    }
  }, []);

  return [products, loading];
};

export default ViewMostSellingProductsHook;
