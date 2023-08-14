import { Container, Row, Spinner } from "react-bootstrap";
import SubTitle from "../utils/SubTitle";
import BrandCard from "./BrandCard";
import HomeBrandHook from "../../hook/brand/home_brand_hook";
import NoDocumentFound from "../error/NoDocumentFound";

const BrandFeatured = () => {
  const [brands, loading] = HomeBrandHook();

  return (
    <Container>
      <div className="px-2">
        <SubTitle
          title="Featured Brands"
          btnTitle={brands && brands.length > 0 ? "More" : ""}
          btnLink="/all-brands"
        ></SubTitle>
      </div>
      <Row className=" mx-0">
        {loading === true ? (
          <Spinner className="m-auto" animation="border" />
        ) : brands ? (
          brands.slice(0, 6).map((brand, index) => {
            const imgUrl = `http://127.0.0.1:8000/brands/${brand.image}`;
            return (
              <BrandCard data={brand} key={index} img={imgUrl}></BrandCard>
            );
          })
        ) : (
          <div
            style={{ height: "200px", marginBottom: "20px" }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <NoDocumentFound></NoDocumentFound>
            <h5>No brands found</h5>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default BrandFeatured;
