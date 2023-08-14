// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { getDataWithToken } from "../../hooks/useGetData";
// import { GET_CART } from "../../redux/type";
import { useQuery } from "react-query";
// import { useNavigate } from "react-router-dom";

const GetUserCartHook = () => {
  // const totalItems = useSelector((state) => state.Cart.totalItems);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getCartItems = async () => {
  //     try {
  //       const res = await getDataWithToken("/cart");

  //       dispatch({
  //         type: GET_CART,
  //         data: res.data,
  //         totalItems: res.totalItems,
  //         totalCartPrice: res.totalCartPrice,
  //         totalPriceAfterDiscount: null,
  //       });
  //     } catch (err) {
  //       // if (window.location.pathname === "/cart") {
  //       //   if (err?.response?.status === 401) {
  //       //     navigate("/login");
  //       //   }
  //       // }
  //       console.log(err);
  //     }
  //     setLoading(false);
  //   };

  //   getCartItems();
  // }, [dispatch]);

  const { data } = useQuery("cart-query", () => getDataWithToken("/cart"), {
    // staleTime: 300000,
    cacheTime: Infinity,
    notifyOnChangeProps: ["data"],
  });

  console.log(data);

  return { data };
};

export default GetUserCartHook;
