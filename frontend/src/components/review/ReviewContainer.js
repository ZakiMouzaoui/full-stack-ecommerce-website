import SubTitle from "../utils/SubTitle";
import rateImg from "../../images/rate.png";
import { memo } from "react";
import ReviewCard from "./ReviewCard";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import AddReviewHook from "../../hook/review/add_review_hook";
import { Container, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import { getData } from "../../hooks/useGetData";
import ServerError500 from "../error/ServerError500";
import NoDocumentFound from "../error/NoDocumentFound";
import { Link } from "react-router-dom";

const ReviewContainer = ({ productId }) => {
  const user = useSelector((state) => state.Auth.loginUser);
  const { loading, comment, onSubmit, OnChangeRateValue } =
    AddReviewHook(productId);

  const { isLoading, data } = useQuery(
    ["reviews", productId],
    () => getData(`/products/${productId}/reviews`),
    {
      retry: 1,
      notifyOnChangeProps: ["data", "isError"],
    }
  );

  const settings = {
    size: 20,
    count: 5,
    color: "#979797",
    activeColor: "#ffc107",
    value: 5,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      OnChangeRateValue(newValue);
    },
  };

  return (
    <Container>
      <div className="d-flex align-items-center">
        <SubTitle title="Reviews"></SubTitle>
        <img
          style={{ width: "20px", height: "20px" }}
          src={rateImg}
          alt="rate"
          className="ms-2 me-1"
        ></img>
        <small>({data && data.data.length} reviews)</small>
      </div>

      {isLoading === true ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner></Spinner>
        </div>
      ) : data ? (
        data.data.length !== 0 ? (
          <>
            {/* DISPLAY ALL REVIEWS */}
            {data.data.map((review, index) => {
              return <ReviewCard review={review} key={index}></ReviewCard>;
            })}

            {/* CHECK IF USER IS LOGGED IN AND HAS NOT ALREADY MADE A REVIEW ABOUT THE PRODUCT */}
            {!user || user.role !== "user" ? (
              <div
                className="d-flex justify-content-center mb-3"
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                <Link to={"/login"}>
                  <button className="shop-now-btn">
                    Please login to post a review
                  </button>
                </Link>
              </div>
            ) : data.data.some((review) => review.user._id === user._id) !==
              true ? (
              <>
                <SubTitle title="Add your review"></SubTitle>
                <div className="bg-white rounded shadow-sm p-3">
                  <div className="d-flex">
                    <div className="mb-2 ms-1">{user.name}</div>
                  </div>
                  <div className="mb-2">
                    <ReactStars {...settings}></ReactStars>
                  </div>
                  <textarea
                    className="input-form-area p-2 mb-2"
                    rows="4"
                    cols="5"
                    placeholder="Write your comment ..."
                    style={{ resize: "none", height: "100px" }}
                    ref={comment}
                  />
                  <div
                    className="product-cart-add d-inline-block text-center py-2 px-3"
                    onClick={onSubmit}
                  >
                    {loading === true ? (
                      <Spinner
                        style={{ height: "20px", width: "20px" }}
                      ></Spinner>
                    ) : (
                      "Add review"
                    )}
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            {/* WHEN THERE IS NO REVIEWS */}
            <div className="d-flex flex-column align-items-center mb-3">
              <NoDocumentFound></NoDocumentFound>
              <h5 className="m-0">No reviews for this product yet</h5>
            </div>

            {/* TO CHECK IF USER IS NOT LOGGED IN OR USER ROLE IS NOT USER*/}
            {!user || user.role !== "user" ? (
              <div
                className="d-flex justify-content-center mb-3"
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                <Link to={"/login"}>
                  <button className="shop-now-btn">
                    Please login to post a review
                  </button>
                </Link>
              </div>
            ) : (
              // REVIEW FORM
              <>
                <SubTitle title="Add your review"></SubTitle>
                <div className="bg-white rounded shadow-sm p-3">
                  <div className="d-flex">
                    <div className="mb-2 ms-1">{user.name}</div>
                  </div>
                  <div className="mb-2">
                    <ReactStars {...settings}></ReactStars>
                  </div>
                  <textarea
                    className="input-form-area p-2 mb-2"
                    rows="4"
                    cols="5"
                    placeholder="Write your comment ..."
                    style={{ resize: "none", height: "100px" }}
                    ref={comment}
                  />
                  <div
                    className="product-cart-add d-inline-block text-center py-2 px-3"
                    onClick={onSubmit}
                  >
                    {loading === true ? (
                      <Spinner
                        style={{ height: "20px", width: "20px" }}
                      ></Spinner>
                    ) : (
                      "Add review"
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )
      ) : (
        <div style={{ height: "60vh" }}>
          <ServerError500></ServerError500>
        </div>
      )}
    </Container>
  );
};

export default memo(ReviewContainer);
