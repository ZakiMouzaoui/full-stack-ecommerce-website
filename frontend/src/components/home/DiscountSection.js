import { Col, Container, Row } from "react-bootstrap";
import laptops from "../../images/laptops.png";
import { memo } from "react";

const DiscountSection = () => {
  return (
    <Container className="mt-2">
      <Row className="align-items-center justify-content-center mx-2 py-1 discount-backcolor">
        <Col sm="12" md="6" className="d-flex justify-content-center">
          <img
            className="d-block"
            src={laptops}
            alt=""
            style={{
              margin: "auto",
              height: "90px",
              width: "180px",
            }}
          ></img>
        </Col>
        <Col className="text-center">
          <div className="discount-title">
            A discount up to 30% for laptop devices{" "}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(DiscountSection);
