import SubTitle from "../utils/SubTitle";
import { memo } from "react";
import { Spinner } from "react-bootstrap";
import OrderCard from "../order/OrderCard";
import EmptyWishlist from "../error/EmptyWishlist";
import ServerError500 from "../error/ServerError500";
import { useQuery } from "react-query";
import { getDataWithToken } from "../../hooks/useGetData";
import { Link } from "react-router-dom";

const UserOrder = () => {
  //   const { loading, orders } = useGetUserOrdersHook();
  const { isLoading, data, isError } = useQuery(
    ["orders"],
    () => getDataWithToken("/orders"),
    {
      retry: false,
      notifyOnChangeProps: ["isError", "data"],
    }
  );

  console.log("orders rendereds");

  if (isError === true) {
    return (
      <div
        style={{ height: "100%", width: "100%" }}
        className="d-flex justify-content-center align-items-center text-center"
      >
        <ServerError500></ServerError500>;
      </div>
    );
  }

  return (
    <div>
      <SubTitle title="My Orders"></SubTitle>
      {isLoading === true ? (
        <div className="d-flex justify-content-center">
          <Spinner></Spinner>
        </div>
      ) : data ? (
        data.data.length > 0 ? (
          data.data.map((order, index) => (
            <>
              <div className="d-flex mb-2">
                <b>{`Tracking: ${order.trackingCode}`}</b>
                {order.isPaid === false ? (
                  <div
                    className="ms-3"
                    style={{
                      padding: "0.25em",
                      background: "#8a0303",
                      color: "white",
                      fontSize: "0.75rem",
                    }}
                  >
                    not paid
                  </div>
                ) : (
                  <div
                    className="ms-3"
                    style={{
                      padding: "0.25em",
                      background: "green",
                      color: "white",
                      fontSize: "0.75rem",
                    }}
                  >
                    paid
                  </div>
                )}
                {order.isDelivered === false ? (
                  <div
                    className="ms-3"
                    style={{
                      padding: "0.25em",
                      background: "#8a0303",
                      color: "white",
                      fontSize: "0.75rem",
                    }}
                  >
                    not delivered
                  </div>
                ) : (
                  <div
                    className="ms-3"
                    style={{
                      padding: "0.25em",
                      background: "green",
                      color: "white",
                      fontSize: "0.75rem",
                    }}
                  >
                    delivered
                  </div>
                )}
              </div>
              <OrderCard order={order} key={index} index={index}></OrderCard>
            </>
          ))
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <EmptyWishlist></EmptyWishlist>
            <h4>You dont have any orders</h4>
            <Link replace to="/">
              <button className="shop-now-btn">Start Shopping</button>
            </Link>
          </div>
        )
      ) : (
        <ServerError500></ServerError500>
      )}
    </div>
  );
};

export default memo(UserOrder);
