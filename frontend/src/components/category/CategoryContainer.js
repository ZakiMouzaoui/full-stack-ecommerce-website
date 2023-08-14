import { Container, Row, Spinner } from "react-bootstrap";
import SubTitle from "../utils/SubTitle";
import CategoryCard from "./CategoryCard";

const CategoryContainer = ({ data, loading }) => {
  return (
    <Container className="mb-4">
      <SubTitle title="All Categories"></SubTitle>
      {loading === true ? (
        <div className="d-flex justofy-content-center">
          <Spinner className="m-auto"></Spinner>
        </div>
      ) : (
        <Row className="d-flex justify-content-between px-5">
          {data.map((category, index) => {
            return (
              <CategoryCard
                key={index}
                id={category._id}
                name={category.name}
                icon={category.image}
              ></CategoryCard>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default CategoryContainer;
