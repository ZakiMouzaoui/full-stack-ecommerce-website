import { useState } from "react";
import { insertData } from "../../hooks/useInsertData";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { GET_CART, LOGIN_USER } from "../../redux/type";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { APPLY_COUPON } from "../../redux/type";

const AddToCartHook = (productId) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [color, setColor] = useState("");

  const onColorChange = (color) => {
    setColor(color);
  };

  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (item) => {
      return insertData("/cart", item);
    },
    onSuccess: (data) => {
      dispatch({
        type: APPLY_COUPON,
        discount: null,
        totalPriceAfterDiscount: null,
      });
      queryClient.setQueryData("cart-query", (_) => {
        return {
          data: data.data,
          totalCartPrice: data.totalCartPrice,
          totalCartPriceAfterDiscount: data.totalCartPriceAfterDiscount,
          discount: 0,
          totalItems: data.totalItems,
          coupon: null,
        };
      });

      navigate("/cart");
    },
  });

  // const onSubmit = async () => {

  //   try {
  //     if (!color || color === "") {
  //       toast.error("Please select a color");
  //     } else {
  //       const res = await insertData("/cart", {
  //         productId,
  //         color,
  //       });

  //       console.log(res.data);

  //       dispatch({
  //         type: GET_CART,
  //         data: res.data,
  //         totalItems: res.totalItems,
  //         totalCartPrice: res.totalCartPrice,
  //         totalPriceAfterDiscount: null,
  //       });
  //       // toast.success("Product added to cart!");
  //       navigate("/cart");
  //       setShowModal(false);
  //     }
  //   } catch (err) {
  //     if (err?.response?.status === 401) {
  //       navigate("/login");
  //       dispatch({ type: LOGIN_USER, user: null });
  //     }
  //   }
  //   setLoading(false);
  // };

  const onSubmit = () => {
    if (color === "" || !color) {
      toast.error("Please select a color");
    } else {
      mutation.mutate({ productId, color });
    }
  };

  return {
    color,
    onColorChange,
    onSubmit,
    showModal,
    setShowModal,
    loading: mutation.isLoading,
  };
};

export default AddToCartHook;
