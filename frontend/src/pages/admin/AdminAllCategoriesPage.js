import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import SideBar from "../../components/admin/AdminSideBar";
import AllCategoriesPageHook from "../../hook/category/all_categories_page_hook";
import NoDocumentFound from "../../components/error/NoDocumentFound";
import AdminSubTitle from "../../components/admin/AdminSubtitle";
import AddCategoryHook from "../../hook/category/add_category_hook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError500 from "../../components/error/ServerError500";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DeleteCategoryHook from "../../hook/category/delete_category_hook";
import EditCategoryHook from "../../hook/category/edit_category_hook";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_CATEGORIES } from "../../redux/type";
import NavBarLogin from "../../components/utils/NavBarLogin";

const AdminAllCategoriesPage = () => {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.Category.category);

  const [loading, categories, filtered, isServerError] =
    AllCategoriesPageHook();

  const [
    addLoading,
    img,
    onNameChange,
    onImageChange,
    onSubmit,
    resetForm,
    showAddModal,
    setShowAddModal,
  ] = AddCategoryHook();

  const [
    deleteLoading,
    isDeletePressed,
    onDeleteConfirm,
    showDeleteModal,
    setDeleteShowModal,
  ] = DeleteCategoryHook();

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
  ] = EditCategoryHook();

  const onSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let filteredData = [];

    if (searchTerm) {
      filteredData = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm)
      );
    } else {
      filteredData = [...categories];
    }
    dispatch({
      type: FILTER_CATEGORIES,
      filtered: filteredData,
    });
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleEditModal = (categoryObj) => {
    dispatch({
      type: "GET_CATEGORY",
      category: categoryObj,
    });
    setShowEditModal(true);
  };

  const handleDeleteModal = (categoryObj) => {
    dispatch({
      type: "GET_CATEGORY",
      category: categoryObj,
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

  const imageCard = (category) => {
    return (
      <img
        src={`http://127.0.0.1:8000/categories/${category.image}`}
        alt={category.image}
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
              Add a new category{" "}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="text-center d-flex justify-content-center align-items-center"
          style={{ flexDirection: "column" }}
        >
          <div className="text-form pb-2 text-dark"> Category Icon</div>
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
      {category && (
        <Modal show={showEditModal} onHide={handleEditClose}>
          <Modal.Header>
            <Modal.Title>
              {" "}
              <div style={{ textAlign: "center !important" }}>
                Edit category{" "}
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="text-center d-flex justify-content-center align-items-center"
            style={{ flexDirection: "column" }}
          >
            <div className="text-form pb-2 text-dark"> Category Icon</div>
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
          <Button
            variant="danger"
            onClick={() => onDeleteConfirm(category._id)}
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
          <SideBar index={1}></SideBar>
        </Col>
        <Col xs="6" sm="8" md="9" lg="9" className="px-4">
          <AdminSubTitle
            title="Manage categories"
            items={categories ? [...categories] : []}
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

export default AdminAllCategoriesPage;
