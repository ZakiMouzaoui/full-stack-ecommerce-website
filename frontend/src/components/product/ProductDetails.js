import rateImg from "../../images/rate.png";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import ColorBar from "./ColorBar";
import ImageGallery from "./ImageGallery";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertData } from "../../hooks/useInsertData";
import { toast } from "react-toastify";
import { GET_CART, GET_PRODUCT } from "../../redux/type";
import NoDocumentFound from "../error/NoDocumentFound";
import FavoriteComponent from "./FavouriteComponent";
import { useQuery } from "react-query";
import { getData } from "../../hooks/useGetData";

const ProductDetails = ({ id }) => {
  let images = [];

  const dispatch = useDispatch();

  const { isLoading, data } = useQuery(
    ["products", id],
    () => getData(`/products/${id}`),
    {
      notifyOnChangeProps: ["data"],
    }
  );
  const [loadingAdd, setLoadingAdd] = useState(false);
  const selectedColor = useSelector((state) => state.Product.selectedColor);

  if (data) {
    images = [
      ...data?.data?.images.map(
        (img) => `http://127.0.0.1:8000/products/${img}`
      ),
    ];
    dispatch({ type: GET_PRODUCT, product: data.data });
  }

  const onAdd = async () => {
    try {
      toast.dismiss();
      setLoadingAdd(true);
      if (!selectedColor) {
        toast.error("Please select a color");
      } else {
        const res = await insertData("/cart", {
          productId: id,
          selectedColor,
        });
        dispatch({
          type: GET_CART,
          data: res.data,
          totalItems: res.totalCartItems,
          totalCartPrice: res.totalCartPrice,
          totalPriceAfterDiscount: null,
        });
        toast.success("Product added to cart!");
      }
    } catch (err) {}
    setLoadingAdd(false);
  };

  return (
    <Container className="mt-3">
      {isLoading === true ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "70vh" }}
        >
          <Spinner></Spinner>
        </div>
      ) : data ? (
        <Row className="d-flex mx-0 px-0">
          <ImageGallery images={images}></ImageGallery>
          <Col className="p-0">
            <p style={{ color: "grey" }}>{data.data.category.name}</p>
            <div className="d-flex align-items-center">
              <h3>{data.data.name}</h3>
              <FavoriteComponent id={data.data._id}></FavoriteComponent>
            </div>
            <p>
              <b>Brand: </b>
              {data.data.brand.name}
            </p>
            <p>
              <b>Description: </b>
              {data.data.description}
            </p>
            <p>
              <b>Quantity: </b>
              {data.data.quantity}
            </p>
            {<ColorBar colors={data.data.colors}></ColorBar>}
            {data.data.avgRating !== 0 && (
              <div className="d-flex card-rate mt-1">
                <img
                  className="me-2"
                  style={{ height: "16px", width: "16px" }}
                  alt=""
                  src={rateImg}
                ></img>
                <p>{data.data.avgRating.toFixed(1)}</p>
              </div>
            )}
            <div className="d-flex align-items-center">
              {data.data.priceAfterDiscount ? (
                <div className="d-flex align-items-center">
                  <div className="card-price me-2 ">
                    {data.data.priceAfterDiscount} $
                  </div>
                  <div style={{ textDecoration: "line-through" }}>
                    {data.data.price} $
                  </div>
                </div>
              ) : (
                <div className="card-price me-2 ">{data.data.price} $</div>
              )}

              <Button
                className="text-center py-2 px-3  mx-3"
                variant="dark"
                onClick={onAdd}
                disabled={data.data.quantity === 0}
              >
                {loadingAdd === true ? (
                  <Spinner style={{ height: "20px", width: "20px" }}></Spinner>
                ) : data.data.quantity === 0 ? (
                  "Out of stock"
                ) : (
                  "Add to cart"
                )}
              </Button>
            </div>
          </Col>
        </Row>
      ) : (
        <NoDocumentFound></NoDocumentFound>
      )}
    </Container>
  );
};

export default memo(ProductDetails);
