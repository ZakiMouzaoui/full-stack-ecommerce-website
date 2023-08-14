import { useEffect, useState } from "react";
import { getDataWithToken } from "../../hooks/useGetData";
import { useDispatch } from "react-redux";
import { GET_COUPONS } from "../../redux/type";

const AllCouponsHook = () => {
  const [loading, setLoading] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        const res = await getDataWithToken("/coupons");
        console.log(res);
        dispatch({ type: GET_COUPONS, coupons: res.data, filtered: res.data });
      } catch (err) {
        setIsServerError(true);
      }
      setLoading(false);
    };
    fetchCoupons();
  }, [dispatch]);

  return { loading, isServerError };
};

export default AllCouponsHook;
