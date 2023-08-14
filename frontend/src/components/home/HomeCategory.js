import { Container, Row, Spinner } from "react-bootstrap";
import SubTitle from "../utils/SubTitle";
import CategoryCard from "../category/CategoryCard";
import NoDocumentFound from "../error/NoDocumentFound";
import { memo } from "react";
import { useQuery } from "react-query";
import { getData } from "../../hooks/useGetData";

const HomeCategory = () => {
  const colors = [
    "#FFD3E8",
    "#F4DBA5",
    "#55CFDF",
    "#FF6262",
    "#0034FF",
    "#FFD3E8",
  ];

  const { isLoading, data } = useQuery(["categories"], () =>
    getData("/categories")
  );

  return (
    <Container>
      <div className="px-2">
        <SubTitle title="Categories" btnLink="/all-categories"></SubTitle>
      </div>
      {isLoading === true ? (
        <div className="d-flex justify-content-center">
          <Spinner className="m-auto"></Spinner>
        </div>
      ) : (
        <Row>
          {data ? (
            data.data.map((category, index) => {
              return (
                <CategoryCard
                  key={index}
                  id={category._id}
                  name={category.name}
                  icon={category.image}
                  bgColor={colors[index]}
                ></CategoryCard>
              );
            })
          ) : (
            <div
              style={{ height: "200px" }}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <NoDocumentFound></NoDocumentFound>
              <h5>No categories found</h5>
            </div>
          )}
        </Row>
      )}
    </Container>
  );
};

export default memo(HomeCategory);
