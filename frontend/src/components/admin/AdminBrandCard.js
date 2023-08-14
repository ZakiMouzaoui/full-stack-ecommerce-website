import { Button, Card, Col, Modal, Spinner } from "react-bootstrap";
import DeleteBrandHook from "../../hook/brand/delete_brand_hook";
import EditBrandHook from "../../hook/brand/edit_brand_hook";

const AdminBrandCard = ({ item }) => {
  const imgUrl = `http://127.0.0.1:8000/brands/${item.image}`;

  const [loading, isPressed, onConfirm, showModal, setShowModal] =
    DeleteBrandHook();

  const [
    editLoading,
    img,
    name,
    onNameChange,
    onImageChange,
    onSubmit,
    isEditPressed,
    showEditModal,
    setShowEditModal,
    resetForm,
  ] = EditBrandHook(imgUrl, item);

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
            <div style={{ textAlign: "center !important" }}>Edit Brand </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="text-center d-flex justify-content-center align-items-center"
          style={{ flexDirection: "column" }}
        >
          <div className="text-form pb-2 text-dark"> Icon</div>
          <div>
            <label for="upload-photo">
              <div
                style={{
                  position: "relative",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
                className="mb-2 p-2"
              >
                <img
                  src={img}
                  alt="fzx"
                  height="80px"
                  width="100px"
                  style={{ cursor: "pointer", borderRadius: "5px" }}
                  className="pb-2"
                />
                <i
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: "0",
                    right: "0",
                    marginRight: "5px",
                    marginTop: "5px",
                  }}
                  class="fa fa-photo"
                ></i>
              </div>
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
            value={name}
            placeholder="Name..."
            className="user-input text-center mb-3"
            onChange={onNameChange}
          />
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
        className="my-1"
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
        <Card.Img
          style={{ height: "60%", width: "50%", margin: "auto" }}
          src={imgUrl}
        ></Card.Img>
        <Card.Body className="py-0">
          <Card.Title className="card-title text-center">
            {item.name}
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AdminBrandCard;
