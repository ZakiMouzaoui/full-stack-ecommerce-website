import { useRef, useState } from "react";
import { insertData } from "../../hooks/useInsertData";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";

const AddReviewHook = (prodId) => {
  const comment = useRef("");
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);

  // const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const OnChangeRateValue = (value) => {
    setRating(value);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await insertData(`/products/${prodId}/reviews`, {
        content: comment.current.value,
        rating,
      });

      queryClient.setQueriesData(["reviews", prodId], (oldQuery) => {
        return {
          data: [res, ...oldQuery.data],
        };
      });
      queryClient.invalidateQueries(["products", prodId]);
      toast.success("Your review was added successfully!");
      comment.current.value = "";
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    resetForm();
  };

  const resetForm = () => {
    comment.current.value = "";
    setRating(5);
  };

  return {
    loading,

    OnChangeRateValue,
    onSubmit,
    comment,
  };
};

export default AddReviewHook;
