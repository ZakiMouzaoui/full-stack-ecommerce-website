import { Button, Card, Col, Modal, Spinner } from "react-bootstrap";
import EditSubCategoryHook from "../../hook/subcategory/edit_subcategory_hook";
import DeleteSubCategoryHook from "../../hook/subcategory/delete_subcategory_hook";

const AdminSubCategoryCard = ({ item, color, categories }) => {
  const [loading, isPressed, onConfirm, showModal, setShowModal] =
    DeleteSubCategoryHook();

  const [
    editLoading,
    name,
    onNameChange,
    onCategoryChange,
    onSubmit,
    isEditPressed,
    showEditModal,
    setShowEditModal,
    resetForm,
  ] = EditSubCategoryHook(item);

  const handleClose = () => {
    setShowModal(false);
    setShowEditModal(false);
    resetForm();
  };

  const handelDelete = () => {
    setShowModal(true);
  };

  const handleEdit = () => {
    resetForm();
    setShowEditModal(true);
  };

  return (
    <Col xs="12" sm="6" md="4" lg="3" xg="2">
      {/* START OF DELETE MODAL */}
      <Modal show={showModal} onHide={handleClose}>
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
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => onConfirm(item._id)}>
            {loading === true && isPressed === true ? (
              <Spinner style={{ width: "20px", height: "20px" }}></Spinner>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* END OF DELETE MODAL */}

      {/* START OF EDIT MODAL */}
      <Modal show={showEditModal} onHide={handleClose}>
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
            value={name}
            placeholder="Name..."
            className="user-input text-center mb-3"
            onChange={onNameChange}
          />
          <select
            className="user-input text-center"
            onChange={onCategoryChange}
          >
            <option value={null}>Select a category</option>
            {categories.map((category) => {
              return (
                <option
                  value={category._id}
                  selected={item.category._id === category._id}
                >
                  {category.name}
                </option>
              );
            })}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={onSubmit}>
            {editLoading === true && isEditPressed === true ? (
              <Spinner style={{ height: "20px", width: "20px" }}></Spinner>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* END OF EDIT MODAL */}

      <Card
        className="my-2"
        style={{
          borderRadius: "8px",
          minWidth: "170px",
          height: "170px",
          border: "none",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
        }}
      >
        <div className="d-flex justify-content-between pt-3 px-3">
          <div style={{ cursor: "pointer" }} onClick={handleEdit}>
            <i class="fa fa-edit" style={{ color: "#007bff" }}></i>
          </div>

          <div style={{ cursor: "pointer" }} onClick={handelDelete}>
            <i class="fa fa-trash" style={{ color: "red" }}></i>
          </div>
        </div>

        <Card.Body className="py-0 d-flex flex-column align-items-center">
          <Card.Title className="card-title text-center mt-3">
            {item.name}
          </Card.Title>

          <div
            className="mt-2"
            style={{
              border: "1px solid",
              borderRadius: "10px",
              padding: "2px 5px",
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          >
            {item.category ? item.category.name : "N/A"}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AdminSubCategoryCard;
