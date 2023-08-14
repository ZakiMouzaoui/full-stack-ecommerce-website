import { Col, Container, Row, Spinner } from "react-bootstrap";
import CardProductContainer from "../../components/product/CardProductContainer";
import SideFilter from "../../components/utils/SideFilter";
import NoDocumentFound from "../../components/error/NoDocumentFound";
import FilterSort from "../../components/utils/FilterSort";
import { Pagination } from "../../components/utils/Pagination";
import NavBarLogin from "../../components/utils/NavBarLogin";
import { memo } from "react";
import useFilterProductsHook from "../../hook/product/userFilterProductsHook";

const ShopProductsPage = () => {
  const { products, loading, pageCount, page, onPress, filteredProducts } =
    useFilterProductsHook();

  // const pageCount = useSelector((state) => state.Filter.pageCount);
  // const currentPage = useSelector((state) => state.Filter.currentPage);
  // const [products] = [[]];

  console.log("rerender...");

  // const changeQuery = () => {
  //   const url = new URL(window.location);
  //   url.searchParams.set("brand", "zaki");
  //   window.history.pushState(null, "", url.toString());
  // };

  return (
    <div style={{ minHeight: "670px" }}>
      <NavBarLogin></NavBarLogin>
      {/* <button onClick={changeQuery}>change query</button> */}
      {loading === true ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <Spinner></Spinner>
        </div>
      ) : products && products.length > 0 ? (
        <Container>
          <div className="d-flex pt-3 mx-2 justify-content-between">
            <p style={{ fontWeight: "bold" }}>
              Showing {products.length} out of {filteredProducts.length} results
            </p>
            <FilterSort></FilterSort>
          </div>

          <Row>
            <Col sm="5" xs="12" md="5" lg="3">
              <div className="ms-2">
                <SideFilter></SideFilter>
              </div>
            </Col>
            <Col sm="7" xs="12" md="7" lg="9">
              <CardProductContainer
                padding="0"
                lg={4}
                sm={12}
                md={12}
                items={products}
              />
              {pageCount > 1 && (
                <Pagination
                  pageCount={pageCount}
                  onPress={onPress}
                  currentPage={page}
                ></Pagination>
              )}
            </Col>
          </Row>
        </Container>
      ) : (
        <div
          style={{ marginBottom: "20px", margin: "auto", height: "400px" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <NoDocumentFound></NoDocumentFound>
          <h5>No products found</h5>
        </div>
      )}
    </div>
  );
};

export default memo(ShopProductsPage);
