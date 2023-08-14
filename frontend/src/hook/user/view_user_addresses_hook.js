import { useEffect, useState } from "react";
import { getDataWithToken } from "../../hooks/useGetData";
import { useDispatch, useSelector } from "react-redux";
import { GET_ADDRESSES } from "../../redux/type";
import { useNavigate } from "react-router-dom";

const ViewUserAddressesHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addresses = useSelector((state) => state.Address.addresses);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAddresses = async () => {
      try {
        const res = await getDataWithToken("/addresses");
        dispatch({
          type: GET_ADDRESSES,
          addresses: res.data,
          shippingAddress: res.shippingAddress,
        });
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          navigate("/login");
        }
      }
      setLoading(false);
    };
    getAddresses();
  }, [dispatch, navigate]);

  return { addresses, loading };
};

export default ViewUserAddressesHook;
