import { useState } from "react";
import deleteData from "../../hooks/useDeleteData";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
// import { GET_CART } from "../../redux/type";
import { useMutation, useQueryClient } from "react-query";
import { APPLY_COUPON } from "../../redux/type";

const DeleteCartItemHook = (id) => {
  // const [loadingDel, setLoadingDel] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: (id) => {
      return deleteData(`/cart/${id}`);
    },
    onSuccess: (data) => {
      queryClient.setQueriesData("cart-query", (_) => {
        return {
          data: data.data,
          totalCartPrice: data.totalPrice,
          totalCartPriceAfterDiscount: data.totalCartPriceAfterDiscount,
          discount: 0,
          totalItems: data.totalItems,
          coupon: null,
        };
      });
      dispatch({
        type: APPLY_COUPON,
        discount: null,
        totalPriceAfterDiscount: null,
      });
      toast.success("Item was deleted from cart!");
      setShowModal(false);
    },
  });

  const queryClient = useQueryClient();

  const onSubmitDel = async () => {
    // // setLoadingDel(true);
    // try {
    //   const res = await deleteData(`/cart/${id}`);
    //   dispatch({
    //     type: GET_CART,
    //     data: res.data,
    //     totalItems: res.totalItems,
    //     totalCartPrice: res.totalPrice,
    //     totalPriceAfterDiscount: null,
    //   });
    //   toast.success("Item was deleted from cart!");
    // } catch (err) {}

    // setShowModal(false);
    mutation.mutate(id);
  };

  return {
    loadingDel: mutation.isLoading,
    showModal,
    setShowModal,
    onSubmitDel,
  };
};

export default DeleteCartItemHook;
