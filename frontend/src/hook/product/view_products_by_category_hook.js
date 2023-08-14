import { useEffect, useState } from "react";
import { fetchProductsByCategory } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../hooks/useGetData";

const ViewProductsByCategoryHook = (id) => {
  const dispatch = useDispatch();
  const pageCount = useSelector((state) => state.Product.pageCount);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getData(`/products?category=${id}&limit=4`);
        dispatch(fetchProductsByCategory(response, 1));
      } catch (e) {}
      setLoading(false);
    };
    fetchData();
  }, [dispatch, id]);

  const getPage = async (page) => {
    try {
      const response = await getData(
        `/products?category=${id}&limit=4&page=${page}`
      );
      dispatch(fetchProductsByCategory(response, page));
    } catch (e) {}
  };

  return [loading, pageCount, getPage];
};

export default ViewProductsByCategoryHook;
