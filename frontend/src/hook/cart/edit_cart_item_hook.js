import { useRef } from "react";
import { updateData } from "../../hooks/useUpdateData";
import { useDispatch } from "react-redux";
// import { GET_CART } from "../../redux/type";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { APPLY_COUPON } from "../../redux/type";

const EditCartItemHook = (item) => {
  // const [qty, setQty] = useState(item.quantity);
  // const [loading, setLoading] = useState(false);
  const qty = useRef(item.quantity);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    "cart-query",
    (quantity) => {
      return updateData(`/cart/${item._id}`, { quantity });
    },
    {
      onSuccess: (res) => {
        dispatch({
          type: APPLY_COUPON,
          discount: null,
          totalPriceAfterDiscount: null,
        });
        queryClient.setQueryData("cart-query", (_) => {
          return {
            totalItems: res.totalItems,
            data: res.data,
            totalCartPrice: res.totalPrice,
            totalCartPriceAfterDiscount: null,
            discount: 0,
            coupon: null,
          };
        });
      },
    }
  );

  const onQtyChange = async (e) => {
    const quantity = e.target.value;
    // setQty(quantity);
    qty.current = quantity;

    toast.dismiss();
    mutation.mutate(quantity);
    // setLoading(true);
    // try {
    //   const res = await updateData(`/cart/${item._id}`, { quantity });

    //   dispatch({
    //     type: GET_CART,
    //     data: res.data,
    //     totalItems: res.totalItems,
    //     totalCartPrice: res.totalPrice,
    //     totalPriceAfterDiscount: null,
    //   });
    //   toast.success("Cart item edited successfully!");
    // } catch (err) {}
    // setLoading(false);

    // if (value <= 0) {
    //   setQty(1);
    // } else {
    //   setQty(e.target.value);
    // }
  };

  // const onSubmit = async () => {
  //   toast.dismiss();
  //   setLoading(true);
  //   try {
  //     const res = await updateData(`/cart/${item._id}`, { quantity: qty });
  //     console.log(res);
  //     dispatch({
  //       type: GET_CART,
  //       data: res.data,
  //       totalItems: res.totalItems,
  //       totalCartPrice: res.totalPrice,
  //       totalPriceAfterDiscount: null,
  //     });
  //     toast.success("Cart item edited successfully!");
  //   } catch (err) {}
  //   setLoading(false);
  // };

  return { loading: mutation.isLoading, onQtyChange, qty };
};

export default EditCartItemHook;
