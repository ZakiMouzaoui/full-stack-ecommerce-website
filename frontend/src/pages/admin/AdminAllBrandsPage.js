import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import SideBar from "../../components/admin/AdminSideBar";
import AllBrandsPageHook from "../../hook/brand/all_brands_page_hook";
import NoDocumentFound from "../../components/error/NoDocumentFound";
import AdminSubTitle from "../../components/admin/AdminSubtitle";
import AddBrandHook from "../../hook/brand/add_brand_hook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError500 from "../../components/error/ServerError500";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DeleteBrandHook from "../../hook/brand/delete_brand_hook";
import EditBrandHook from "../../hook/brand/edit_brand_hook";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_BRANDS, GET_BRAND } from "../../redux/type";
import NavBarLogin from "../../components/utils/NavBarLogin";

const AdminAllBrandsPage = () => {
  const dispatch = useDispatch();

  const brand = useSelector((state) => state.Brand.brand);

  const [loading, brands, filtered, isServerError] = AllBrandsPageHook();

  const [
    addLoading,
    img,
    onNameChange,
    onImageChange,
    onSubmit,
    resetForm,
    showAddModal,
    setShowAddModal,
  ] = AddBrandHook();

  const [
    deleteLoading,
    isDeletePressed,
    onDeleteConfirm,
    showDeleteModal,
    setDeleteShowModal,
  ] = DeleteBrandHook();

  const [
    editLoading,
    imgEdit,
    name,
    onNameEditChange,
    onImageEditChange,
    onEditConfirm,
    isEditPressed,
    showEditModal,
    setShowEditModal,
    resetEditForm,
  ] = EditBrandHook();

  const onSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let filteredData = [];

    if (searchTerm) {
      filteredData = brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm)
      );
    } else {
      filteredData = [...brands];
    }
    dispatch({
      type: FILTER_BRANDS,
      filtered: filteredData,
    });
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleEditModal = (brandObj) => {
    dispatch({
      type: GET_BRAND,
      brand: brandObj,
    });
    setShowEditModal(true);
  };

  const handleDeleteModal = (brandObj) => {
    dispatch({
      type: GET_BRAND,
      brand: brandObj,
    });
    setDeleteShowModal(true);
  };

  const handleAddClose = () => {
    setShowAddModal(false);
    resetForm();
  };

  const handleDeleteClose = () => {
    setDeleteShowModal(false);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    resetEditForm();
  };

  const imageCard = (brand) => {
    return (
      <img
        src={`http://127.0.0.1:8000/brands/${brand.image}`}
        alt={brand.image}
        className="shadow-2 border-round"
        style={{ width: "50px", height: "50px" }}
      />
    );
  };

  return (
    <div style={{ minHeight: "600px" }}>
      <NavBarLogin></NavBarLogin>
      {/* START OF ADD MODAL */}
      <Modal show={showAddModal} onHide={handleAddClose}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <div style={{ textAlign: "center !important" }}>
              Add a new brand{" "}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="text-center d-flex justify-content-center align-items-center"
          style={{ flexDirection: "column" }}
        >
          <div className="text-form pb-2 text-dark"> Icon</div>
          <div>
            <label for="upload-photo">
              <img
                src={img}
                alt="fzx"
                height="70px"
                width="70px"
                style={{ cursor: "pointer" }}
                className="pb-2"
              />
            </label>
            <input
              type="file"
              name="image"
              id="upload-photo"
              onChange={onImageChange}
            />
          </div>
          <input
            type="text"
            placeholder="Name..."
            onChange={onNameChange}
            className="user-input text-center mb-3"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={onSubmit}>
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
      {brand && (
        <Modal show={showEditModal} onHide={handleEditClose}>
          <Modal.Header>
            <Modal.Title>
              {" "}
              <div style={{ textAlign: "center !important" }}>Edit brand </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="text-center d-flex justify-content-center align-items-center"
            style={{ flexDirection: "column" }}
          >
            <div className="text-form pb-2 text-dark"> Icon</div>
            <div>
              <label for="upload-photo">
                <img
                  src={imgEdit}
                  alt="fzx"
                  height="70px"
                  width="70px"
                  style={{ cursor: "pointer" }}
                  className="pb-2"
                />
              </label>
              <input
                type="file"
                name="image"
                id="upload-photo"
                onChange={onImageEditChange}
              />
            </div>
            <input
              type="text"
              value={name}
              placeholder="Name..."
              className="user-input text-center mb-3"
              onChange={onNameEditChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={onEditConfirm}>
              {editLoading === true && isEditPressed === true ? (
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
          <Button variant="danger" onClick={() => onDeleteConfirm(brand._id)}>
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
        <Col xs="6" sm="4" md="3" lg="3">
          <SideBar index={3}></SideBar>
        </Col>
        <Col xs="6" sm="8" md="9" lg="9" className="px-4">
          <AdminSubTitle
            title="Manage brands"
            onAddClick={handleAddClick}
            onSearch={onSearchChange}
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
                      field="name"
                      header="Name"
                      sortable
                      style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                      className="text-center"
                      field="image"
                      body={imageCard}
                      header="Image"
                      style={{ padding: 0 }}
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

export default AdminAllBrandsPage;
