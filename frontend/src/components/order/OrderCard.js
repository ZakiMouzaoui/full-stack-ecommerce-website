import { memo, useState } from "react";
import OrderItem from "./OrderItem";

const OrderCard = ({ order }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="bg-white rounded shadow-sm justify-content-between mb-3 p-3">
      <div>
        {order.orderItems.map((orderItem, index) => (
          <div>
            <OrderItem item={orderItem} key={index}></OrderItem>
            <hr></hr>
          </div>
        ))}
        <div className="d-flex justify-content-between">
          <b>Total Price: {order.totalOrderPrice}$</b>

          <b
            style={{ cursor: " pointer" }}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore === true ? "Show less" : "Show more"}{" "}
            <i
              className={
                showMore === true
                  ? "fa-solid fa-arrow-up ms-2"
                  : "fa-solid fa-arrow-down ms-2"
              }
            ></i>
          </b>
        </div>
        {showMore === true && (
          <div className="mt-2">
            <div className="mb-2">
              <b>Order date: </b>
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <div className="mb-2">
              <b>Coupon used: </b>
              {order.couponCode || "None"}
            </div>
            <div className="mb-2">
              <p className="mb-2">
                <b>Shipping address: </b>
              </p>
              <div
                style={{ border: "1px solid black", display: "inline-block" }}
                className="p-2"
              >
                <div>
                  <b>City: </b>
                  {order.shippingAddress.city}
                </div>
                <div>
                  <b>Street: </b>
                  {order.shippingAddress.street}
                </div>
                <div>
                  <b>Details: </b>
                  {order.shippingAddress.details}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(OrderCard);
