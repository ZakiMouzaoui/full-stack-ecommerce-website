import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBrands } from "../../redux/actions/brandAction";
import { getData } from "../../hooks/useGetData";

const HomeBrandHook = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const brands = useSelector((state) => state.Brand.brands);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getData(`/brands`);
        dispatch(fetchBrands(response.data));
      } catch (error) {}
      setLoading(false);
    };

    if (!brands) {
      fetchData();
    }
  }, [dispatch, brands]);

  return [brands, loading];
};

export default HomeBrandHook;
