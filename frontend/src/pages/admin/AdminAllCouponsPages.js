import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import SideBar from "../../components/admin/AdminSideBar";
import NoDocumentFound from "../../components/error/NoDocumentFound";
import AdminSubTitle from "../../components/admin/AdminSubtitle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError500 from "../../components/error/ServerError500";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DeleteBrandHook from "../../hook/brand/delete_brand_hook";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_COUPONS, GET_COUPON } from "../../redux/type";
import NavBarLogin from "../../components/utils/NavBarLogin";
import AddCouponHook from "../../hook/coupon/add_coupon_hook";
import AllCouponsHook from "../../hook/coupon/get_coupons_hook";
import { memo } from "react";
import EditCouponHook from "../../hook/coupon/edit_coupon_hook";

const AdminAllCouponsPage = () => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const dispatch = useDispatch();

  const coupon = useSelector((state) => state.Coupon.coupon);

  const { loading, isServerError } = AllCouponsHook();
  const coupons = useSelector((state) => state.Coupon.coupons);
  const filtered = useSelector((state) => state.Coupon.filtered);

  const {
    addLoading,
    showAddModal,
    setShowAddModal,
    showValue,
    onTypeChange,
    onCodeChange,
    onExpireChange,
    onUsageLimitChange,
    showMinPrice,
    onMinPriceChange,
    onDiscountChange,
    resetAddForm,
    onAddSubmit,
  } = AddCouponHook();

  const [
    deleteLoading,
    isDeletePressed,
    onDeleteConfirm,
    showDeleteModal,
    setDeleteShowModal,
  ] = DeleteBrandHook();

  const {
    editLoading,
    showEditModal,
    setShowEditModal,
    showEditValue,
    discountEdit,
    discountEditType,
    onTypeChangeEdit,
    codeEdit,
    onCodeChangeEdit,
    expireEdit,
    minEditPrice,
    onExpireChangeEdit,
    usageLimitEdit,
    onUsageLimitChangeEdit,
    showEditMinPrice,
    onMinPriceChangeEdit,
    onDiscountChangeEdit,
    resetEditForm,
    onEditSubmit,
  } = EditCouponHook();

  const onSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let filteredData = [];

    if (searchTerm) {
      filteredData = coupons.filter((coupon) =>
        coupon.code.toLowerCase().includes(searchTerm)
      );
    } else {
      filteredData = [...coupons];
    }
    dispatch({
      type: FILTER_COUPONS,
      filtered: filteredData,
    });
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleEditModal = (coupon) => {
    dispatch({
      type: GET_COUPON,
      coupon,
    });
    setShowEditModal(true);
  };

  const handleDeleteModal = (coupon) => {
    dispatch({
      type: GET_COUPON,
      coupon,
    });
    setDeleteShowModal(true);
  };

  const handleAddClose = () => {
    setShowAddModal(false);
    resetAddForm();
  };

  const handleDeleteClose = () => {
    setDeleteShowModal(false);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    resetEditForm();
  };

  return (
    <div style={{ minHeight: "675px" }}>
      <NavBarLogin></NavBarLogin>
      {/* START OF ADD MODAL */}
      <Modal show={showAddModal} onHide={handleAddClose}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <div style={{ textAlign: "center !important" }}>
              Add a new coupon{" "}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="d-flex  align-items-start"
          style={{ flexDirection: "column" }}
        >
          <div className="text-form pb-2 text-dark">Code</div>

          <input
            type="text"
            placeholder="ex:AZ-2023..."
            onChange={onCodeChange}
            className="input-form-area p-2 mb-3"
          />
          <div className="text-form pb-2 text-dark">Expire date</div>

          <input
            type="date"
            onChange={onExpireChange}
            className="input-form-area p-2 mb-3"
          />
          <div className="text-form pb-2 text-dark">Usage limit</div>

          <input
            placeholder="ex:20"
            type="number"
            onChange={onUsageLimitChange}
            className="input-form-area p-2 mb-3"
          />
          <div className="text-form pb-2 text-dark">Discount Type</div>
          <select className="input-form-area p-2 mb-3" onChange={onTypeChange}>
            <option value="">Select a type</option>
            <option value="percent">Percentage</option>
            <option value="value">Value</option>
          </select>
          {showMinPrice && (
            <>
              <div className="text-form pb-2 text-dark">Min Price</div>
              <input
                placeholder="500 $"
                type="number"
                onChange={onMinPriceChange}
                className="input-form-area p-2 mb-3"
              />
            </>
          )}
          {showValue && (
            <>
              <div className="text-form pb-2 text-dark">Discount Value</div>

              <input
                placeholder="500 $"
                type="number"
                onChange={onDiscountChange}
                className="input-form-area p-2 mb-3"
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={onAddSubmit}>
            {(addLoading === true) === true ? (
              <Spinner style={{ height: "20px", width: "20px" }}></Spinner>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* END OF ADD MODAL */}

      {/* START OF EDIT MODAL */}
      {coupon && (
        <Modal show={showEditModal} onHide={handleEditClose}>
          <Modal.Header>
            <Modal.Title>
              {" "}
              <div style={{ textAlign: "center !important" }}>
                Edit a coupon{" "}
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="d-flex  align-items-start"
            style={{ flexDirection: "column" }}
          >
            <div className="text-form pb-2 text-dark">Code</div>

            <input
              value={codeEdit}
              type="text"
              placeholder="ex:AZ-2023..."
              onChange={onCodeChangeEdit}
              className="input-form-area p-2 mb-3"
            />
            <div className="text-form pb-2 text-dark">Expire date</div>

            <input
              type="date"
              value={expireEdit}
              onChange={onExpireChangeEdit}
              className="input-form-area p-2 mb-3"
            />
            <div className="text-form pb-2 text-dark">Usage limit</div>

            <input
              value={usageLimitEdit}
              placeholder="ex:20"
              type="number"
              onChange={onUsageLimitChangeEdit}
              className="input-form-area p-2 mb-3"
            />
            <div className="text-form pb-2 text-dark">Discount Type</div>
            <select
              className="input-form-area p-2 mb-3"
              onChange={onTypeChangeEdit}
            >
              <option value="">Select a type</option>
              <option value="percent" selected={discountEditType === "percent"}>
                Percentage
              </option>
              <option value="value" selected={discountEditType === "value"}>
                Value
              </option>
            </select>
            {showEditMinPrice && (
              <>
                <div className="text-form pb-2 text-dark">Min Price</div>
                <input
                  value={minEditPrice}
                  type="number"
                  onChange={onMinPriceChangeEdit}
                  className="input-form-area p-2 mb-3"
                />
              </>
            )}
            {showEditValue && (
              <>
                <div className="text-form pb-2 text-dark">Discount Value</div>

                <input
                  value={discountEdit}
                  type="number"
                  onChange={onDiscountChangeEdit}
                  className="input-form-area p-2 mb-3"
                />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={onEditSubmit}>
              {editLoading === true ? (
                <Spinner style={{ height: "20px", width: "20px" }}></Spinner>
              ) : (
                "Confirm"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* END OF EDIT MODAL */}

      {/* START OF DELETE MODAL */}
      <Modal show={showDeleteModal} onHide={handleDeleteClose}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <div style={{ textAlign: "center !important" }}>
              Confirm your action{" "}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div>Are you sure you want to delete this item?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => onDeleteConfirm(coupon._id)}>
            {deleteLoading === true && isDeletePressed === true ? (
              <Spinner style={{ width: "20px", height: "20px" }}></Spinner>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* END OF DELETE MODAL */}

      <Row>
        <Col xs="12" sm="4" md="3" lg="3">
          <SideBar index={5}></SideBar>
        </Col>
        <Col xs="12" sm="8" md="9" lg="9" className="px-4">
          <AdminSubTitle
            title="Manage coupons"
            onAddClick={handleAddClick}
            onSearch={onSearchChange}
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
              {isServerError ? (
                <ServerError500></ServerError500>
              ) : filtered ? (
                <div>
                  <DataTable
                    showGridlines
                    value={filtered}
                    paginator
                    rows={8}
                    rowsPerPageOptions={[8, 16, 32, 64]}
                    size="small"
                    removableSort
                  >
                    <Column
                      className="text-center"
                      field="code"
                      header="Code"
                      sortable
                      style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                      className="text-center"
                      field="usageLimit"
                      header="Usage Limit"
                      sortable
                      // style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                      className="text-center"
                      field="usageCount"
                      header="Usage Count"
                      sortable
                      // style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                      className="text-center"
                      field="discountType"
                      header="Type"
                      sortable
                      // style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                      className="text-center"
                      field="discount"
                      header="Discount"
                      sortable
                      style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                      className="text-center"
                      field="expireDate"
                      header="Expires in"
                      sortable
                      style={{ minWidth: "12rem" }}
                      body={(data) => {
                        return <div>{formatDate(data.expireDate)}</div>;
                      }}
                    ></Column>

                    <Column
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
                    ></Column>
                  </DataTable>
                </div>
              ) : (
                <div
                  style={{ height: "50vh", marginBottom: "20px" }}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <NoDocumentFound></NoDocumentFound>
                  <h5>No coupons found</h5>
                </div>
              )}
            </Row>
          )}
        </Col>
      </Row>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default memo(AdminAllCouponsPage);
