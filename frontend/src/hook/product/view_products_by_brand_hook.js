import { useEffect, useState } from "react";
import { fetchProductsByBrand } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../hooks/useGetData";

const ViewProductsByBrandHook = (id) => {
  const dispatch = useDispatch();
  const pageCount = useSelector((state) => state.Product.pageCount);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // dispatch({
        //   type: GET_BRAND,
        //   brand,
        // });
        // const brand = await getData(`/brands/${id}`);

        const response = await getData(`/products?brand=${id}&limit=4`);
        dispatch(fetchProductsByBrand(response));
      } catch (e) {}
      setLoading(false);
    };
    fetchData();
  }, []);

  const getPage = async (page) => {
    try {
      const response = await getData(
        `/products?brand=${id}&limit=4&page=${page}`
      );
      dispatch(fetchProductsByBrand(response));
    } catch (e) {}
  };

  return [loading, pageCount, getPage];
};

export default ViewProductsByBrandHook;
