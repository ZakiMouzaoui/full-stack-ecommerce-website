import { toast } from "react-toastify";
import deleteData from "../../hooks/useDeleteData";
import { GET_ADDRESSES, SET_SHIPPING } from "../../redux/type";
import { useDispatch } from "react-redux";
import { useState } from "react";

const DeleteAddressHook = (address) => {
  const [showModalDel, setShowModalDel] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);

  const dispatch = useDispatch();

  const onSubmitDel = async () => {
    setLoadingDel(true);
    toast.dismiss();
    try {
      const res = await deleteData(`/addresses/${address._id}`);
      dispatch({ type: GET_ADDRESSES, addresses: res.data });
      dispatch({ type: SET_SHIPPING, shippingAddress: res.shippingAddress });

      toast.success("Address deleted successfully!");
      setShowModalDel(false);
    } catch (error) {
      if (error.code !== "ERR_NETWORK") {
        if (error.response.data.errors) {
          const set = new Set();

          error.response.data.errors.forEach((err) => {
            if (!set.has(err.param)) {
              toast.error(err.msg, {
                position: toast.POSITION.TOP_RIGHT,
              });
              set.add(err.param);
            }
          });
        }
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Something went wrong. Please try again", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
    setLoadingDel(false);
  };

  return {
    loadingDel,
    showModalDel,
    setShowModalDel,

    onSubmitDel,
  };
};

export default DeleteAddressHook;
