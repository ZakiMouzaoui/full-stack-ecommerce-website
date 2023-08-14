import { Card, Col, Spinner } from "react-bootstrap";
// import favImg from "../../images/fav-off.png";
import rateImg from "../../images/rate.png";
import { Link, useNavigate } from "react-router-dom";
import { memo, useState } from "react";
import deleteData from "../../hooks/useDeleteData";
import { useDispatch } from "react-redux";
import {
  GET_PRODUCT,
  LOGIN_USER,
  REMOVE_FROM_WISHLIST,
} from "../../redux/type";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";

const WishlistProductCard = ({ product }) => {
  const imgUrl = product.imageCover
    ? `http://127.0.0.1:8000/products/${product.images[0]}`
    : "";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteFromFav = async () => {
    toast.dismiss();
    setLoading(true);
    try {
      await deleteData(`/wishlist/${product._id}`);
      dispatch({ type: REMOVE_FROM_WISHLIST, payload: product });
      queryClient.setQueryData("wishlist-items", (oldQuery) => {
        return {
          data: oldQuery.data.filter((item) => item._id !== product._id),
        };
      });
      toast.success("Product removed from wishlist!");
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/login");
        dispatch({ type: LOGIN_USER, user: null });
      }
    }
    setLoading(false);
  };

  const navigateToDetails = () => {
    dispatch({ type: GET_PRODUCT, product });
  };

  return (
    <Col xs="12" sm="6" md="12" lg="4" xg="3" className="d-flex">
      <Card
        className="my-2"
        style={{
          width: "100%",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
        }}
      >
        {loading === false ? (
          <i
            className="fa fa-trash p-3"
            style={{
              color: "red",
              fontSize: "1.2rem",
              cursor: "pointer",
              position: "absolute",
              top: 0,
              right: 0,
            }}
            onClick={deleteFromFav}
          ></i>
        ) : (
          <Spinner
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              width: "25px",
              height: "25px",
              // padding: "10px",
            }}
          ></Spinner>
        )}
        <i
          className="fa fa-shopping-cart p-3"
          style={{
            fontSize: "1.2rem",
            cursor: "pointer",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          onClick={deleteFromFav}
        ></i>
        <Link to={`/product/${product._id}`} onClick={navigateToDetails}>
          <Card.Img
            src={imgUrl}
            alt="product"
            style={{
              width: "100%",
              margin: "auto",
            }}
          />
        </Link>

        <Card.Body className="py-0">
          <Card.Title className="card-title">{product.name}</Card.Title>

          <Card.Text>
            <div className="d-flex justify-content-between">
              <div className="d-flex card-rate mt-1">
                <img
                  className="me-2"
                  style={{ height: "16px", width: "16px" }}
                  alt=""
                  src={rateImg}
                ></img>
                <p>{product.avgRating}</p>
              </div>

              {product.priceAfterDiscount ? (
                <div className="d-flex">
                  <p style={{ textDecoration: "line-through" }}>
                    {product.price} $
                  </p>
                  <p className="card-price">{product.priceAfterDiscount} $</p>
                </div>
              ) : (
                <p className="card-price">{product.price} $</p>
              )}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default memo(WishlistProductCard);
