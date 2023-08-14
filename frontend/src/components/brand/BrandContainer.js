import { Container, Row, Spinner } from "react-bootstrap";
import BrandCard from "./BrandCard";
import SubTitle from "../utils/SubTitle";
import NoDocumentFound from "../error/NoDocumentFound";

const BrandContainer = ({ data, loading }) => {
  return loading === true ? (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner className="m-auto mt-5"></Spinner>
    </div>
  ) : (
    <Container style={{ width: "100%" }}>
      <div className="px-2">
        <SubTitle title="All Brands"></SubTitle>
      </div>
      <Row className="mx-0">
        {data ? (
          data.map((brand, index) => {
            const imgUrl = `http://127.0.0.1:8000/brands/${brand.image}`;
            return (
              <BrandCard
                data={brand}
                id={brand._id}
                key={index}
                img={imgUrl}
              ></BrandCard>
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

export default BrandContainer;
