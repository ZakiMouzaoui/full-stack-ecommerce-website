import { useParams } from "react-router-dom";
import { getDataWithToken } from "../../hooks/useGetData";
import { memo } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import SubTitle from "../../components/utils/SubTitle";
import ServerError500 from "../../components/error/ServerError500";
import OrderCard from "../../components/order/OrderCard";
import NavBarLogin from "../../components/utils/NavBarLogin";
import CustomerDetails from "../../components/order/CustomerDetails";
import ShippingAddress from "../../components/order/ShippingAddress";
import OrderStatus from "../../components/order/OrderStatus";
import { ToastContainer } from "react-toastify";
import { useQuery, useQueryClient } from "react-query";

const OrderDetailsPage = () => {
  const { id } = useParams("id");
  const queryClient = useQueryClient();
  // const order = useSelector((state) => state.Order.order);
  // const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const getOrder = async () => {
  //     setLoading(true);
  //     try {
  //       // await new Promise((res) => setTimeout(res, 1500));
  //       const res = await getDataWithToken(`/orders/${id}`);
  //       // dispatch({ type: GET_ORDER, order: res.data });
  //     } catch (err) {}
  //     setLoading(false);
  //   };

  //   getOrder();
  // }, [dispatch, id, order]);

  const { data, isLoading } = useQuery(
    ["orders", id],
    () => getDataWithToken(`/orders/${id}`),
    {
      initialData: () => {
        const order = queryClient
          .getQueryData(["orders"])
          ?.data?.find((order) => order._id.toString() === id);
        console.log(order);

        if (order) {
          return {
            data: order,
          };
        } else {
          return undefined;
        }
      },
      retry: false,
      notifyOnChangeProps: ["data", "isError"],
    }
  );

  return (
    <div style={{ minHeight: "675px" }}>
      <NavBarLogin></NavBarLogin>
      <Container>
        {isLoading === true ? (
          <div
            style={{ minHeight: "70vh" }}
            className="d-flex justify-content-center align-items-center"
          >
            <Spinner></Spinner>
          </div>
        ) : data ? (
          <Row>
            <Col lg={8}>
              <div className="d-flex align-items-center">
                <SubTitle title="Order Details"></SubTitle>
                {data.data.isPaid === false ? (
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
                {data.data.isDelivered === false ? (
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
              <OrderCard order={data.data}></OrderCard>
              <OrderStatus order={data.data}></OrderStatus>
            </Col>
            <Col>
              <CustomerDetails user={data.data.user}></CustomerDetails>
              <ShippingAddress
                address={data.data.shippingAddress}
              ></ShippingAddress>
            </Col>
          </Row>
        ) : (
          <div style={{ height: "80vh" }}>
            <ServerError500></ServerError500>
          </div>
        )}
      </Container>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default memo(OrderDetailsPage);
