import { Col, Container, Row, Spinner } from "react-bootstrap";
import CartItem from "../../components/cart/CartItem";
import NavBarLogin from "../../components/utils/NavBarLogin";
import SubTitle from "../../components/utils/SubTitle";
import { memo } from "react";
import { ToastContainer } from "react-toastify";
import CouponField from "../../components/cart/CouponField";
import CheckoutItem from "../../components/cart/CheckoutItem";
import EmptyWishlist from "../../components/error/EmptyWishlist";
import ServerError500 from "../../components/error/ServerError500";
import { useQuery } from "react-query";
import { getDataWithToken } from "../../hooks/useGetData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APPLY_COUPON } from "../../redux/type";

const useGetCart = () => {
  // const discount = useSelector((state) => state.Cart.discount);
  // const dispatch = useDispatch();

  const { data, isLoading, isError, refetch } = useQuery(
    ["cart-query"],
    () => getDataWithToken("/cart"),
    {
      retry: false,
      // enabled: false,
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
      notifyOnChangeProps: ["data"],
      cacheTime: Infinity,
    }
  );

  // if (data) {
  //   if (!discount) {
  //     dispatch({
  //       type: APPLY_COUPON,
  //       discount: null,
  //       totalPriceAfterDiscount: null,
  //     });
  //   }
  // }

  return { data, isLoading, isError, refetch };
};

const CartPage = () => {
  const { data, isLoading, isError, refetch } = useGetCart();

  return (
    <div style={{ minHeight: "675px" }}>
      <NavBarLogin></NavBarLogin>

      {isLoading === true ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "675px" }}
        >
          <Spinner></Spinner>
        </div>
      ) : isError === true ? (
        <div
          style={{ height: "50vh" }}
          className="d-flex flex-column align-items-center"
        >
          {" "}
          <ServerError500></ServerError500>
          <button className="shop-now-btn" onClick={refetch}>
            Try again
          </button>
        </div>
      ) : data && data.data.length > 0 ? (
        <Container style={{ minHeight: "80vh" }}>
          <SubTitle title="Cart Items"></SubTitle>
          <Row className="d-flex mx-0 justèfy-content-between">
            <Col lg={7}>
              {data.data.map((item) => {
                return <CartItem item={item} key={item._id}></CartItem>;
              })}
            </Col>
            <Col></Col>

            <Col
              style={{ height: "35%" }}
              lg={4}
              className="bg-white rounded shadow-sm py-3 p-0"
            >
              <CouponField
                totalPriceAfterDiscount={data.totalCartPriceAfterDiscount}
              ></CouponField>
              <CheckoutItem
                totalCartPrice={data.totalCartPrice}
                // totalPriceAfterDiscount={data.totalCartPriceAfterDiscount}
                // discount={data.discount}
              ></CheckoutItem>
            </Col>
          </Row>
        </Container>
      ) : (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ height: "75vh" }}
        >
          <EmptyWishlist></EmptyWishlist>
          <h4>Looks like your cart is empty</h4>
          <Link replace to="/">
            <button className="shop-now-btn">Start Shopping</button>
          </Link>
        </div>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default memo(CartPage);
