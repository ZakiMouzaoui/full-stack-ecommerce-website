import { Col, Row, Spinner } from "react-bootstrap";
import SideBar from "../../components/admin/AdminSideBar";
import NoDocumentFound from "../../components/error/NoDocumentFound";
import AdminSubTitle from "../../components/admin/AdminSubtitle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError500 from "../../components/error/ServerError500";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch } from "react-redux";
import { FILTER_ORDERS } from "../../redux/type";
import NavBarLogin from "../../components/utils/NavBarLogin";
import { Tag } from "primereact/tag";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getDataWithToken } from "../../hooks/useGetData";

const AdminAllOrdersPage = () => {
  const dispatch = useDispatch();

  // const { loading, filtered, orders, isServerError } = useGetUserOrdersHook();
  const {
    isLoading: loading,
    data,
    isError,
  } = useQuery(["orders"], () => getDataWithToken("/orders"), {
    notifyOnChangeProps: ["data"],
  });

  // const filtered = useSelector((state) => state.Order.filtered);
  // dispatch({ type: GET_ORDERS, filtered: data?.data });

  const orderDate = (date) => {
    return <div>{date.substring(0, 10)}</div>;
  };

  const viewDetails = (order) => {
    return (
      <Link
        to={`/orders/${order._id}`}
        // onClick={() => {
        //   dispatch({ type: GET_ORDER, order });
        // }}
      >
        <i className="fa fa-eye"></i>
      </Link>
    );
  };

  const status = (status, col) => {
    return (
      <Tag severity={status === true ? "success" : "danger"}>
        {status === true ? col : `not ${col}`}
      </Tag>
    );
  };

  const onSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let filteredData = [];
    if (searchTerm) {
      filteredData = data?.data?.filter((order) =>
        order.trackingCode.toLowerCase().includes(searchTerm)
      );
    } else {
      filteredData = [...data?.data];
    }
    dispatch({
      type: FILTER_ORDERS,
      filtered: filteredData,
    });
  };

  return (
    <div style={{ minHeight: "600px" }}>
      <NavBarLogin></NavBarLogin>

      <Row>
        <Col xs="6" sm="4" md="3" lg="3">
          <SideBar index={4}></SideBar>
        </Col>
        <Col xs="6" sm="8" md="9" lg="9" className="px-4">
          <AdminSubTitle
            title="Manage orders"
            onSearch={onSearchChange}
            search={null}
            btnTitle={null}
            placeholder="Search by code..."
          ></AdminSubTitle>
          {loading === true ? (
            <div
              style={{ height: "100%" }}
              className="d-flex justify-content-center align-items-center"
            >
              <Spinner></Spinner>
            </div>
          ) : (
            <Row>
              {isError ? (
                <ServerError500></ServerError500>
              ) : data ? (
                <div>
                  <DataTable
                    showGridlines
                    value={data.data}
                    paginator
                    rows={8}
                    rowsPerPageOptions={[8, 16, 32, 64]}
                    size="small"
                    removableSort
                  >
                    <Column
                      className="text-center"
                      field="trackingCode"
                      header="Code"
                      sortable
                      style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                      className="text-center"
                      field="totalOrderPrice"
                      header="Total ($)"
                      sortable
                      style={{ minWidth: "12rem" }}
                    ></Column>

                    <Column
                      className="text-center"
                      field="isDelivered"
                      header="Delivery Status"
                      style={{ minWidth: "12rem" }}
                      body={(data) => status(data.isDelivered, "delivered")}
                    ></Column>
                    <Column
                      className="text-center"
                      field="isPaid"
                      header="Payment Status"
                      style={{ minWidth: "12rem" }}
                      body={(data) => status(data.isPaid, "paid")}
                    ></Column>
                    <Column
                      className="text-center"
                      field="createdAt"
                      header="Ordered At"
                      sortable
                      style={{ minWidth: "12rem" }}
                      body={(data) => orderDate(data.createdAt)}
                    ></Column>
                    <Column
                      className="text-center"
                      header="View Details"
                      style={{ minWidth: "5rem" }}
                      body={(data) => viewDetails(data)}
                    ></Column>

                    {/* <Column
                      header="actions"
                      body={(data) => (
                        <div className="d-flex justify-content-center">
                          <i
                            className="fa fa-edit me-2"
                            style={{ color: "#007bff", cursor: "pointer" }}
                            onClick={() => handleEditModal(data)}
                          ></i>
                          <i
                            className="fa fa-trash"
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleDeleteModal(data)}
                          ></i>
                        </div>
                      )}
                    ></Column> */}
                  </DataTable>
                </div>
              ) : (
                <NoDocumentFound></NoDocumentFound>
              )}
            </Row>
          )}
        </Col>
      </Row>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AdminAllOrdersPage;
