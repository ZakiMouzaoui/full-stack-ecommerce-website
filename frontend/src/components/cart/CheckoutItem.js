// import { useSelector } from "react-redux";
import ClearUserCartHook from "../../hook/cart/clear_user_cart_hook";
import { Spinner } from "react-bootstrap";
import { memo, useCallback, useState } from "react";
import CheckoutModal from "./CheckoutModal";
import { useSelector } from "react-redux";

const CheckoutItem = ({
  totalCartPrice,
  // totalPriceAfterDiscount,
  // discount,
}) => {
  const totalPriceAfterDiscount = useSelector(
    (state) => state.Cart.totalPriceAfterDiscount
  );
  const discount = useSelector((state) => state.Cart.discount);

  // const totalCartPrice = useSelector((state) => state.Cart.totalCartPrice);
  const totalPrice = totalPriceAfterDiscount
    ? totalPriceAfterDiscount * 1 + 10
    : totalCartPrice * 1 + 10;

  const { loadingDel, onClear } = ClearUserCartHook();

  const [showModal, setShowModal] = useState(false);
  const handleClose = useCallback(() => setShowModal(false), []);

  return (
    <div className="mt-4 px-3 d-flex flex-column gap-2">
      <div className="d-flex justify-content-between" style={{ color: "grey" }}>
        <div>Total Cart Price</div>
        <div>{totalCartPrice}$</div>
      </div>
      <div
        className="d-flex justify-content-between"
        style={{ color: "#880808" }}
      >
        <div>Shipping Cost</div>
        <div>10$</div>
      </div>
      <div
        className="d-flex justify-content-between"
        style={{ color: "green" }}
      >
        <div>Discount</div>
        <div>-{discount && totalPriceAfterDiscount ? discount : 0}$</div>
      </div>
      <div className="d-flex justify-content-between">
        <b>Estimated Total</b>
        <b>{totalPrice.toFixed(2)}$</b>
      </div>
      <button className="checkout-btn" onClick={() => setShowModal(true)}>
        Checkout
      </button>
      <button className="clear-cart-btn" onClick={onClear}>
        {loadingDel === true ? (
          <Spinner style={{ height: "20px", width: "20px" }}></Spinner>
        ) : (
          "Clear Cart"
        )}
      </button>
      {showModal && (
        <CheckoutModal
          showModal={showModal}
          handleClose={handleClose}
        ></CheckoutModal>
      )}
    </div>
  );
};

export default memo(CheckoutItem);
