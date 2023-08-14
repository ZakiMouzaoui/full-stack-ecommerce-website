import { useState } from "react";
import { toast } from "react-toastify";
import { updateData } from "../../hooks/useUpdateData";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

const EditReviewHook = (review) => {
  const [comment, setComment] = useState(review.content);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const { id: prodId } = useParams("id");

  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  const OnChangeRateValue = (value) => {
    setRating(value);
  };

  const onSubmitEdit = async () => {
    setLoading(true);
    try {
      const res = await updateData(
        `/products/${prodId}/reviews/${review._id}`,
        {
          content: comment,
          rating,
        }
      );

      queryClient.setQueriesData(["reviews", prodId], (old) => {
        return {
          data: old.data.map((review) =>
            review._id === res._id ? res : review
          ),
        };
      });

      toast.success("Your review was edited successfully!");
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setComment(review.content);
    setRating(review.rating);
    setShowModal(false);
  };

  return {
    comment,
    onCommentChange,
    rating,
    showModal,
    setShowModal,
    loading,
    OnChangeRateValue,
    onSubmitEdit,
    resetForm,
  };
};

export default EditReviewHook;
