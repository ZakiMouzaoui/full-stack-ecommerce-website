import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/productAction";
import { getData } from "../../hooks/useGetData";
import { GET_ERROR } from "../../redux/type";
import { fetchCategories } from "../../redux/actions/categoryAction";
import { fetchBrands } from "../../redux/actions/brandAction";

const AdminAllProductsHook = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

  const products = useSelector((state) => state.Product.products);
  const filtered = useSelector((state) => state.Product.filtered);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await getData(`/products`);
        const categories = await getData("categories");
        const brands = await getData("brands");

        dispatch(fetchProducts(response));
        dispatch(fetchCategories(categories.data));
        dispatch(fetchBrands(brands.data));
      } catch (e) {
        if (e.code === "ERR_NETWORK") {
          setIsServerError(true);
        }
        dispatch({
          type: GET_ERROR,
          payload: e,
        });
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return [loading, products, filtered, isServerError];
};

export default AdminAllProductsHook;
