import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";
import ViewProductsByCategoryHook from "../../hook/product/view_products_by_category_hook";
import { Pagination } from "../../components/utils/Pagination";
import NoDocumentFound from "../../components/error/NoDocumentFound";
import { useSelector } from "react-redux";
import CardContainerHook from "../../hook/product/card_container_hook";
import NavBarLogin from "../../components/utils/NavBarLogin";

const ProductsByCategory = () => {
  const { id } = useParams();

  const [loading, pageCount, getPage] = ViewProductsByCategoryHook(id);

  const products = useSelector((state) => state.Product.products);

  const { favLoading, wishlist } = CardContainerHook();

  return (
    <>
      <NavBarLogin></NavBarLogin>
      <Container style={{ minHeight: "565px" }} className="mt-2">
        {loading === true || favLoading === true ? (
          <Spinner className="m-auto"></Spinner>
        ) : products && products.length > 0 ? (
          <Col>
            <Row>
              {products.map((product, index) => {
                return (
                  <ProductCard
                    key={index}
                    product={product}
                    wishlist={wishlist}
                  ></ProductCard>
                );
              })}
            </Row>
            {pageCount > 1 && (
              <Pagination pageCount={pageCount} onPress={getPage}></Pagination>
            )}
          </Col>
        ) : (
          <div
            style={{ height: "50vh", marginBottom: "20px" }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <NoDocumentFound></NoDocumentFound>
            <h5>No products found</h5>
            <Link to="/" replace>
              <button className="not-found-btn">Start Shopping</button>
            </Link>
          </div>
        )}
      </Container>
    </>
  );
};

export default ProductsByCategory;
