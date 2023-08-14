import { Container, Row, Spinner } from "react-bootstrap";
import SubTitle from "../utils/SubTitle";
import ProductCard from "./ProductCard";
import NoDocumentFound from "../error/NoDocumentFound";
// import CardContainerHook from "../../hook/product/card_container_hook";
import { memo } from "react";
import ServerError500 from "../error/ServerError500";
import { useSelector } from "react-redux";

const CardProductContainer = ({
  title,
  items,
  btnTitle,
  loading,
  btnLink,
  limit,
  lg = 3,
  md = 6,
  sm = 6,
  xs = 12,
  padding,
}) => {
  const wishlist = useSelector((state) => state.Wishlist.wishlist);

  console.log("product card container");

  return (
    <Container className={`mb-3 ${padding && "p-0"}`}>
      <div className="px-2">
        <SubTitle
          title={title}
          btnLink={btnLink}
          btnTitle={btnTitle}
        ></SubTitle>
      </div>

      <Row className="mx-0 p-0">
        {loading === true ? (
          <Spinner className="m-auto"></Spinner>
        ) : items ? (
          items.length > 0 ? (
            items.slice(0, limit).map((item, index) => {
              return (
                <ProductCard
                  product={item}
                  key={index}
                  wishlist={wishlist}
                  lg={lg}
                  md={md}
                  sm={sm}
                  xs={xs}
                ></ProductCard>
              );
            })
          ) : (
            <div
              style={{ height: "200px", marginBottom: "20px" }}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <NoDocumentFound></NoDocumentFound>
              <h5>No products found</h5>
            </div>
          )
        ) : (
          <div style={{ height: "250px" }}>
            <ServerError500></ServerError500>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default memo(CardProductContainer);
