import { memo } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getData } from "../../hooks/useGetData";
import SubTitle from "../utils/SubTitle";
import { Container } from "react-bootstrap";
import CardProductContainer from "./CardProductContainer";

const RelatedProducts = () => {
  const product = useSelector((state) => state.Product.product);

  const { data } = useQuery(
    ["related-products", product?._id],
    () =>
      getData(
        `/products?category=${product?.category?._id}&brand=${product?.brand?._id}`
      ),
    { enabled: !!product, notifyOnChangeProps: ["data"] }
  );

  console.log(data?.data);

  return (
    <>
      {data && data.data.length > 1 ? (
        <>
          <Container>
            <SubTitle title="You may also like"></SubTitle>
          </Container>
          <div className="mx-1">
            <CardProductContainer
              padding="0"
              lg={3}
              items={data.data.filter(
                (item) => item._id.toString() !== product._id
              )}
            ></CardProductContainer>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(RelatedProducts);
