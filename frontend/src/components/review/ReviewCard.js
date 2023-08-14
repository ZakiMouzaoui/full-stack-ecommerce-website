import { Button, Modal, Spinner } from "react-bootstrap";
import DeleteReviewHook from "../../hook/review/delete_review_hook";
import { useSelector } from "react-redux";
import { memo } from "react";
import EditReviewHook from "../../hook/review/edit_review_hook";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  const {
    comment,
    onCommentChange,
    rating,
    showModal,
    setShowModal,
    loading,
    OnChangeRateValue,
    onSubmitEdit,
    resetForm,
  } = EditReviewHook(review);

  const settings = {
    size: 20,
    count: 5,
    color: "#979797",
    activeColor: "#ffc107",
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      OnChangeRateValue(newValue);
    },
  };

  const user = useSelector((state) => state.Auth.loginUser);

  const stars = [];
  const score = Math.floor(review.rating);
  const hasHalfStar = review.rating % 1 !== 0;

  for (let i = 0; i < score; i++) {
    stars.push(
      <i className="fa fa-star" key={i} style={{ color: "#ffc107" }}></i>
    );
  }
  if (hasHalfStar) {
    stars.push(
      <i className="fa fa-star-half-o" style={{ color: "#ffc107" }}></i>
    );
  }
  for (let i = stars.length; i < 5; i++) {
    stars.push(
      <i className="fa fa-star-o" key={i} style={{ color: "grey" }}></i>
    );
  }

  const { showModalDel, setShowModalDel, loadingDel, onSubmit } =
    DeleteReviewHook(review._id);

  return (
    <div
      className="bg-white p-3 rounded shadow-sm mb-3"
      style={{ maxWidth: "670px" }}
    >
      <div className="d-flex justify-content-between">
        <div>{stars}</div>
        {user && user._id === review.user._id && (
          <div>
            <i
              className="fa fa-edit me-2"
              style={{ color: "#007bff", cursor: "pointer" }}
              onClick={() => setShowModal(true)}
            ></i>
            <i
              className="fa fa-trash"
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => setShowModalDel(true)}
            ></i>
          </div>
        )}
      </div>
      <b>{review.content}</b>
      <div className="mt-3 ">
        <small>
          {formatDate(review.createdAt)} by {review.user.name}
        </small>

        {/* <ReactStars onChange={null}></ReactStars> */}
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <div style={{ textAlign: "center !important" }}>
              Edit your review{" "}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <ReactStars value={rating} {...settings}></ReactStars>
          <textarea
            className="input-form-area p-2 mb-2"
            rows="4"
            cols="5"
            placeholder="Write your comment ..."
            style={{ resize: "none", height: "100px" }}
            onChange={onCommentChange}
            value={comment}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={onSubmitEdit}>
            {loading === true ? (
              <Spinner style={{ width: "20px", height: "20px" }}></Spinner>
            ) : (
              "Edit"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalDel} onHide={() => setShowModalDel(false)}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <div style={{ textAlign: "center !important" }}>
              Confirm your action{" "}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div>Are you sure you want to delete this review?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalDel(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onSubmit}>
            {loadingDel === true ? (
              <Spinner style={{ width: "20px", height: "20px" }}></Spinner>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default memo(ReviewCard);
