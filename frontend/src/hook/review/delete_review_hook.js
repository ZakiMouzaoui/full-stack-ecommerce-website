import { useState } from "react";
import deleteData from "../../hooks/useDeleteData";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";

const DeleteReviewHook = (id) => {
  const { id: prodId } = useParams("id");
  const [showModalDel, setShowModalDel] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSubmit = async () => {
    setLoadingDel(true);
    try {
      const res = await deleteData(`/products/${prodId}/reviews/${id}`);

      queryClient.setQueriesData(["reviews", prodId], (old) => {
        return {
          data: old.data.filter(
            (review) => review._id.toString() !== res.data._id.toString()
          ),
        };
      });

      setShowModalDel(false);
    } catch (err) {
      console.log(err);
      if (err.response.data.message === "jwt expired") {
        navigate("/login");
      }
    }
    setLoadingDel(false);
  };

  return { showModalDel, setShowModalDel, loadingDel, onSubmit };
};
export default DeleteReviewHook;
