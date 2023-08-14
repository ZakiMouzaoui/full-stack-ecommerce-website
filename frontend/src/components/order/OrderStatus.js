import { Fragment, useState } from "react";
import SubTitle from "../utils/SubTitle";
import { Col, Row, Spinner } from "react-bootstrap";
import { updateData } from "../../hooks/useUpdateData";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";

const OrderStatus = ({ order }) => {
  const [deliverLoading, setDeliverLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const queryClient = useQueryClient();

  const onPayChange = async (e) => {
    if (e.target.value === "paid") {
      setPaymentLoading(true);
      try {
        const res = await updateData(`/orders/${order._id}/pay`);
        queryClient.setQueryData(["orders", order._id], (_) => {
          return {
            data: res.data,
          };
        });
        toast.success("Order status changed successfully");
      } catch (error) {
        if (error.code !== "ERR_NETWORK") {
          if (error.response.data.errors) {
            const set = new Set();

            error.response.data.errors.forEach((err) => {
              if (!set.has(err.param)) {
                toast.error(err.msg, {
                  position: toast.POSITION.TOP_RIGHT,
                });
                set.add(err.param);
              }
            });
          }
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error("Something went wrong. Please try again", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
      setPaymentLoading(false);
    }
  };

  const onDeliveryChange = async (e) => {
    if (e.target.value === "delivered") {
      setDeliverLoading(true);
      try {
        const res = await updateData(`/orders/${order._id}/deliver`);
        queryClient.setQueryData(["orders", order._id], (_) => {
          return {
            data: res.data,
          };
        });

        toast.success("Order status changed successfully");
      } catch (error) {
        if (error.code !== "ERR_NETWORK") {
          if (error.response.data.errors) {
            const set = new Set();

            error.response.data.errors.forEach((err) => {
              if (!set.has(err.param)) {
                toast.error(err.msg, {
                  position: toast.POSITION.TOP_RIGHT,
                });
                set.add(err.param);
              }
            });
          }
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error("Something went wrong. Please try again", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
      setDeliverLoading(false);
    }
  };

  return (
    <Fragment>
      <SubTitle title="Change Orders Status"></SubTitle>
      <Row className="bg-white rounded shadow-sm p-2 mx-0">
        <Col xs={6}>
          <b>Delivery</b>
          <div className="mt-2">Mark as</div>
          {deliverLoading === true ? (
            <div className="d-flex justify-content-center w-100">
              <Spinner style={{ height: "20px", width: "20px" }}></Spinner>
            </div>
          ) : (
            <select
              className="w-100 p-2 rounded"
              onChange={onDeliveryChange}
              disabled={order.isDelivered}
            >
              <option value="not delivered">Not delivered</option>
              <option value="delivered">Delivered</option>
            </select>
          )}
        </Col>
        <Col xs={6}>
          <b>Payment</b>
          <div className="mt-2">Mark as</div>
          {paymentLoading === true ? (
            <div className="d-flex justify-content-center">
              <Spinner style={{ height: "25px", width: "25px" }}></Spinner>
            </div>
          ) : (
            <select
              className="w-100 p-2 rounded"
              onChange={onPayChange}
              disabled={order.isPaid}
            >
              <option value="not paid">Not paid</option>
              <option value="paid">Paid</option>
            </select>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default OrderStatus;
