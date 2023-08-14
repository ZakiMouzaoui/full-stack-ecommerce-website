import { memo, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { insertData } from "../../hooks/useInsertData";
import { GET_CART, LOGIN_USER } from "../../redux/type";
import { useQueryClient } from "react-query";

const CheckoutModal = ({ showModal, handleClose }) => {
  const addresses = useSelector((state) => state.Address.addresses);

  const shippingAddress = useSelector((state) => state.Address.shippingAddress);
  const shippingAdr = addresses.find(
    (adr) => adr._id.toString() === shippingAddress.toString()
  );

  const code = useSelector((state) => state.Cart.coupon);

  const [type, setType] = useState("card");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const addCachOrder = async () => {
    setLoading(true);
    try {
      const res = await insertData("/orders", {
        shippingAddress: shippingAdr,
        code,
      });
      dispatch({ type: GET_CART, data: [], totalItems: 0 });
      queryClient.setQueryData(["orders"], (oldQuery) => {
        return {
          data: [...oldQuery.data, res.data],
        };
      });
      navigate("/orders");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const addCardOrder = async () => {
    setLoading(true);
    try {
      const res = await insertData("/orders/checkout-session", {
        shippingAddress: shippingAdr,
        code,
      });
      window.open(res.session.url);

      // dispatch({ type: GET_CART, data: [], totalItems: 0 });
      // navigate("/orders");
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 401) {
        dispatch({ type: LOGIN_USER, user: null });
        navigate("/login");
      }
    }
    setLoading(false);
  };

  const onSubmit = () => {
    if (type === "cach") {
      addCachOrder();
    } else {
      addCardOrder();
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>
          {" "}
          <div>Finalize your checkout </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-form text-dark text-start mb-1">
          Choose a payment method
        </div>

        <select
          className="user-input p-2 w-100 mb-3"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="card">Payment card</option>
          <option value="cach">Cach on delivery</option>
        </select>
        <hr></hr>
        <div className="d-flex justify-content-between">
          <div
            className="text-form text-dark text-start mb-1"
            style={{ fontWeight: "bold" }}
          >
            Shipping address
          </div>
          <Link to="/addresses">
            <button className="address-change-btn">Change</button>
          </Link>
        </div>
        <div className="text-form text-dark text-start mb-1">City</div>
        <input
          className="user-input p-2 w-100 mb-3"
          type="text"
          disabled
          value={shippingAdr.city}
        ></input>

        <div className="text-form text-dark text-start mb-1">Street</div>
        <input
          className="user-input p-2 w-100 mb-3"
          type="text"
          disabled
          value={shippingAdr.street}
        ></input>
        <div className="text-form text-dark text-start mb-1">Details</div>
        <input
          className="user-input p-2 w-100 mb-3"
          type="text"
          disabled
          value={shippingAdr.details}
        ></input>
        <div className="text-form text-dark text-start mb-1">Postal Code</div>
        <input
          className="user-input p-2 w-100 mb-3"
          type="text"
          disabled
          value={shippingAdr.postalCode}
        ></input>
        <div className="text-form text-dark text-start mb-1">Phone</div>
        <input
          className="user-input p-2 w-100 mb-3"
          type="text"
          disabled
          value={shippingAdr.phone}
        ></input>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={onSubmit}>
          {loading === true ? (
            <Spinner style={{ height: "20px", width: "20px" }}></Spinner>
          ) : (
            "Confirm"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default memo(CheckoutModal);
