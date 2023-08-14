import { useState } from "react";
// import jwt from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getDataWithToken } from "../../hooks/useGetData";
import { GET_ADDRESSES, GET_WISHLIST, LOGIN_USER } from "../../redux/type";
import { useQuery } from "react-query";

const ProtectedRouteHook = () => {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);
  const [enabled, setEnabled] = useState(true);

  // useEffect(() => {
  //   const getAccount = async () => {
  //     try {
  //       // await new Promise((res) => setTimeout(res, 1500));
  //       const res = await getDataWithToken("/users/account");

  //       dispatch({ type: LOGIN_USER, user: res.user });
  //     } catch (err) {
  //       console.log(err);
  //       dispatch({ type: LOGIN_USER, user: null });
  //     }
  //     setLoading(false);
  //   };

  //   getAccount();
  // }, [dispatch]);

  // const token = localStorage.getItem("token")

  // const [enabled, setEnabled] = useState(true);
  // const token = localStorage.getItem("token");
  const user = useSelector((state) => state.Auth.loginUser);

  const { isLoading } = useQuery(
    ["account"],
    () => getDataWithToken("/users/account"),
    {
      onSuccess: (data) => {
        // console.log(data.user);

        dispatch({ type: LOGIN_USER, user: data.user });
        dispatch({ type: GET_WISHLIST, payload: data.user.wishlist });
        dispatch({
          type: GET_ADDRESSES,
          addresses: data.user.addresses,
          shippingAddress: data.user.shippingAddress,
        });

        setEnabled(false);

        // setEnabled(true);
      },
      onError: (_err) => {
        // console.log(_err);

        dispatch({ type: LOGIN_USER, user: null });
        dispatch({ type: GET_WISHLIST, payload: [] });
        setEnabled(false);

        // setEnabled(false);
      },
      retry: false,
      enabled,
      refetchOnWindowFocus: enabled,
      notifyOnChangeProps: ["data"],
      // refetchInterval: 10000,
      // refetchInterval: 0,
      // refetchOnMount: false,
    }
  );

  return { user, isLoading };
};

export default ProtectedRouteHook;
