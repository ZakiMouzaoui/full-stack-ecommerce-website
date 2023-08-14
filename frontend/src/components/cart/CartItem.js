import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import EditCartItemHook from "../../hook/cart/edit_cart_item_hook";
import { Fragment, memo } from "react";
import { Link } from "react-router-dom";
import DeleteCartItemHook from "../../hook/cart/delete_cart_itel_hook";
import { useDispatch } from "react-redux";
import { GET_PRODUCT } from "../../redux/type";

const CartItem = ({ item }) => {
  const imgUrl = `http://127.0.0.1:8000/products/${item.imageCover}`;

  const { loading, qty, onQtyChange } = EditCartItemHook(item);
  const { loadingDel, showModal, setShowModal, onSubmitDel } =
    DeleteCartItemHook(item._id);
  const qtyArray = Array.from(
    { length: item.product.quantity },
    (_, index) => index + 1
  );

  const dispatch = useDispatch();

  const navigateToDetails = () => {
    dispatch({ type: GET_PRODUCT, product: item.product });
  };

  return (
    <Fragment>
      <Row className="d-flex bg-white rounded shadow-sm justify-content-between align-items-center mb-3 p-3">
        {/* for the image and text */}
        <Col
          xs={10}
          md={8}
          lg={8}
          className="d-flex align-items-center"
          // style={{ background: "green" }}
        >
          <Row className="d-flex align-items-center">
            <Col xs={6}>
              <Link
                to={`/product/${item.product._id}`}
                onClick={navigateToDetails}
              >
                <div>
                  <img
                    className="me-3"
                    alt=""
                    src={imgUrl}
                    style={{ height: "100%", width: "100%", display: "block" }}
                  ></img>
                </div>
              </Link>
            </Col>

            <Col xs={6} className="mt-sm-2 mt-md-0 mt-xs-2">
              <div>
                <h5>{item.product.name}</h5>

                <div className="d-flex align-items-center mb-2">
                  color:{" "}
                  <div
                    className="ms-2"
                    style={{
                      height: "20px",
                      width: "30px",
                      // borderRadius: "50%",
                      border: "1px solid grey",
                      background: item.color,
                    }}
                  ></div>
                </div>

                <div className="d-flex mb-2">
                  <i className="fa fa-star" style={{ color: "gold" }}></i>
                  <div className="ms-2 card-rate">{4.8}</div>
                </div>

                <div className="card-price mt-2">{item.price} $</div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowModal(true)}
                >
                  <i className="fa fa-trash me-2" style={{ color: "red" }}>
                    {" "}
                  </i>
                  <small>remove</small>
                </div>
              </div>
            </Col>
          </Row>
        </Col>

        <Col
          xs={2}
          md={4}
          lg={4}
          className="d-flex justify-content-end mt-xs-3 mt-2 mt-sm-2 mt-lg-0 p-0"
        >
          {loading === true ? (
            <Spinner style={{ height: "25px", width: "25px" }}></Spinner>
          ) : (
            <div>
              <div>Quantity</div>
              <select onChange={onQtyChange} className="p-2 w-100">
                {qtyArray.map((i) => (
                  <option
                    value={i}
                    selected={i.toString() === qty.current.toString()}
                  >
                    {i}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* <Button
              className="btn btn-dark"
              // style={{ marginLeft: "3%" }}
              onClick={onSubmit}
              disabled={loading === true}
            >
              {loading === true ? (
                <Spinner style={{ height: "20px", width: "20px" }}></Spinner>
              ) : (
                "Edit"
              )}
            </Button> */}
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <div style={{ textAlign: "center !important" }}>
              Confirm your action{" "}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div>Are you sure you want to delete this item?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onSubmitDel}>
            {loadingDel === true ? (
              <Spinner style={{ width: "20px", height: "20px" }}></Spinner>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
export default memo(CartItem);
