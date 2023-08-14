import { Col, Row } from "react-bootstrap";
import HomeCategoriesHook from "../../hook/category/home_categories_hook";
import { Link } from "react-router-dom";
import {
  CHANGE_MAX_PRICE,
  CHANGE_MIN_PRICE,
  CHECK_BRAND,
  CHECK_CATEGORY,
  SEARCH_KEYWORD,
} from "../../redux/type";
import { useDispatch } from "react-redux";

const CategoryHeader = () => {
  const [categories] = HomeCategoriesHook();
  const dispatch = useDispatch();

  const navigateToCategory = (category) => {
    dispatch({ type: SEARCH_KEYWORD, keyword: "" });
    dispatch({ type: CHECK_CATEGORY, category });
    dispatch({ type: CHECK_BRAND, checkedBrands: [] });
    dispatch({ type: CHANGE_MAX_PRICE, price: null });
    dispatch({ type: CHANGE_MIN_PRICE, price: null });
    dispatch({ type: "CHANGE_PAGE", page: 1 });
  };

  return (
    <Row className="bg-white px-4 py-4 no-gutters">
      {categories &&
        categories.map((category) => (
          <Col className="ms-3">
            <Link
              style={{ textDecoration: "none", color: "#272727" }}
              to={`/results?category=${category._id}`}
              onClick={() => navigateToCategory(category._id)}
            >
              {category.name}
            </Link>
          </Col>
        ))}
    </Row>
  );
};

export default CategoryHeader;
