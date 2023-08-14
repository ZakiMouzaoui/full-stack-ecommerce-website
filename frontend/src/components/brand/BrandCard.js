import { Card, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GET_BRAND } from "../../redux/type";

const BrandCard = ({ data, img }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type: GET_BRAND,
      brand: data,
    });
  };

  return (
    <Col xs="6" sm="6" md="4" lg="2" className="p-2">
      <Card
        style={{
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
          height: "170px",
          width: "100%",
        }}
      >
        <Link to={`/products/brand/${data._id}`} onClick={handleClick}>
          <img
            style={{ width: "100%", height: "170px" }}
            className="rounded p-3"
            alt={img}
            src={img}
          ></img>
        </Link>
      </Card>
    </Col>
  );
};

export default BrandCard;
