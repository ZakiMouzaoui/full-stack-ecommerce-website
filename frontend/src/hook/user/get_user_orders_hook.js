import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataWithToken } from "../../hooks/useGetData";
import { GET_ORDERS } from "../../redux/type";

const useGetUserOrdersHook = () => {
  const [loading, setLoading] = useState(false);
  const orders = useSelector((state) => state.Order.orders);
  const filtered = useSelector((state) => state.Order.filtered);
  const dispatch = useDispatch();

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        const res = await getDataWithToken("/orders");
        dispatch({ type: GET_ORDERS, orders: res.data, filtered: res.data });
      } catch (err) {}
      setLoading(false);
    };
    if (!orders) {
      getOrders();
    }
  }, [dispatch, orders]);

  return { loading, orders, filtered };
};

export default useGetUserOrdersHook;
