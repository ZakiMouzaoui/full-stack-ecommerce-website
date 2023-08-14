// import { useState } from "react";
import deleteData from "../../hooks/useDeleteData";
import { useDispatch } from "react-redux";
// import { GET_CART, LOGIN_USER } from "../../redux/type";
// import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { APPLY_COUPON } from "../../redux/type";

const ClearUserCartHook = () => {
  // const [loadingDel, setLoadingDel] = useState(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (_) => {
      return deleteData("/cart");
    },
    onSuccess: (_) => {
      dispatch({
        type: APPLY_COUPON,
        discount: null,
        totalPriceAfterDiscount: null,
        coupon: null,
      });
      queryClient.setQueryData("cart-query", (oldQuery) => {
        return {
          ...oldQuery,
          data: [],
          totalItems: 0,
        };
      });
    },
    onError: (err) => {},
  });

  const onClear = async () => {
    // setLoadingDel(true);
    // try {
    //   await deleteData("/cart");
    //   dispatch({
    //     type: GET_CART,
    //     data: [],
    //     totalItems: 0,
    //     totalCartPrice: 0,
    //     totalCartPriceAfterDiscount: null,
    //   });
    // } catch (err) {
    //   if (err?.response?.status === 401) {
    //     navigate("/login");
    //     dispatch({ type: LOGIN_USER, user: null });
    //   }
    // }
    // setLoadingDel(false);
    mutation.mutate();
  };

  return { loadingDel: mutation.isLoading, onClear };
};

export default ClearUserCartHook;
