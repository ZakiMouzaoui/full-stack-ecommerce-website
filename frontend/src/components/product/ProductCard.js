import { Button, Card, Col, Modal, Spinner } from "react-bootstrap";
import rateImg from "../../images/rate.png";
import { Link } from "react-router-dom";
import { memo, useState } from "react";
import ProductCardHook from "../../hook/product/product_card_hook";
import AddToCartHook from "../../hook/cart/add_item_to_cart";
import { useDispatch } from "react-redux";
import { GET_PRODUCT } from "../../redux/type";

const ProductCard = ({
  product,
  wishlist,
  lg = 3,
  md = 6,
  sm = 6,
  xs = 12,
}) => {
  const [img, setImg] = useState(
    `http://127.0.0.1:8000/products/${product.images[0]}`
  );

  const { isFav, handleFav } = ProductCardHook(product, wishlist);
  const {
    color: selectedColor,
    onColorChange,
    onSubmit,
    showModal,
    setShowModal,
    loading,
  } = AddToCartHook(product._id);

  const handleClose = () => {
    setShowModal(false);
  };

  const onMouseEnterEvent = (e) => {
    setImg(`http://127.0.0.1:8000/products/${product.images[1]}`);
  };

  const onMouseLeaveEvent = (e) => {
    setImg(`http://127.0.0.1:8000/products/${product.images[0]}`);
  };

  const dispatch = useDispatch();

  const onClick = () => {
    dispatch({ type: GET_PRODUCT, product });
  };

  return (
    <Col xs={xs} sm={sm} md={md} lg={lg} xg="2" className="p-2 g-0">
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <div style={{ textAlign: "center !important" }}>
              Choose a color{" "}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="d-flex justify-content-center">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className="me-2"
                style={{
                  height: selectedColor === color ? "35px" : "30px",
                  width: selectedColor === color ? "35px" : "30px",
                  borderRadius: "50%",
                  border: "1px solid black",
                  cursor: "pointer",
                  background: `${color}`,
                }}
                onClick={() => onColorChange(color)}
              ></div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={onSubmit}>
            {loading === true ? (
              <Spinner style={{ width: "20px", height: "20px" }}></Spinner>
            ) : (
              "Add to cart"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <Card
        style={{
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#F8F8F8",
          boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
          height: "370px",
        }}
      >
        <Link to={`/product/${product._id}`}>
          <img
            src={img}
            alt="product"
            style={{
              width: "100%",
              margin: "auto",
              height: "300px",
            }}
            onMouseEnter={onMouseEnterEvent}
            onMouseLeave={onMouseLeaveEvent}
            onClick={onClick}
          />
        </Link>

        <i
          className={isFav ? "fa fa-heart p-1" : "fa fa-heart-o p-1 "}
          style={{
            color: "red",
            fontSize: "1.4rem",
            cursor: "pointer",
            position: "absolute",
            top: 12,
            right: 12,
            // borderRadius: "50%",
          }}
          onClick={handleFav}
        ></i>
        {product.quantity > 0 ? (
          <i
            className="fa fa-shopping-cart p-1"
            style={{
              fontSize: "1.2rem",
              cursor: "pointer",
              position: "absolute",
              top: 12,
              left: 12,
            }}
            onClick={() => setShowModal(true)}
          ></i>
        ) : (
          <div
            className="p-1 rounded"
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "red",
              color: "white",
            }}
          >
            Out of stock
          </div>
        )}

        <Card.Body className="py-0">
          <Card.Title className="card-title">{product.name}</Card.Title>

          <Card.Text>
            <div className="d-flex justify-content-between align-items-start mb-2">
              {product.avgRating !== 0 && (
                <div className="d-flex card-rate mt-1 align-items-center">
                  <img
                    className="me-2"
                    style={{ height: "16px", width: "16px" }}
                    alt=""
                    src={rateImg}
                  ></img>
                  <div className="text-center">
                    {product.avgRating.toFixed(1)}
                  </div>
                </div>
              )}

              {product.priceAfterDiscount ? (
                <div className="d-flex">
                  <div
                    className="ms-1"
                    style={{
                      textDecoration: "line-through",
                    }}
                  >
                    {product.price} $
                  </div>
                  <p className="card-price m-0">
                    {product.priceAfterDiscount} $
                  </p>
                </div>
              ) : (
                <div className="card-price m-0">{product.price} $</div>
              )}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default memo(ProductCard);
