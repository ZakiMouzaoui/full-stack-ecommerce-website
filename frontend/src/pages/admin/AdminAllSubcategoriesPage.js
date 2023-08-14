import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import SideBar from "../../components/admin/AdminSideBar";
import AllSubCategoriesPageHook from "../../hook/subcategory/all_subcategories_page_hook";
import NoDocumentFound from "../../components/error/NoDocumentFound";
import AdminSubTitle from "../../components/admin/AdminSubtitle";
import AddSubCategoryHook from "../../hook/subcategory/add_subcategory_hook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError500 from "../../components/error/ServerError500";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DeleteSubCategoryHook from "../../hook/subcategory/delete_subcategory_hook";
import EditSubCategoryHook from "../../hook/subcategory/edit_subcategory_hook";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_SUBCATEGORIES, GET_SUBCATEGORY } from "../../redux/type";
import NavBarLogin from "../../components/utils/NavBarLogin";

const AdminAllSubCategoriesPage = () => {
  const dispatch = useDispatch();

  const subcategory = useSelector((state) => state.SubCategory.subcategory);
  const categories = useSelector((state) => state.Category.categories);

  const [loading, subcategories, filtered, isServerError] =
    AllSubCategoriesPageHook();

  const [
    addLoading,
    onNameChange,
    onCategoryChange,
    onSubmit,
    resetForm,
    showAddModal,
    setShowAddModal,
  ] = AddSubCategoryHook();

  const [
    deleteLoading,
    isDeletePressed,
    onDeleteConfirm,
    showDeleteModal,
    setDeleteShowModal,
  ] = DeleteSubCategoryHook();

  const [
    editLoading,
    subName,
    onNameEditChange,
    onEditCategoryChange,
    onEditConfirm,
    showEditModal,
    setShowEditModal,
    resetEditForm,
  ] = EditSubCategoryHook();

  const onSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let filteredData = [];

    if (searchTerm) {
      filteredData = subcategories.filter((subcategory) =>
        subcategory.name.toLowerCase().includes(searchTerm)
      );
    } else {
      filteredData = [...subcategories];
    }
    dispatch({
      type: FILTER_SUBCATEGORIES,
      filtered: filteredData,
    });
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleEditModal = (subcategoryObj) => {
    dispatch({
      type: GET_SUBCATEGORY,
      subcategory: subcategoryObj,
    });
    setShowEditModal(true);
  };

  const handleDeleteModal = (subcategoryObj) => {
    dispatch({
      type: GET_SUBCATEGORY,
      subcategory: subcategoryObj,
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

  return (
    <div style={{ minHeight: "600px" }}>
      <NavBarLogin></NavBarLogin>
      {/* START OF ADD MODAL */}
      <Modal show={showAddModal} onHide={handleAddClose}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <div style={{ textAlign: "center !important" }}>
              Add a new subcategory{" "}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="d-flex text-center justify-content-center align-items-center"
          style={{
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            placeholder="Name..."
            onChange={onNameChange}
            className="user-input text-center mb-3"
            id="subName"
          />

          <select
            onChange={onCategoryChange}
            className="user-input text-center"
            name="category"
          >
            <option value={null}>Select a category</option>
            {categories &&
              categories.map((category) => {
                return <option value={category._id}>{category.name}</option>;
              })}
          </select>
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
      {subcategory && (
        <Modal show={showEditModal} onHide={handleEditClose}>
          <Modal.Header>
            <Modal.Title>
              {" "}
              <div style={{ textAlign: "center !important" }}>
                Edit subcategory{" "}
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="text-center d-flex justify-content-center align-items-center"
            style={{ flexDirection: "column" }}
          >
            <input
              type="text"
              value={subName}
              placeholder="Name..."
              className="user-input text-center mb-3"
              onChange={onNameEditChange}
            />

            <select
              onChange={onEditCategoryChange}
              className="user-input text-center"
              name="category"
            >
              <option value={null}>Select a category</option>
              {categories &&
                categories.map((category) => {
                  return (
                    <option
                      value={category._id}
                      selected={
                        subcategory.category &&
                        category._id === subcategory.category._id
                      }
                    >
                      {category.name}
                    </option>
                  );
                })}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={onEditConfirm}>
              {(editLoading === true) === true ? (
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
          <Button
            variant="danger"
            onClick={() => onDeleteConfirm(subcategory._id)}
          >
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
          <SideBar index={2}></SideBar>
        </Col>
        <Col xs="6" sm="8" md="9" lg="9" className="px-4">
          <AdminSubTitle
            title="Manage subcategories"
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
                      field="category.name"
                      header="Belongs to"
                      sortable
                      style={{ minWidth: "12rem" }}
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

export default AdminAllSubCategoriesPage;
