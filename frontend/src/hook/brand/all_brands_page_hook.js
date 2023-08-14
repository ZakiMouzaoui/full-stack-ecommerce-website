import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../redux/actions/brandAction";
import { getData } from "../../hooks/useGetData";
import { GET_ERROR } from "../../redux/type";

const AllBrandsPageHook = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

  const brands = useSelector((state) => state.Brand.brands);
  const filtered = useSelector((state) => state.Brand.filtered);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getData(`/brands`);

        dispatch(fetchBrands(response.data));
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
  }, [dispatch]);

  return [loading, brands, filtered, isServerError];
};

export default AllBrandsPageHook;
