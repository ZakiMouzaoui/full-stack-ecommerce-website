import { Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  CHANGE_MAX_PRICE,
  CHANGE_MIN_PRICE,
  CHECK_BRAND,
  CHECK_CATEGORY,
  SEARCH_KEYWORD,
} from "../../redux/type";

const CategoryCard = ({ icon, name, id }) => {
  const imgUrl = icon ? `http://127.0.0.1:8000/categories/${icon}` : "";

  const dispatch = useDispatch();

  const navigateToCategory = () => {
    dispatch({ type: SEARCH_KEYWORD, keyword: "" });
    dispatch({ type: CHECK_CATEGORY, category: id });
    dispatch({ type: CHECK_BRAND, checkedBrands: [] });
    dispatch({ type: CHANGE_MAX_PRICE, price: null });
    dispatch({ type: CHANGE_MIN_PRICE, price: null });
    dispatch({ type: "CHANGE_PAGE", page: 1 });
  };

  return (
    <Col xs="6" sm="4" md="3" lg="2" className="mt-3">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div
          className="category-card"
          style={{
            border: "1px solid black",
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <Link
            style={{ textDecoration: "none" }}
            to={`/results?category=${id}`}
            onClick={navigateToCategory}
          >
            <img className="category-card-img" src={imgUrl} alt=""></img>
          </Link>
        </div>
        <div style={{ maxWidth: "80%" }}>
          <p className="category-card-text my-2 text-center">{name}</p>
        </div>

        <br></br>
      </div>
    </Col>
  );
};

export default CategoryCard;
