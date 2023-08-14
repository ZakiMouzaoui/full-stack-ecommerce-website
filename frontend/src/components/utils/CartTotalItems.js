import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import cart from "../../images/cart.png";
import { useQuery } from "react-query";
import { getDataWithToken } from "../../hooks/useGetData";
import { memo } from "react";

const CartTotalItems = () => {
  const { data } = useQuery(["cart-query"], () => getDataWithToken("/cart"), {
    notifyOnChangeProps: ["data"],
  });
  console.log("cart rendering");

  return (
    <Nav.Link
      className="nav-text d-flex mt-3 justify-content-center position-relative"
      as={Link}
      to="/cart"
    >
      <img className="login-img" src={cart} alt="cart"></img>
      <p style={{ color: "white" }}>Cart</p>
      <span
        className="position-absolute badge rounded-pill bg-danger"
        style={{ top: 0, left: 0 }}
      >
        {data?.totalItems}
      </span>
    </Nav.Link>
  );
};

export default memo(CartTotalItems);
