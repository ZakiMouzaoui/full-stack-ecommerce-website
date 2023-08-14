import { memo } from "react";
import { Col, Row } from "react-bootstrap";

const OrderItem = ({ item }) => {
  const imgUrl = item.product.images
    ? `http://127.0.0.1:8000/products/${item.product.images[0]}`
    : "";
  return (
    <Row className="d-flex w-100 align-items-center">
      <Col
        // style={{ background: "green" }}
        className="d-flex align-items-center"
        xs={12}
        md={12}
        lg={8}
      >
        <div className="me-2">
          <img alt="" src={imgUrl} style={{ height: "120px" }}></img>
        </div>

        <div>
          <p>
            <b>{item.product.name}</b>
          </p>

          <div className="d-flex align-items-center">
            color:{" "}
            <div
              className="ms-2"
              style={{
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                background: item.color,
              }}
            ></div>
          </div>

          <div className="d-flex align-items-center mb-2">
            <i className="fa fa-star" style={{ color: "gold" }}></i>
            <div className="ms-2 card-rate">{item.product.avgRating}</div>
          </div>
        </div>
      </Col>

      <Col xs={3} md={3} lg={1} className="p-0 ms-2-xs">
        <div>
          <div>Quantity</div>

          <input
            type="number"
            className="user-input p-2 w-100"
            defaultValue={item.quantity}
            disabled
            // style={{ width: "50px" }}
          ></input>
        </div>
      </Col>
      <Col
        xs={9}
        md={9}
        lg={3}
        className="d-flex justify-content-end p-0"
        // style={{ background: "blue" }}
      >
        <div className="card-price">{item.price} $</div>
      </Col>
    </Row>
  );
};

export default memo(OrderItem);
