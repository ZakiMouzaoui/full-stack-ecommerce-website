import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/actions/productAction";
import { toast } from "react-toastify";
import deleteData from "../../hooks/useDeleteData";

const DeleteProductHook = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onConfirm = async (id) => {
    setLoading(true);
    setIsPressed(true);
    toast.dismiss();
    try {
      const response = await deleteData(`/products/${id}`);

      dispatch(deleteProduct(response.data));
      toast.success("Product deleted successfully!");
      setShowModal(false);
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
      }
    }
    setLoading(false);
    setIsPressed(false);
  };

  return [loading, isPressed, onConfirm, showModal, setShowModal];
};

export default DeleteProductHook;
