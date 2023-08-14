import { Container, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";
import ViewProductsByBrandHook from "../../hook/product/view_products_by_brand_hook";
import { Pagination } from "../../components/utils/Pagination";
import NoDocumentFound from "../../components/error/NoDocumentFound";
import { useSelector } from "react-redux";
import SubTitle from "../../components/utils/SubTitle";
import CardContainerHook from "../../hook/product/card_container_hook";
import NavBarLogin from "../../components/utils/NavBarLogin";
import { useQuery } from "react-query";
import { getData } from "../../hooks/useGetData";
import ServerError500 from "../../components/error/ServerError500";

const ProductsByBrand = () => {
  const { id } = useParams();

  const getProductsByBrand = (brandId) => {
    return getData(`/products?brand=${brandId}`);
  };

  const { isLoading, data } = useQuery(["products", id], () =>
    getProductsByBrand(id)
  );

  const brand = useSelector((state) => state.Brand.brand);
  const { favLoading, wishlist } = CardContainerHook();

  return (
    <>
      <NavBarLogin></NavBarLogin>
      <Container style={{ minHeight: "565px" }} className="mt-2">
        {brand && <SubTitle title={brand.name}></SubTitle>}
        <Row>
          {isLoading === true || favLoading === true ? (
            <Spinner className="m-auto"></Spinner>
          ) : data ? (
            data.data.length > 0 ? (
              <div>
                <Row>
                  {data.data.map((product, index) => {
                    return (
                      <ProductCard
                        key={index}
                        product={product}
                        wishlist={wishlist}
                      ></ProductCard>
                    );
                  })}
                </Row>
                {/* {pageCount > 1 && (
                <Pagination
                  pageCount={pageCount}
                  onPress={getPage}
                ></Pagination>
              )} */}
              </div>
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
            )
          ) : (
            <ServerError500></ServerError500>
          )}
        </Row>
      </Container>
    </>
  );
};

export default ProductsByBrand;
