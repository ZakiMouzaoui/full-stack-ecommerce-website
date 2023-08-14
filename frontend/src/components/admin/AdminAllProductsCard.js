import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import itemImg from "../../images/item.png";
import rateImg from "../../images/rate.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const AdminAllProductsCard = ({ item }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handelDelete = () => {
    setShow(true);
  };

  return (
    <Col xs="12" sm="6" md="4" lg="3" xg="2">
      {/* DELETE PRODUCT MODAL */}
      <Modal show={show} onHide={handleClose}>
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
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handelDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ADD PRODUCT MODAL */}
      <Card
        className="my-2"
        style={{
          borderRadius: "8px",
          minWidth: "170px",
          border: "none",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
        }}
      >
        <div className="d-flex justify-content-between pt-3 px-3">
          <Link to="/admin/edit-product">
            <i class="fa fa-edit" style={{ color: "#007bff" }}></i>
          </Link>
          <div style={{ cursor: "pointer" }} onClick={handelDelete}>
            <i class="fa fa-trash" style={{ color: "red" }}></i>
          </div>
        </div>
        <Card.Img
          style={{ height: "100%", width: "100%" }}
          loading="lazy"
          src={itemImg}
        ></Card.Img>
        <Card.Body className="py-0">
          <Card.Title className="card-title">{item.name}</Card.Title>

          <Card.Text>
            <div className="d-flex justify-content-between">
              <div className="d-flex card-rate mt-1">
                <img
                  className="me-2"
                  style={{ height: "16px", width: "16px" }}
                  alt=""
                  src={rateImg}
                ></img>
                <p>{item.avgRating}</p>
              </div>

              <div className="card-price">{item.price} $</div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AdminAllProductsCard;
